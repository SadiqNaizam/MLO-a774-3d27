import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Plus, MoreHorizontal, Music2, CheckCircle } from 'lucide-react'; // Icons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  albumArtUrl?: string;
  isPlaying?: boolean; // To show a different state if this song is currently playing
}

interface SongListItemProps {
  song: Song;
  trackNumber?: number | string; // Optional track number for album/playlist context
  onPlaySong: (songId: string) => void;
  onAddToQueue?: (songId: string) => void;
  onAddToPlaylist?: (songId: string) => void; // Opens dialog
  onLikeSong?: (songId: string) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({
  song,
  trackNumber,
  onPlaySong,
  onAddToQueue,
  onAddToPlaylist,
  onLikeSong,
}) => {
  console.log("Rendering SongListItem:", song.title);
  const { title, artist, album, duration, albumArtUrl, isPlaying } = song;

  return (
    <div className={`group flex items-center p-2 pr-4 rounded-md hover:bg-blue-100/50 transition-colors ${isPlaying ? 'bg-blue-100 text-blue-700' : ''}`}>
      <div className="flex items-center flex-1 space-x-3 min-w-0">
        {trackNumber && (
          <span className={`w-6 text-sm text-center ${isPlaying ? 'text-blue-600' : 'text-gray-500 group-hover:hidden'}`}>
            {trackNumber}
          </span>
        )}
        <Button
            variant="ghost"
            size="icon"
            className={`w-6 h-6 ${isPlaying ? 'text-blue-600' : 'text-gray-500 opacity-0 group-hover:opacity-100 focus:opacity-100'}`}
            onClick={() => onPlaySong(song.id)}
            aria-label={`Play ${title}`}
        >
            {isPlaying ? <Music2 size={16} className="animate-pulse" /> : <Play size={16} />}
        </Button>

        {albumArtUrl && (
          <img
            src={albumArtUrl}
            alt={album || title}
            className="w-10 h-10 rounded object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
          />
        )}
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${isPlaying ? 'text-blue-700' : 'text-gray-900'}`} title={title}>
            {title}
          </p>
          <p className="text-xs text-gray-500 truncate" title={artist}>{artist}</p>
        </div>
      </div>

      {album && <p className="hidden md:block text-sm text-gray-600 mx-4 min-w-0 truncate max-w-[200px]" title={album}>{album}</p>}
      
      <div className="flex items-center space-x-2 ml-auto">
        {onLikeSong && (
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500 opacity-0 group-hover:opacity-100 focus:opacity-100">
                {/* Placeholder for like icon - Heart */}
            </Button>
        )}
        <span className={`text-sm ${isPlaying ? 'text-blue-600' : 'text-gray-500'}`}>{duration}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 focus:opacity-100">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-md border border-gray-200">
            {onAddToQueue && <DropdownMenuItem onClick={() => onAddToQueue(song.id)} className="text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"><Plus size={14} className="mr-2"/> Add to Queue</DropdownMenuItem>}
            {onAddToPlaylist && <DropdownMenuItem onClick={() => onAddToPlaylist(song.id)} className="text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"><ListMusic size={14} className="mr-2"/> Add to Playlist...</DropdownMenuItem>}
            {onLikeSong && <DropdownMenuItem onClick={() => onLikeSong(song.id)} className="text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer">{/* Heart icon */} Like Song</DropdownMenuItem>}
            <DropdownMenuSeparator className="bg-gray-200"/>
            <DropdownMenuItem className="text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer">View Artist</DropdownMenuItem>
            <DropdownMenuItem className="text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer">View Album</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SongListItem;