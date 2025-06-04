import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from 'lucide-react'; // Doraemon's bell could be an icon theme

interface ContentCardDoraemonProps {
  id: string | number;
  title: string;
  description?: string;
  imageUrl: string;
  type: 'album' | 'playlist' | 'artist' | 'recommendation';
  onPlayClick?: (id: string | number, type: ContentCardDoraemonProps['type']) => void;
  onViewClick?: (id: string | number, type: ContentCardDoraemonProps['type']) => void;
}

const ContentCardDoraemon: React.FC<ContentCardDoraemonProps> = ({
  id,
  title,
  description,
  imageUrl,
  type,
  onPlayClick,
  onViewClick,
}) => {
  console.log("Rendering ContentCardDoraemon:", title);

  // Doraemon theme: light blues, white, rounded corners, playful elements
  // This will be primarily handled by Tailwind classes
  // A subtle blue shadow or border could be nice.
  return (
    <Card className="w-full max-w-[200px] bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-2 border-blue-200 hover:border-blue-400 group">
      <CardHeader className="p-0 relative">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          className="aspect-square w-full object-cover"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
        {onPlayClick && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-blue-500 hover:text-white rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => onPlayClick(id, type)}
            aria-label={`Play ${title}`}
          >
            <PlayCircle className="h-6 w-6 text-blue-600 group-hover:text-white" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle
            className="text-sm font-semibold text-blue-800 truncate cursor-pointer hover:underline"
            onClick={() => onViewClick && onViewClick(id, type)}
            title={title}
        >
            {title}
        </CardTitle>
        {description && <p className="text-xs text-gray-600 truncate mt-1">{description}</p>}
      </CardContent>
      {/* Optional Footer for more actions or details if needed
      <CardFooter className="p-3 pt-0">
          <Button variant="link" size="sm" className="text-blue-600 p-0" onClick={() => onViewClick && onViewClick(id, type)}>
            View {type}
          </Button>
      </CardFooter>
      */}
    </Card>
  );
};

export default ContentCardDoraemon;