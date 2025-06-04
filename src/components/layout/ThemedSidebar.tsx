import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, BookOpen } from 'lucide-react'; // Doraemon-esque icons where possible
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder for Doraemon-themed logo or image
const DoraemonLogoPlaceholder = () => (
  <div className="p-4 mb-4 text-center">
    <img src="/placeholder.svg" alt="Doraemon Theme Logo" className="w-24 h-24 mx-auto rounded-full bg-blue-300" />
    <h1 className="mt-2 text-xl font-bold text-blue-700">DoraMusic</h1>
  </div>
);

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to || (currentPath.startsWith(to) && to !== "/");
  return (
    <Link to={to}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-start text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700 hover:bg-blue-100'}`}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </Button>
    </Link>
  );
};

const ThemedSidebar: React.FC = () => {
  console.log("Rendering ThemedSidebar");
  const location = useLocation();
  const currentPath = location.pathname;

  // Example playlist items - these would likely come from state or API
  const playlists = [
    { id: '1', name: 'My Favorites' },
    { id: '2', name: 'Chill Vibes' },
    { id: '3', name: 'Workout Mix' },
  ];

  return (
    <aside className="w-64 bg-blue-50 border-r border-blue-200 flex flex-col h-screen sticky top-0">
      <DoraemonLogoPlaceholder />
      <nav className="px-3 py-4 space-y-1">
        <NavItem to="/" icon={<Home size={20} />} label="Home" currentPath={currentPath} />
        <NavItem to="/search" icon={<Search size={20} />} label="Search" currentPath={currentPath} />
        <NavItem to="/library" icon={<Library size={20} />} label="Your Library" currentPath={currentPath} />
      </nav>

      <div className="mt-4 px-3 py-2">
        <Button variant="ghost" className="w-full justify-start text-sm text-gray-700 hover:bg-blue-100">
          <PlusSquare size={20} />
          <span className="ml-3">Create Playlist</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sm text-gray-700 hover:bg-blue-100">
          <Heart size={20} />
          <span className="ml-3">Liked Songs</span>
        </Button>
      </div>

      <hr className="my-4 border-blue-200" />

      <ScrollArea className="flex-grow px-3">
        <h3 className="mb-2 px-1 text-xs font-semibold text-blue-600 uppercase">Playlists</h3>
        <div className="space-y-1">
          {playlists.map((playlist) => (
            <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs text-gray-600 hover:bg-blue-100 truncate"
                title={playlist.name}
              >
                <BookOpen size={16} className="mr-2 opacity-70" />
                {playlist.name}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      
      {/* User profile / settings link at the bottom */}
      <div className="p-4 mt-auto border-t border-blue-200">
        {/* Placeholder for user avatar and name */}
        <div className="flex items-center space-x-2">
            <img src="/placeholder.svg" alt="User Avatar" className="w-8 h-8 rounded-full bg-gray-300" />
            <span className="text-sm font-medium text-gray-700">User Name</span>
        </div>
      </div>
    </aside>
  );
};

export default ThemedSidebar;