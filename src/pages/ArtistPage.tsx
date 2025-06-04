import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThemedSidebar from '@/components/layout/ThemedSidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import SongListItem, { Song } from '@/components/SongListItem';
import ContentCardDoraemon, { ContentCardDoraemonProps } from '@/components/ContentCardDoraemon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, CheckCircle } from 'lucide-react';

interface ArtistDetails {
  id: string;
  name: string;
  bio: string;
  imageUrl: string; // Banner or large profile
  avatarUrl: string; // Smaller avatar
  followers: number;
  popularSongs: Song[];
  albums: ContentCardDoraemonProps[];
  relatedArtists: ContentCardDoraemonProps[];
}

const mockArtistsData: Record<string, ArtistDetails> = {
  'artist1': {
    id: 'artist1',
    name: 'Nobita & Friends',
    bio: 'A dynamic group bringing tunes from the 22nd century and neighborhood adventures. Known for their catchy melodies and heartfelt lyrics.',
    imageUrl: 'https://i.pinimg.com/564x/a6/90/37/a69037f6e4098a0485b071b8606c4f0d.jpg',
    avatarUrl: 'https://i.pinimg.com/originals/2c/9a/0d/2c9a0d9a6c1e8b8f1d91f0c056970051.png',
    followers: 123456,
    popularSongs: [
      { id: 'nfsong1', title: 'Friendship Power', artist: 'Nobita & Friends', album: 'Adventure Anthems', duration: '3:30', albumArtUrl: 'https://i.pinimg.com/564x/e0/7a/27/e07a271837a31e30ad085b5103623f82.jpg' },
      { id: 'nfsong2', title: 'Gadget Groove', artist: 'Nobita & Friends', album: 'Future Beats', duration: '2:55', albumArtUrl: 'https://i.pinimg.com/564x/0f/6c/43/0f6c43a699a20ba1816585999d944567.jpg' },
    ],
    albums: [
      { id: 'nfalbum1', title: 'Adventure Anthems', description: 'Soundtrack to epic journeys', imageUrl: 'https://i.pinimg.com/564x/e0/7a/27/e07a271837a31e30ad085b5103623f82.jpg', type: 'album' },
    ],
    relatedArtists: [
      { id: 'relArtist1', title: 'Dorami Beats', description: 'Sisterly Synths', imageUrl: 'https://i.pinimg.com/564x/b5/09/50/b509508271009e60f4e51b7c65315f93.jpg', type: 'artist' },
    ]
  },
  'artistSearch1': { // Suneo
    id: 'artistSearch1',
    name: 'Suneo Honekawa',
    bio: 'The rich kid with a golden voice (or so he thinks). Delivers pop tunes with a flair for the dramatic.',
    imageUrl: 'https://i.pinimg.com/564x/82/0c/8e/820c8eb31121576c14443cf195c83636.jpg',
    avatarUrl: 'https://i.pinimg.com/564x/82/0c/8e/820c8eb31121576c14443cf195c83636.jpg',
    followers: 50000,
    popularSongs: [ { id: 'suneo1', title: 'My Extravagant Life', artist: 'Suneo Honekawa', duration: '3:00', albumArtUrl: 'https://i.pinimg.com/564x/7c/9c/38/7c9c383259f66f2e6d9a0a2c64e63039.jpg'} ],
    albums: [ {id: 'suneoAlbum1', title: 'Rich Rhythms', description: 'Suneo Honekawa', imageUrl: 'https://i.pinimg.com/564x/7c/9c/38/7c9c383259f66f2e6d9a0a2c64e63039.jpg', type: 'album'}],
    relatedArtists: []
  }
};

const ArtistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<ArtistDetails | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log('ArtistPage loaded for ID:', id);
    if (id && mockArtistsData[id]) {
      setArtist(mockArtistsData[id]);
      // Mock follow state
      setIsFollowing(Math.random() > 0.5);
    } else {
      console.error('Artist not found for ID:', id);
      // navigate('/not-found');
    }
  }, [id, navigate]);

  const handlePlaySong = (songId: string) => console.log(`Playing song ${songId} by ${artist?.name}`);
  const handleCardPlay = (cardId: string | number, type: ContentCardDoraemonProps['type']) => console.log(`Play ${type} ${cardId}`);
  const handleCardView = (cardId: string | number, type: ContentCardDoraemonProps['type']) => {
     if (type === 'album') navigate(`/album/${cardId}`);
     else if (type === 'artist') navigate(`/artist/${cardId}`);
  };
  const toggleFollow = () => setIsFollowing(!isFollowing);

  if (!artist) {
    return (
      <div className="flex h-screen bg-blue-50">
        <ThemedSidebar />
        <main className="flex-1 flex items-center justify-center p-6">
          <p className="text-xl text-blue-700">Loading artist details or artist not found...</p>
        </main>
        <MusicPlayerBar />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      <ThemedSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 pb-[100px]">
          <header className="relative h-[300px] md:h-[400px] text-white">
            <img src={artist.imageUrl} alt={`${artist.name} banner`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
               <div className="flex items-end space-x-4">
                    <Avatar className="h-24 w-24 md:h-32 md:h-32 border-4 border-blue-300 shadow-lg">
                        <AvatarImage src={artist.avatarUrl} alt={artist.name} />
                        <AvatarFallback>{artist.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">ARTIST</p>
                        <h1 className="text-4xl md:text-6xl font-bold break-words">{artist.name}</h1>
                        <p className="text-sm mt-1">{artist.followers.toLocaleString()} followers</p>
                    </div>
               </div>
            </div>
          </header>

          <div className="p-6 flex items-center space-x-4">
            <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">Play</Button>
            <Button
              variant={isFollowing ? "secondary" : "outline"}
              className={`rounded-full px-6 ${isFollowing ? 'bg-blue-200 text-blue-800 border-blue-300 hover:bg-blue-300' : 'border-blue-600 text-blue-600 hover:bg-blue-100'}`}
              onClick={toggleFollow}
            >
              {isFollowing ? <CheckCircle size={18} className="mr-2" /> : <UserPlus size={18} className="mr-2" />}
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
          
          <div className="px-6">
            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="bg-blue-100 border border-blue-200 mb-4">
                <TabsTrigger value="popular" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Popular</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Albums</TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">About</TabsTrigger>
                <TabsTrigger value="related" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Related Artists</TabsTrigger>
              </TabsList>

              <TabsContent value="popular">
                <div className="space-y-1">
                  {artist.popularSongs.map((song, index) => (
                    <SongListItem key={song.id} song={song} trackNumber={index + 1} onPlaySong={handlePlaySong} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="albums">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {artist.albums.map(album => (
                    <ContentCardDoraemon key={album.id} {...album} onPlayClick={handleCardPlay} onViewClick={handleCardView} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="about">
                <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Biography</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{artist.bio}</p>
                </div>
              </TabsContent>
              <TabsContent value="related">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {artist.relatedArtists.map(relArtist => (
                    <ContentCardDoraemon key={relArtist.id} {...relArtist} onPlayClick={handleCardPlay} onViewClick={handleCardView} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </main>
      <MusicPlayerBar />
    </div>
  );
};

export default ArtistPage;