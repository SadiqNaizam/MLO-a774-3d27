import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThemedSidebar from '@/components/layout/ThemedSidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import SongListItem, { Song } from '@/components/SongListItem';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Clock, MoreVertical } from 'lucide-react';

interface PlaylistDetails {
  id: string;
  name: string;
  description: string;
  coverArtUrl: string;
  creator: { name: string; avatarUrl?: string };
  songs: Song[];
}

// Mock data - in a real app, this would come from an API call using `id`
const mockPlaylists: Record<string, PlaylistDetails> = {
  'libPlaylist1': {
    id: 'libPlaylist1',
    name: "Doraemon's Secret Stash",
    description: 'My personal favorites from the future and past!',
    coverArtUrl: 'https://i.pinimg.com/564x/cf/62/3c/cf623c46530ea6307195a0900b2af91b.jpg',
    creator: { name: 'Doraemon Fan', avatarUrl: 'https://i.pinimg.com/originals/2c/9a/0d/2c9a0d9a6c1e8b8f1d91f0c056970051.png' },
    songs: [
      { id: 'song1', title: 'Yume wo Kanaete Doraemon', artist: 'mao', album: 'Doraemon OST', duration: '3:45', albumArtUrl: 'https://i.ytimg.com/vi/qZ3Hzr99p0M/maxresdefault.jpg' },
      { id: 'song2', title: 'Anywhere Door Beat', artist: 'DJ Gian', album: 'Gadget Grooves', duration: '2:50', albumArtUrl: 'https://i.pinimg.com/564x/fe/4d/cf/fe4dcf3a3d3c5a2280a35e459bc81c22.jpg' },
      { id: 'song3', title: 'Time Freezer', artist: 'Future Nobita', album: 'Chronos Tracks', duration: '4:02', albumArtUrl: 'https://i.pinimg.com/564x/b5/09/50/b509508271009e60f4e51b7c65315f93.jpg' },
    ]
  },
   'playlist1': {
    id: 'playlist1',
    name: "Time Machine Mix",
    description: 'Travel through sounds across different eras.',
    coverArtUrl: 'https://i.pinimg.com/564x/e0/7a/27/e07a271837a31e30ad085b5103623f82.jpg',
    creator: { name: 'MusicLover22', avatarUrl: 'https://avatar.iran.liara.run/public/boy' },
    songs: [
      { id: 'songA', title: 'Future Funk', artist: 'Dorami', album: '22nd Century Beats', duration: '3:10', albumArtUrl: 'https://i.pinimg.com/564x/0f/6c/43/0f6c43a699a20ba1816585999d944567.jpg' },
      { id: 'songB', title: 'Dino Discovery', artist: 'Pisu & Nobita', album: 'Prehistoric Jams', duration: '2:55', albumArtUrl: 'https://i.pinimg.com/564x/a6/90/37/a69037f6e4098a0485b071b8606c4f0d.jpg' },
    ]
  }
};


const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<PlaylistDetails | null>(null);

  useEffect(() => {
    console.log('PlaylistDetailPage loaded for ID:', id);
    if (id && mockPlaylists[id]) {
      setPlaylist(mockPlaylists[id]);
    } else {
      // Handle playlist not found, maybe navigate to a 404 page or show a message
      console.error('Playlist not found for ID:', id);
      // For now, redirect to home if playlist not found
      // navigate('/');
    }
  }, [id, navigate]);

  const handlePlaySong = (songId: string) => {
    console.log(`Playing song ${songId} from playlist ${playlist?.name}`);
    // Potentially set this song in MusicPlayerBar
  };
  
  const handlePlayAll = () => {
    if (playlist && playlist.songs.length > 0) {
        console.log(`Playing all songs from playlist ${playlist.name}`);
        handlePlaySong(playlist.songs[0].id); // Play the first song
    }
  };

  if (!playlist) {
    return (
      <div className="flex h-screen bg-blue-50">
        <ThemedSidebar />
        <main className="flex-1 flex items-center justify-center p-6">
          <p className="text-xl text-blue-700">Loading playlist details or playlist not found...</p>
        </main>
        <MusicPlayerBar />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <ThemedSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 pb-[100px]"> {/* Padding bottom for MusicPlayerBar */}
          <header className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50">
            <img
              src={playlist.coverArtUrl}
              alt={`${playlist.name} cover art`}
              className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-xl object-cover border-4 border-white"
            />
            <div className="text-center md:text-left">
              <p className="text-sm text-blue-700 font-semibold">PLAYLIST</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 my-2 break-words">
                {playlist.name}
              </h1>
              <p className="text-gray-600 mb-3">{playlist.description}</p>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-700">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={playlist.creator.avatarUrl} alt={playlist.creator.name} />
                  <AvatarFallback>{playlist.creator.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <span>{playlist.creator.name}</span>
                <span>•</span>
                <span>{playlist.songs.length} songs</span>
              </div>
              <Button onClick={handlePlayAll} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                <Play size={20} className="mr-2 fill-white" /> Play All
              </Button>
            </div>
          </header>

          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-blue-200">
                  <TableHead className="w-[50px] text-gray-500">#</TableHead>
                  <TableHead className="text-gray-500">Title</TableHead>
                  <TableHead className="hidden md:table-cell text-gray-500">Album</TableHead>
                  <TableHead className="text-right text-gray-500"><Clock size={16} className="inline-block"/></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playlist.songs.map((song, index) => (
                  <TableRow key={song.id} className="border-b-transparent hover:bg-blue-100/70 group">
                     {/* Using SongListItem structure within TableCells for consistency and actions */}
                    <TableCell className="font-medium">
                       <div className="w-6 text-center">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <Button variant="ghost" size="icon" className="hidden group-hover:inline-flex w-6 h-6 text-blue-600" onClick={() => handlePlaySong(song.id)}>
                            <Play size={16} />
                        </Button>
                       </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center space-x-3">
                            {song.albumArtUrl && <img src={song.albumArtUrl} alt={song.title} className="w-10 h-10 rounded object-cover"/>}
                            <div>
                                <p className="font-semibold text-blue-800 truncate max-w-xs">{song.title}</p>
                                <p className="text-sm text-gray-600 truncate max-w-xs">{song.artist}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600 truncate max-w-xs">{song.album}</TableCell>
                    <TableCell className="text-right text-gray-600">
                        <div className="flex items-center justify-end space-x-2">
                            <span className="group-hover:hidden">{song.duration}</span>
                            <Button variant="ghost" size="icon" className="hidden group-hover:inline-flex text-gray-500 hover:text-blue-700">
                                <MoreVertical size={18} />
                            </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Fallback for smaller screens or if Table is too complex, could use SongListItem directly */}
            {/* <div className="md:hidden space-y-1 mt-4">
              {playlist.songs.map((song, index) => (
                <SongListItem
                  key={song.id}
                  song={song}
                  trackNumber={index + 1}
                  onPlaySong={handlePlaySong}
                />
              ))}
            </div> */}
          </div>
        </ScrollArea>
      </main>
      <MusicPlayerBar />
    </div>
  );
};

export default PlaylistDetailPage;