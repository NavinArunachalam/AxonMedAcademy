import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-CiO0xxhB.mjs";
import { A as getAssetUrl, f as api } from "./_ssr/router-D7_rFoRj.mjs";
import { R as Root, P as Portal, a as Content, C as Close, T as Title, O as Overlay, D as Description } from "./_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { R as Root$1 } from "./_libs/radix-ui__react-label.mjs";
import { c as cva } from "./_libs/class-variance-authority.mjs";
import { S as Slot } from "./_libs/radix-ui__react-slot.mjs";
import { $ as Plus, K as LoaderCircle, an as Users, W as Pen, ah as Trash2, ae as Star, al as Upload, ap as X } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "tslib";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root$1.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function AdminFaculty() {
  const [faculty, setFaculty] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingFaculty, setEditingFaculty] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [removingImage, setRemovingImage] = reactExports.useState(false);
  const fetchFaculty = async () => {
    try {
      const res = await api.get("/admin/faculty");
      if (res.success) {
        setFaculty(res.facultyList || []);
      }
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchFaculty();
  }, []);
  const handleOpenAdd = () => {
    setEditingFaculty(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setDialogOpen(true);
  };
  const handleOpenEdit = (f) => {
    setEditingFaculty(f);
    setSelectedFile(null);
    setPreviewUrl(f.image ? getAssetUrl(f.image) : null);
    setDialogOpen(true);
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    if (selectedFile) {
      formData.set("image", selectedFile);
    }
    try {
      if (editingFaculty) {
        await api.multipart(`/admin/faculty/${editingFaculty._id}`, "PUT", formData);
      } else {
        await api.multipart("/admin/faculty", "POST", formData);
      }
      setDialogOpen(false);
      fetchFaculty();
    } catch (err) {
      console.error("Failed to save faculty:", err);
      alert("Failed to save faculty member");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;
    try {
      await api.delete(`/admin/faculty/${id}`);
      fetchFaculty();
    } catch (err) {
      console.error("Failed to delete faculty:", err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Faculty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/60 text-sm mt-1", children: [
          faculty.length,
          " instructors · active management"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleOpenAdd, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold hover:bg-lime/90 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add faculty member"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-lime" }) }) : faculty.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-cream/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 mb-3 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No faculty members found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleOpenAdd, className: "mt-4 text-lime text-sm font-bold hover:underline", children: "Add your first instructor" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3", children: faculty.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-14 w-14 overflow-hidden rounded-2xl bg-lime text-plum-dark font-bold grid place-items-center", children: f.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAssetUrl(f.image), alt: f.name, className: "h-full w-full object-cover" }) : f.initials || f.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold truncate", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-cream/60", children: [
            f.role,
            " · ",
            f.specialty
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOpenEdit(f), className: "p-2 rounded-lg hover:bg-white/10 text-cream/70 hover:text-lime transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(f._id), className: "p-2 rounded-lg hover:bg-white/10 text-cream/70 hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-3 gap-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-lime", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-lime" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: f.rating })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/50 mt-1", children: "Rating" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-lime flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
            " —"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/50 mt-1", children: "Students" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-lime", children: [
            f.years,
            "y"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/50 mt-1", children: "Experience" })
        ] })
      ] })
    ] }, f._id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[425px] bg-[#1A0F33] text-cream border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: editingFaculty ? "Edit Faculty Member" : "Add Faculty Member" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-28 overflow-hidden rounded-[2rem] bg-white/5 border-2 border-dashed border-white/10 group-hover:border-lime/50 transition-all grid place-items-center shadow-inner", children: previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "Preview", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-cream/10" }) }),
            previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              setSelectedFile(null);
              setPreviewUrl(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }, className: "absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-500 text-white grid place-items-center shadow-lg hover:bg-red-600 transition-colors z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: () => fileInputRef.current?.click(), className: "bg-white/5 border-white/10 text-cream hover:bg-white/10 hover:text-lime rounded-full px-4 h-9 text-xs font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5 mr-2" }),
              previewUrl ? "Change Photo" : "Upload Photo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/30 uppercase tracking-[0.15em] font-medium", children: "JPG, PNG or WebP · Max 2MB" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, className: "hidden", accept: "image/*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-cream/70", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", name: "name", defaultValue: editingFaculty?.name, required: true, className: "bg-white/5 border-white/10 text-cream focus:border-lime" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "role", className: "text-cream/70", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "role", name: "role", defaultValue: editingFaculty?.role, placeholder: "e.g. Lead Instructor", required: true, className: "bg-white/5 border-white/10 text-cream focus:border-lime" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "specialty", className: "text-cream/70", children: "Specialty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "specialty", name: "specialty", defaultValue: editingFaculty?.specialty, placeholder: "e.g. OT & Surgery", required: true, className: "bg-white/5 border-white/10 text-cream focus:border-lime" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "years", className: "text-cream/70", children: "Exp (Years)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "years", name: "years", type: "number", defaultValue: editingFaculty?.years, required: true, className: "bg-white/5 border-white/10 text-cream focus:border-lime" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rating", className: "text-cream/70", children: "Initial Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "rating", name: "rating", type: "number", step: "0.1", max: "5", defaultValue: editingFaculty?.rating || 5, className: "bg-white/5 border-white/10 text-cream focus:border-lime" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "initials", className: "text-cream/70", children: "Initials (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "initials", name: "initials", defaultValue: editingFaculty?.initials, maxLength: 2, className: "bg-white/5 border-white/10 text-cream focus:border-lime" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => setDialogOpen(false), className: "text-cream hover:bg-white/5 hover:text-cream", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: saving, className: "bg-lime text-plum-dark font-bold hover:bg-lime/90", children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
            editingFaculty ? "Update Instructor" : "Create Instructor"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminFaculty as component
};
