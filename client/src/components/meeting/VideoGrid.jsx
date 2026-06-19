import { useSelector } from 'react-redux';
import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import VideoTile from './VideoTile';

export default function VideoGrid() {
  const { viewMode, speakerSocketId } = useSelector(s => s.meeting);

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
      audioTrackRef: undefined, // screen audio is usually part of the screen track itself
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
      audioTrackRef: micByIdentity[identity],   // ← separate mic trackRef for AudioTrack
      name: t.participant.name || identity,
      isLocal: t.participant.isLocal,
      isScreen: false,
      audio: t.participant.isMicrophoneEnabled,
      video: t.participant.isCameraEnabled,
    });
  });

  const total = allTiles.length;
  if (total === 0) return <div style={{ flex: 1, background: '#030108' }} />;

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

  // ── Gallery View ──────────────────────────────────────────────────────────────
  const getGridStyle = () => {
    if (total === 1) return { gridTemplateColumns: '1fr', gridTemplateRows: '1fr' };
    if (total === 2) return { gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: '1fr' };
    if (total <= 4) return { gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' };
    if (total <= 6) return { gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' };
    if (total <= 9) return { gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' };
    return { gridTemplateColumns: 'repeat(4, 1fr)' };
  };

  return (
    <div style={{ flex: 1, display: 'grid', gap: '6px', padding: '8px', background: '#030108', overflow: 'hidden', minHeight: 0, ...getGridStyle() }}>
      {allTiles.map((tile, i) => (
        <div key={tile.id} style={{ minHeight: 0, ...(total === 3 && i === 0 ? { gridColumn: '1 / -1' } : {}) }}>
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
