import React, { useState } from 'react';
import ThemedSidebar from '@/components/layout/ThemedSidebar';
import ContentCardDoraemon, { ContentCardDoraemonProps } from '@/components/ContentCardDoraemon';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import SongListItem, { Song } from '@/components/SongListItem';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockLibraryPlaylists: ContentCardDoraemonProps[] = [
  { id: 'libPlaylist1', title: 'Doraemon\'s Secret Stash', description: 'My personal favorites', imageUrl: 'https://i.pinimg.com/564x/cf/62/3c/cf623c46530ea6307195a0900b2af91b.jpg', type: 'playlist' },
  { id: 'libPlaylist2', title: 'Study with Dekisugi', description: 'Focus enhancing tunes', imageUrl: 'https://i.pinimg.com/564x/88/01/46/88014695977e8342e7f05cc232904994.jpg', type: 'playlist' },
];

const mockLikedSongs: Song[] = [
  { id: 'liked1', title: 'Pocket Bell Sound', artist: 'Doraemon', album: 'Gadget Sounds', duration: '0:05', albumArtUrl: 'https://i.pinimg.com/564x/7c/9c/38/7c9c383259f66f2e6d9a0a2c64e63039.jpg' },
  { id: 'liked2', 'title': 'Gian\'s Karaoke Anthem', artist: 'Takeshi Goda', album: 'Neighborhood Concerts', duration: '3:15', albumArtUrl: 'https://i.pinimg.com/564x/92/0f/43/920f43c3ac3157418302299005f0f7a3.jpg' },
];

const mockSavedAlbums: ContentCardDoraemonProps[] = [
 { id: 'savedAlbum1', title: 'The Sound of the Future', description: 'Doraemon Original Soundtrack', imageUrl: 'https://i.pinimg.com/564x/e0/7a/27/e07a271837a31e30ad085b5103623f82.jpg', type: 'album' },
];

const YourLibraryPage: React.FC = () => {
  console.log('YourLibraryPage loaded');
  const navigate = useNavigate();
  const [isCreatePlaylistDialogOpen, setIsCreatePlaylistDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handlePlaySong = (songId: string) => console.log(`Playing song ${songId} from library`);
  const handleCardPlay = (id: string | number, type: ContentCardDoraemonProps['type']) => console.log(`Play ${type} ${id} from library`);
  const handleCardView = (id: string | number, type: ContentCardDoraemonProps['type']) => {
     if (type === 'album') navigate(`/album/${id}`);
     else if (type === 'playlist') navigate(`/playlist/${id}`);
     else if (type === 'artist') navigate(`/artist/${id}`);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      console.log('Creating playlist:', newPlaylistName);
      // Add logic to create playlist
      mockLibraryPlaylists.push({
        id: `libPlaylist${mockLibraryPlaylists.length + 1}`,
        title: newPlaylistName,
        description: 'Newly created playlist',
        imageUrl: 'https://via.placeholder.com/200/007BFF/FFFFFF?Text=New+Playlist',
        type: 'playlist'
      });
      setNewPlaylistName('');
      setIsCreatePlaylistDialogOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <ThemedSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 py-6 border-b border-blue-200 bg-white sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800">Your Library</h1>
          <Dialog open={isCreatePlaylistDialogOpen} onOpenChange={setIsCreatePlaylistDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle size={18} className="mr-2" /> Create Playlist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-blue-800">Create New Playlist</DialogTitle>
                <DialogDescription>Give your new playlist a catchy name!</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="playlist-name" className="text-right text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="playlist-name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="col-span-3 border-blue-300 focus:border-blue-500"
                    placeholder="e.g., Doraemon's Gadget Jams"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreatePlaylistDialogOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={handleCreatePlaylist} className="bg-blue-600 hover:bg-blue-700 text-white">Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <ScrollArea className="flex-1 p-6 pb-[100px]">
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="bg-blue-100 border border-blue-200">
              <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Playlists</TabsTrigger>
              <TabsTrigger value="likedSongs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Liked Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Artists</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists" className="mt-6">
              {mockLibraryPlaylists.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {mockLibraryPlaylists.map(card => (
                    <ContentCardDoraemon key={card.id} {...card} onPlayClick={handleCardPlay} onViewClick={handleCardView} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">You haven't created or saved any playlists yet. Try creating one!</p>
              )}
            </TabsContent>

            <TabsContent value="likedSongs" className="mt-6">
              {mockLikedSongs.length > 0 ? (
                <div className="space-y-2">
                  {mockLikedSongs.map((song, index) => (
                    <SongListItem key={song.id} song={song} trackNumber={index + 1} onPlaySong={handlePlaySong} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No liked songs yet. Go explore and find some tunes!</p>
              )}
            </TabsContent>

            <TabsContent value="albums" className="mt-6">
              {mockSavedAlbums.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {mockSavedAlbums.map(card => (
                    <ContentCardDoraemon key={card.id} {...card} onPlayClick={handleCardPlay} onViewClick={handleCardView} />
                  ))}
                </div>
              ) : (
                 <p className="text-gray-500 text-center py-8">You haven't saved any albums. Discover new music!</p>
              )}
            </TabsContent>
            <TabsContent value="artists" className="mt-6">
                 <p className="text-gray-500 text-center py-8">You are not following any artists yet. Find your favorites!</p>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </main>
      <MusicPlayerBar />
    </div>
  );
};

export default YourLibraryPage;