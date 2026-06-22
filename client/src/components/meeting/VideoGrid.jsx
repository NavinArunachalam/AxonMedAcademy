import { useSelector } from 'react-redux';
import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import VideoTile from './VideoTile';
import { useState, useEffect } from 'react';
import { useClassroomStore } from '../../lib/classroomStore';

export default function VideoGrid() {
  const { viewMode, speakerSocketId, participants } = useSelector(s => s.meeting);
  const { currentUser } = useClassroomStore();

  const [isMobile, setIsMobile] = useState(false);
  const [focusedTileId, setFocusedTileId] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobileStatus = 
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log("VideoGrid: isMobile =", mobileStatus, "width =", window.innerWidth);
      setIsMobile(mobileStatus);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Camera / screen tracks (video)
  const cameraTracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }]);
  const screenTracks = useTracks([{ source: Track.Source.ScreenShare, withPlaceholder: false }]);
  // Microphone tracks (audio) — indexed by participant identity for quick lookup
  const micTracks = useTracks([{ source: Track.Source.Microphone, withPlaceholder: false }]);
  const micByIdentity = Object.fromEntries(
    micTracks.map(t => [t.participant.identity, t])
  );

  const allTiles = [];

  // Screen shares first
  screenTracks.forEach(t => {
    allTiles.push({
      id: t.participant.identity + '_screen',
      trackRef: t,
      audioTrackRef: undefined,
      name: `${t.participant.name || t.participant.identity}'s Screen`,
      isLocal: t.participant.isLocal,
      isScreen: true,
      audio: false,
      video: true,
    });
  });

  // Camera streams — pair each with its participant's mic track
  cameraTracks.forEach(t => {
    const identity = t.participant.identity;
    allTiles.push({
      id: identity,
      trackRef: t,
      audioTrackRef: micByIdentity[identity],
      name: t.participant.name || identity,
      isLocal: t.participant.isLocal,
      isScreen: false,
      audio: t.participant.isMicrophoneEnabled,
      video: t.participant.isCameraEnabled,
    });
  });

  const total = allTiles.length;
  if (total === 0) return <div style={{ flex: 1, background: '#030108' }} />;

  // Find default focus (prefer screen share, then staff/admin, then first tile)
  const screenTile = allTiles.find(t => t.isScreen);
  const staffTile = allTiles.find(tile => {
    const role = tile.isLocal
      ? (currentUser?.role || 'student')
      : (participants.find(p => p.name === tile.name)?.role || 'student');
    return role === 'staff' || role === 'admin';
  });

  const defaultFocusedId = screenTile ? screenTile.id : (staffTile ? staffTile.id : allTiles[0]?.id);
  const activeFocusedId = (focusedTileId !== null && allTiles.some(t => t.id === focusedTileId))
    ? focusedTileId
    : defaultFocusedId;

  // ── Mobile Focus View (Always on mobile if multiple participants) ─────────────
  if (isMobile && total > 1) {
    const mainTile = allTiles.find(t => t.id === activeFocusedId) || allTiles[0];
    const floatingTiles = allTiles.filter(t => t.id !== mainTile.id);

    return (
      <div style={{
        position: 'relative',
        flex: 1,
        background: '#030108',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}>
        {/* Main Fullscreen Tile */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <VideoTile
            trackRef={mainTile.trackRef}
            audioTrackRef={mainTile.audioTrackRef}
            name={mainTile.name}
            isLocal={mainTile.isLocal}
            audioEnabled={mainTile.audio}
            videoEnabled={mainTile.video}
            isScreenShare={mainTile.isScreen}
          />
        </div>

        {/* Floating tiles at corner */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 10,
          maxHeight: '75%',
          overflowY: 'auto',
          pointerEvents: 'auto',
        }}>
          {floatingTiles.map(tile => (
            <div
              key={tile.id}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedTileId(tile.id);
              }}
              style={{
                width: '90px',
                height: '135px',
                borderRadius: '12px',
                border: '2px solid rgba(255,255,255,0.7)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <VideoTile
                trackRef={tile.trackRef}
                audioTrackRef={tile.audioTrackRef}
                name={tile.name}
                isLocal={tile.isLocal}
                audioEnabled={tile.audio}
                videoEnabled={tile.video}
                isScreenShare={tile.isScreen}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Desktop Speaker / Screen Share View ──────────────────────────────────────
  const isSpeakerView = viewMode === 'speaker' || screenTracks.length > 0;

  if (isSpeakerView && total > 1) {
    const mainId = speakerSocketId && allTiles.find(t => t.id === speakerSocketId)
      ? speakerSocketId
      : allTiles[0].id;

    const mainTile = allTiles.find(t => t.id === mainId) || allTiles[0];
    const stripTiles = allTiles.filter(t => t.id !== mainTile.id);

    return (
      <div style={{ flex: 1, display: 'flex', gap: '6px', padding: '8px', background: '#030108', overflow: 'hidden', minHeight: 0, minWidth: 0 }}>
        {/* Main tile */}
        <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
          <VideoTile
            trackRef={mainTile.trackRef}
            audioTrackRef={mainTile.audioTrackRef}
            name={mainTile.name}
            isLocal={mainTile.isLocal}
            audioEnabled={mainTile.audio}
            videoEnabled={mainTile.video}
            isScreenShare={mainTile.isScreen}
          />
        </div>

        {/* Side strip */}
        <div style={{ width: '180px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
          {stripTiles.map(tile => (
            <div key={tile.id} style={{ height: '120px', flexShrink: 0 }}>
              <VideoTile
                trackRef={tile.trackRef}
                audioTrackRef={tile.audioTrackRef}
                name={tile.name}
                isLocal={tile.isLocal}
                audioEnabled={tile.audio}
                videoEnabled={tile.video}
                isScreenShare={tile.isScreen}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Gallery / Grid View ────────────────────────────────────────────────────────
  const getGridStyle = () => {
    if (total === 1) return { gridTemplateColumns: '1fr', gridTemplateRows: '1fr' };
    if (total === 2) return { gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: '1fr' };
    if (total <= 4) return { gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' };
    if (total <= 6) return { gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' };
    if (total <= 9) return { gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' };
    return { gridTemplateColumns: 'repeat(4, 1fr)' };
  };

  return (
    <div style={{ flex: 1, display: 'grid', gap: '6px', padding: '8px', background: '#030108', overflow: 'hidden', minHeight: 0, ...getGridStyle(), position: 'relative' }}>
      {allTiles.map((tile, i) => (
        <div
          key={tile.id}
          style={{
            minHeight: 0,
            ...(total === 3 && i === 0 ? { gridColumn: '1 / -1' } : {})
          }}
        >
          <VideoTile
            trackRef={tile.trackRef}
            audioTrackRef={tile.audioTrackRef}
            name={tile.name}
            isLocal={tile.isLocal}
            audioEnabled={tile.audio}
            videoEnabled={tile.video}
            isScreenShare={tile.isScreen}
          />
        </div>
      ))}
    </div>
  );
}
