import React from 'react';
import ThemedSidebar from '@/components/layout/ThemedSidebar';
import ContentCardDoraemon, { ContentCardDoraemonProps } from '@/components/ContentCardDoraemon';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockCards: ContentCardDoraemonProps[] = [
  { id: 'album1', title: 'Doraemon\'s Favorite Tunes', description: 'A collection of upbeat songs', imageUrl: 'https://i.pinimg.com/564x/c8/5c/26/c85c26a31acd8edd932500593289094c.jpg', type: 'album' },
  { id: 'playlist1', title: 'Time Machine Mix', description: 'Travel through sounds', imageUrl: 'https://i.pinimg.com/564x/e0/7a/27/e07a271837a31e30ad085b5103623f82.jpg', type: 'playlist' },
  { id: 'artist1', title: 'Nobita & Friends', description: 'Featured Artist', imageUrl: 'https://i.pinimg.com/564x/a6/90/37/a69037f6e4098a0485b071b8606c4f0d.jpg', type: 'artist' },
  { id: 'reco1', title: 'Gadget Grooves', description: 'Weekly Recommendation', imageUrl: 'https://i.pinimg.com/564x/0f/6c/43/0f6c43a699a20ba1816585999d944567.jpg', type: 'recommendation' },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleCardPlay = (id: string | number, type: ContentCardDoraemonProps['type']) => {
    console.log(`Play clicked for ${type} ID: ${id}`);
    // Add logic to play the item, e.g., update MusicPlayerBar
  };

  const handleCardView = (id: string | number, type: ContentCardDoraemonProps['type']) => {
    console.log(`View clicked for ${type} ID: ${id}`);
    if (type === 'album') navigate(`/album/${id}`);
    else if (type === 'playlist') navigate(`/playlist/${id}`);
    else if (type === 'artist') navigate(`/artist/${id}`);
  };

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <ThemedSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b border-blue-200 bg-white sticky top-0 z-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for songs, artists, gadgets..."
              className="pl-10 bg-blue-50 border-blue-300 focus:bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  navigate(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);
                }
              }}
            />
          </div>
        </header>
        <ScrollArea className="flex-1 p-6 pb-[100px]"> {/* Padding bottom for MusicPlayerBar */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome to DoraMusic!</h1>
            <p className="text-gray-600">Discover your next favorite tune from Doraemon's world and beyond.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Featured Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {mockCards.filter(c => c.type === 'playlist' || c.type === 'recommendation').map(card => (
                <ContentCardDoraemon
                  key={card.id}
                  {...card}
                  onPlayClick={handleCardPlay}
                  onViewClick={handleCardView}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">New Releases</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {mockCards.filter(c => c.type === 'album').map(card => (
                <ContentCardDoraemon
                  key={card.id}
                  {...card}
                  onPlayClick={handleCardPlay}
                  onViewClick={handleCardView}
                />
              ))}
            </div>
          </section>

           <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Featured Artists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {mockCards.filter(c => c.type === 'artist').map(card => (
                <ContentCardDoraemon
                  key={card.id}
                  {...card}
                  onPlayClick={handleCardPlay}
                  onViewClick={handleCardView}
                />
              ))}
            </div>
          </section>
        </ScrollArea>
      </main>
      <MusicPlayerBar initialSong={{ id: 'dora1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', albumArtUrl: 'https://i.ytimg.com/vi/ap50MliYnyk/hqdefault.jpg', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }} />
    </div>
  );
};

export default HomePage;