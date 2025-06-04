import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import YourLibraryPage from "./pages/YourLibraryPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import ArtistPage from "./pages/ArtistPage";
// Assuming AlbumDetailPage would be similar to PlaylistDetailPage or ArtistPage,
// for now, ContentCardDoraemon links for albums might lead to a generic view or need a new page.
// For simplicity, I'll add a placeholder route for album if clicked.
// import AlbumDetailPage from "./pages/AlbumDetailPage"; 
import NotFound from "./pages/NotFound"; // Always Must Include (Assuming we already have NotFound.tsx)

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<YourLibraryPage />} />
          <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          {/* Placeholder for Album Detail Page - Create if needed */}
          {/* <Route path="/album/:id" element={<AlbumDetailPage />} /> */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;