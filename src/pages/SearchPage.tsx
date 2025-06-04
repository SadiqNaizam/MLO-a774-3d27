import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemedSidebar from '@/components/layout/ThemedSidebar';
import ContentCardDoraemon, { ContentCardDoraemonProps } from '@/components/ContentCardDoraemon';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import SongListItem, { Song } from '@/components/SongListItem';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon } from 'lucide-react';

const mockSongs: Song[] = [
  { id: 'song1', title: 'Yume wo Kanaete Doraemon', artist: 'mao', album: 'Doraemon OST', duration: '3:45', albumArtUrl: 'https://i.ytimg.com/vi/qZ3Hzr99p0M/maxresdefault.jpg' },
  { id: 'song2', 'title': 'Anywhere Door Beat', artist: 'DJ Gian', album: 'Gadget Grooves', duration: '2:50', albumArtUrl: 'https://i.pinimg.com/564x/fe/4d/cf/fe4dcf3a3d3c5a2280a35e459bc81c22.jpg' },
  { id: 'song3', 'title': 'Shizuka\'s Serenade', artist: 'Shizuka Minamoto', album: 'Acoustic Dreams', duration: '4:12', albumArtUrl: 'https://i.pinimg.com/564x/f9/70/e3/f970e3f6fd8fbfb37222d7ff351133d9.jpg' },
];

const mockAlbums: ContentCardDoraemonProps[] = [
  { id: 'albumSearch1', title: 'Doraemon Best Hits', description: 'Various Artists', imageUrl: 'https://i.pinimg.com/564x/c8/5c/26/c85c26a31acd8edd932500593289094c.jpg', type: 'album' },
  { id: 'albumSearch2', title: 'Future Funk', description: 'Dorami Chan', imageUrl: 'https://i.pinimg.com/564x/b5/09/50/b509508271009e60f4e51b7c65315f93.jpg', type: 'album' },
];

const mockArtists: ContentCardDoraemonProps[] = [
 { id: 'artistSearch1', title: 'Suneo Honekawa', description: 'Pop Star', imageUrl: 'https://i.pinimg.com/564x/82/0c/8e/820c8eb31121576c14443cf195c83636.jpg', type: 'artist' },
 { id: 'artistSearch2', title: 'Takeshi "Gian" Goda', description: 'Power Vocals', imageUrl: 'https://i.pinimg.com/564x/92/0f/43/920f43c3ac3157418302299005f0f7a3.jpg', type: 'artist' },
];

const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSearchTerm(queryParams.get('q') || '');
  }, [location.search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    // Here you would typically trigger an API call with the searchTerm
    console.log('Searching for:', searchTerm);
  };

  const handlePlaySong = (songId: string) => console.log(`Playing song ${songId}`);
  const handleCardPlay = (id: string | number, type: ContentCardDoraemonProps['type']) => console.log(`Play ${type} ${id}`);
  const handleCardView = (id: string | number, type: ContentCardDoraemonProps['type']) => {
     if (type === 'album') navigate(`/album/${id}`);
     else if (type === 'playlist') navigate(`/playlist/${id}`);
     else if (type === 'artist') navigate(`/artist/${id}`);
  };


  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <ThemedSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b border-blue-200 bg-white sticky top-0 z-10">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for anything..."
              className="pl-10 bg-blue-50 border-blue-300 focus:bg-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </header>
        <ScrollArea className="flex-1 p-6 pb-[100px]">
          {searchTerm ? (
            <h1 className="text-2xl font-bold text-blue-800 mb-6">Results for "{searchTerm}"</h1>
          ) : (
            <h1 className="text-2xl font-bold text-blue-800 mb-6">Search the DoraMusic Library</h1>
          )}
          
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="bg-blue-100 border border-blue-200">
              <TabsTrigger value="songs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Artists</TabsTrigger>
              <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Playlists</TabsTrigger>
            </TabsList>
            <TabsContent value="songs" className="mt-4">
              {mockSongs.length > 0 ? (
                <div className="space-y-2">
                  {mockSongs.map((song, index) => (
                    <SongListItem key={song.id} song={song} trackNumber={index + 1} onPlaySong={handlePlaySong} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No songs found matching "{searchTerm}". Try a different gadget!</p>
              )}
            </TabsContent>
            <TabsContent value="albums" className="mt-4">
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {mockAlbums.map(card => (
                  <ContentCardDoraemon key={card.id} {...card} onPlayClick={handleCardPlay} onViewClick={handleCardView} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {mockArtists.map(card => (
                  <ContentCardDoraemon key={card.id} {...card} onPlayClick={handleCardPlay} onViewClick={handleCardView} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="playlists" className="mt-4">
              <p className="text-gray-500">No playlists found for "{searchTerm}". Perhaps create one?</p>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </main>
      <MusicPlayerBar />
    </div>
  );
};

export default SearchPage;