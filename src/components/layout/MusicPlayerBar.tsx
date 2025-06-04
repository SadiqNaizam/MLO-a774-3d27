import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, ListMusic, Maximize2 } from 'lucide-react'; // Icons related to music player

interface CurrentSong {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  duration?: number; // in seconds
  audioSrc: string; // URL to the audio file
}

interface MusicPlayerBarProps {
  initialSong?: CurrentSong; // Allow an initial song to be passed
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ initialSong }) => {
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(initialSong || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [volume, setVolume] = useState(50); // 0-100
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("Rendering MusicPlayerBar. Current song:", currentSong?.title, "Playing:", isPlaying);
  
  // Mock song data if no initial song
  const mockSong: CurrentSong = {
    id: 'mock1',
    title: 'Doraemon No Uta',
    artist: 'Kumiko Osugi',
    albumArtUrl: '/placeholder.svg', // Replace with actual Doraemon-themed placeholder if available
    duration: 180, // 3 minutes
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Placeholder audio
  };

  React.useEffect(() => {
    if (!currentSong && !initialSong) {
        setCurrentSong(mockSong); // Load mock song if nothing is playing
    }
  }, [currentSong, initialSong]);


  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch(error => console.error("Error playing audio:", error));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentSong]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  const handlePlayPause = () => {
    if (!currentSong && audioRef.current) { // If no song, try to load the source from audio tag
        if (audioRef.current.src) {
             setCurrentSong(prev => prev || mockSong); // Ensure currentSong is set
        } else {
            console.warn("No audio source loaded.");
            return;
        }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentSong) {
      audioRef.current.currentTime = (value[0] / 100) * audioRef.current.duration;
      setProgress(value[0]);
    }
  };

  const formatTime = (timeInSeconds: number = 0): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentSong) {
    // Render a minimal bar or nothing if no song is loaded
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-blue-100 border-t border-blue-300 p-3 h-20 flex items-center justify-center text-blue-700">
        No song selected. Pick a tune!
        {/* Hidden audio element for playback logic even when no song is "displayed" */}
        <audio ref={audioRef} src={mockSong.audioSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} />
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-blue-100 border-t border-blue-300 p-3 h-[90px] grid grid-cols-3 items-center gap-4 z-50">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={currentSong.audioSrc} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} onLoadedMetadata={() => {
          if (audioRef.current) setProgress(0); // Reset progress on new song
      }}/>

      {/* Left: Song Info */}
      <div className="flex items-center space-x-3">
        <img src={currentSong.albumArtUrl} alt={currentSong.title} className="w-14 h-14 rounded object-cover border border-blue-300" />
        <div>
          <p className="text-sm font-semibold text-blue-800 truncate max-w-[150px] md:max-w-xs" title={currentSong.title}>{currentSong.title}</p>
          <p className="text-xs text-gray-600 truncate max-w-[150px] md:max-w-xs" title={currentSong.artist}>{currentSong.artist}</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-2 text-gray-600 hover:text-pink-500">
          <Heart size={18} />
        </Button>
      </div>

      {/* Center: Playback Controls & Scrubber */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Button variant="ghost" size="icon" className="text-blue-700 hover:bg-blue-200">
            <SkipBack size={20} />
          </Button>
          <Button variant="default" size="icon" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10" onClick={handlePlayPause}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-700 hover:bg-blue-200">
            <SkipForward size={20} />
          </Button>
        </div>
        <div className="w-full max-w-xs md:max-w-sm flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-600 w-8 text-right">{formatTime(audioRef.current?.currentTime)}</span>
            <Slider
                defaultValue={[0]}
                value={[progress]}
                max={100}
                step={1}
                className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-blue-600"
                onValueChange={handleSeek}
            />
            <span className="text-xs text-gray-600 w-8 text-left">{formatTime(audioRef.current?.duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-700">
          <ListMusic size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-700" onClick={() => setIsMuted(!isMuted)}>
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <Slider
          defaultValue={[50]}
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          className="w-20 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-blue-600"
          onValueChange={(value) => {
            setVolume(value[0]);
            if (isMuted && value[0] > 0) setIsMuted(false);
          }}
        />
         <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-700">
          <Maximize2 size={18} /> {/* Placeholder for full screen player view */}
        </Button>
      </div>
    </footer>
  );
};

export default MusicPlayerBar;