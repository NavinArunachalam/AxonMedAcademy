import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Folder, Video, ChevronRight, ArrowLeft, Play, Edit, Trash2 } from "lucide-react";
import { api, uploadLibraryRecordingToCloudflare } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute("/_admin/admin/recordings")({
  component: GlobalRecordingsLibrary,
});

function GlobalRecordingsLibrary() {
  const [folders, setFolders] = useState<any[]>([]);
  const [recordings, setRecordings] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState<any | null>(null);
  
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadBytes, setUploadBytes] = useState({ loaded: 0, total: 0 });
  const [uploadPhase, setUploadPhase] = useState<'idle' | 'preparing' | 'uploading' | 'saving'>('idle');
  const [uploadPartInfo, setUploadPartInfo] = useState<{ part: number; totalParts: number } | null>(null);

  const [activePlayRec, setActivePlayRec] = useState<any | null>(null);
  
  const [editRecId, setEditRecId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [editFolderId, setEditFolderId] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState("");
  const [isEditingFolder, setIsEditingFolder] = useState(false);

  const formatMB = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  useEffect(() => {
    fetchFolders();
    fetchRecordings();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await api.get("/library-folders") as any;
      if (res.success || res.folders) {
        setFolders(res.folders || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load folders");
    }
  };

  const fetchRecordings = async () => {
    try {
      const res = await api.get("/recordings/library") as any;
      if (res.success || res.recordings) {
        setRecordings(res.recordings || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load recordings");
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const res = await api.post("/library-folders", { name: newFolderName }) as any;
      if (res.success || res.folder) {
        toast.success("Folder created");
        setIsFolderModalOpen(false);
        setNewFolderName("");
        fetchFolders();
      }
    } catch (err) {
      toast.error("Failed to create folder");
    }
  };

  const handleUploadVideo = async () => {
    if (!uploadTitle || !uploadFile) {
      toast.error("Title and video file are required");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadBytes({ loaded: 0, total: 0 });
    setUploadPhase('preparing');
    
    try {
      await uploadLibraryRecordingToCloudflare({
        file: uploadFile,
        title: uploadTitle,
        folderId: currentFolder?._id,
        onProgress: ({ loaded, total, percentage, part, totalParts }) => {
          setUploadPhase('uploading');
          setUploadProgress(percentage);
          setUploadBytes({ loaded, total });
          if (part != null && totalParts != null) {
            setUploadPartInfo({ part, totalParts });
          }
          if (percentage === 100) setUploadPhase('saving');
        },
      });

      toast.success("Video uploaded successfully!");
      setIsUploadModalOpen(false);
      setUploadTitle("");
      setUploadFile(null);
      setUploadPhase('idle');
      fetchRecordings();
    } catch (err: any) {
      toast.error(err.message || "Failed to upload video");
      setUploadPhase('idle');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadBytes({ loaded: 0, total: 0 });
      setUploadPartInfo(null);
    }
  };

  const handleEditRecording = async () => {
    if (!editRecId || !editTitle) return;
    setIsEditing(true);
    try {
      const res = await api.put(`/recordings/${editRecId}`, { title: editTitle }) as any;
      if (res.success || res.recording) {
        toast.success("Title updated");
        setEditRecId(null);
        fetchRecordings();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update title");
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditFolder = async () => {
    if (!editFolderId || !editFolderName.trim()) return;
    setIsEditingFolder(true);
    try {
      const res = await api.put(`/library-folders/${editFolderId}`, { name: editFolderName }) as any;
      if (res.success || res.folder) {
        toast.success("Folder name updated");
        setEditFolderId(null);
        fetchFolders();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update folder name");
    } finally {
      setIsEditingFolder(false);
    }
  };

  const handleDeleteRecording = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recording?")) return;
    try {
      await api.delete(`/recordings/${id}`);
      toast.success("Recording deleted");
      fetchRecordings();
    } catch (err: any) {
      toast.error("Failed to delete recording");
    }
  };

  const handleDeleteFolder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this folder? All videos inside this folder will be permanently deleted from the database and Cloudflare R2.")) return;
    try {
      await api.delete(`/library-folders/${id}`);
      toast.success("Folder and its videos deleted");
      fetchFolders();
      fetchRecordings();
    } catch (err: any) {
      toast.error("Failed to delete folder");
    }
  };

  // Filter recordings based on current view
  const visibleRecordings = currentFolder 
    ? recordings.filter(r => r.folder === currentFolder._id)
    : recordings.filter(r => !r.folder);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Media Library</h1>
          <p className="text-muted-foreground">Manage centralized video recordings and folders.</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isFolderModalOpen} onOpenChange={setIsFolderModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Folder className="w-4 h-4" /> New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Folder Name</Label>
                  <Input 
                    placeholder="e.g., Sidhha" 
                    value={newFolderName} 
                    onChange={e => setNewFolderName(e.target.value)} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsFolderModalOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateFolder}>Create Folder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {currentFolder && (
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Video className="w-4 h-4" /> Upload Video
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload to {currentFolder.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Video Title</Label>
                    <Input 
                      placeholder="Enter video title..." 
                      value={uploadTitle} 
                      onChange={e => setUploadTitle(e.target.value)} 
                      disabled={isUploading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Video File</Label>
                    <Input 
                      type="file" 
                      accept="video/*" 
                      onChange={e => setUploadFile(e.target.files?.[0] || null)} 
                      disabled={isUploading}
                    />
                  </div>

                  {isUploading && (
                    <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-800">
                          {uploadPhase === 'preparing' && 'Preparing upload...'}
                          {uploadPhase === 'uploading' && 'Uploading to cloud...'}
                          {uploadPhase === 'saving' && 'Saving metadata...'}
                        </span>
                        <span className="text-slate-500 font-mono">
                          {formatMB(uploadBytes.loaded)} / {formatMB(uploadBytes.total)}
                        </span>
                      </div>
                      
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{uploadProgress}% Complete</span>
                        {uploadPartInfo && (
                          <span>Part {uploadPartInfo.part} of {uploadPartInfo.totalParts}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} disabled={isUploading}>Cancel</Button>
                  <Button onClick={handleUploadVideo} disabled={isUploading || !uploadFile || !uploadTitle}>
                    {isUploading ? "Uploading..." : "Upload Video"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {currentFolder && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button 
            className="hover:text-slate-900 flex items-center gap-1 transition-colors"
            onClick={() => setCurrentFolder(null)}
          >
            <ArrowLeft className="w-4 h-4" /> Library
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-slate-900">{currentFolder.name}</span>
        </div>
      )}

      {!currentFolder && folders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map(folder => (
              <div
                key={folder._id}
                className="flex items-center justify-between p-4 rounded-xl border bg-white hover:border-[#F4B400] hover:shadow-md transition-all text-left group"
              >
                <div
                  onClick={() => setCurrentFolder(folder)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 text-[#F4B400] flex items-center justify-center shrink-0">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{folder.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {recordings.filter(r => r.folder === folder._id).length} videos
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-500 hover:text-slate-600 hover:bg-slate-50 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditFolderId(folder._id);
                      setEditFolderName(folder.name);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFolder(folder._id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentFolder && (
        <div className="space-y-4 mt-8">
          <h2 className="text-lg font-semibold text-slate-800">
            Videos in {currentFolder.name}
          </h2>
          {visibleRecordings.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-xl bg-slate-50">
              <Video className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <div className="text-slate-600 font-medium">No videos found</div>
              <div className="text-sm text-slate-500">Upload a video to see it here.</div>
            </div>
          ) : (
            <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b text-[10px] uppercase tracking-widest text-slate-500">
                    <tr>
                      <th className="p-4 text-center w-12">#</th>
                      <th className="p-4">Recording</th>
                      <th className="p-4">Created At</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-700">
                    {visibleRecordings.map((rec, index) => (
                      <tr key={rec._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-center font-mono text-slate-400">{index + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setActivePlayRec(rec)}
                              className="w-12 h-9 rounded bg-slate-100 flex items-center justify-center shrink-0 hover:bg-slate-200 text-slate-700 transition-colors"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-900 text-xs">{rec.title}</div>
                              {rec.description && (
                                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{rec.description}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-slate-500 font-mono">
                          {new Date(rec.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 h-8 px-3 text-xs"
                              onClick={() => {
                                setEditRecId(rec._id);
                                setEditTitle(rec.title);
                              }}
                            >
                              <Edit className="w-3 h-3" /> Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-3 text-xs"
                              onClick={() => handleDeleteRecording(rec._id)}
                            >
                              <Trash2 className="w-3 h-3" /> Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Play Modal */}
      <Dialog open={!!activePlayRec} onOpenChange={(open) => !open && setActivePlayRec(null)}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black border-slate-800">
          <DialogHeader className="p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
            <DialogTitle className="text-white">{activePlayRec?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
            {activePlayRec?.cloudflareUrl ? (
              <video 
                src={activePlayRec.cloudflareUrl} 
                controls 
                autoPlay 
                className="w-full h-full"
                controlsList="nodownload"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Media URL not available
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Title Modal */}
      <Dialog open={!!editRecId} onOpenChange={(open) => !open && setEditRecId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Recording</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label>Video Title</Label>
            <Input 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)} 
              className="mt-2"
              disabled={isEditing}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRecId(null)} disabled={isEditing}>Cancel</Button>
            <Button onClick={handleEditRecording} disabled={isEditing || !editTitle}>
              {isEditing ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Folder Modal */}
      <Dialog open={!!editFolderId} onOpenChange={(open) => !open && setEditFolderId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label>Folder Name</Label>
            <Input 
              value={editFolderName} 
              onChange={(e) => setEditFolderName(e.target.value)} 
              className="mt-2"
              disabled={isEditingFolder}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditFolderId(null)} disabled={isEditingFolder}>Cancel</Button>
            <Button onClick={handleEditFolder} disabled={isEditingFolder || !editFolderName.trim()}>
              {isEditingFolder ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
