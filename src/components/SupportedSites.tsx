
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Youtube, 
  Twitter, 
  Instagram, 
  Facebook, 
  Twitch, 
  Cloud, 
  FileDown,
  Tv
} from 'lucide-react';

const sites = [
  { name: 'YouTube', icon: <Youtube className="h-3 w-3" />, category: 'video' },
  { name: 'Vimeo', icon: <Tv className="h-3 w-3" />, category: 'video' },
  { name: 'Twitter/X', icon: <Twitter className="h-3 w-3" />, category: 'social' },
  { name: 'Instagram', icon: <Instagram className="h-3 w-3" />, category: 'social' },
  { name: 'TikTok', icon: <FileDown className="h-3 w-3" />, category: 'social' },
  { name: 'Facebook', icon: <Facebook className="h-3 w-3" />, category: 'social' },
  { name: 'Twitch', icon: <Twitch className="h-3 w-3" />, category: 'stream' },
  { name: 'SoundCloud', icon: <Cloud className="h-3 w-3" />, category: 'audio' },
  { name: 'Bandcamp', icon: <FileDown className="h-3 w-3" />, category: 'audio' },
  { name: 'Reddit', icon: <FileDown className="h-3 w-3" />, category: 'social' },
  { name: 'Tumblr', icon: <FileDown className="h-3 w-3" />, category: 'social' },
  { name: 'Dailymotion', icon: <Tv className="h-3 w-3" />, category: 'video' },
  { name: 'Vevo', icon: <Tv className="h-3 w-3" />, category: 'video' },
  { name: 'Udemy', icon: <FileDown className="h-3 w-3" />, category: 'educational' },
  { name: 'Coursera', icon: <FileDown className="h-3 w-3" />, category: 'educational' },
  { name: 'LinkedIn', icon: <FileDown className="h-3 w-3" />, category: 'social' },
  { name: 'Pinterest', icon: <FileDown className="h-3 w-3" />, category: 'social' },
  { name: 'Flickr', icon: <FileDown className="h-3 w-3" />, category: 'image' },
  { name: 'Imgur', icon: <FileDown className="h-3 w-3" />, category: 'image' },
  { name: 'OneDrive', icon: <Cloud className="h-3 w-3" />, category: 'cloud' },
  { name: 'Dropbox', icon: <Cloud className="h-3 w-3" />, category: 'cloud' },
  { name: 'Google Drive', icon: <Cloud className="h-3 w-3" />, category: 'cloud' },
  { name: 'MediaFire', icon: <Cloud className="h-3 w-3" />, category: 'cloud' },
  { name: 'MEGA', icon: <Cloud className="h-3 w-3" />, category: 'cloud' }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'video': return 'bg-red-500/20 text-red-500';
    case 'social': return 'bg-blue-500/20 text-blue-500';
    case 'audio': return 'bg-amber-500/20 text-amber-500';
    case 'stream': return 'bg-purple-500/20 text-purple-500';
    case 'cloud': return 'bg-sky-500/20 text-sky-500';
    case 'image': return 'bg-green-500/20 text-green-500';
    case 'educational': return 'bg-indigo-500/20 text-indigo-500';
    default: return 'bg-gray-500/20 text-gray-500';
  }
};

const SupportedSites = () => {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <h3 className="text-lg font-semibold mb-3">Supported Sites</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This application supports downloading from 1000+ sites using yt-dlp. Here are some popular ones:
      </p>
      <ScrollArea className="h-[120px] w-full">
        <div className="flex flex-wrap gap-2">
          {sites.map((site, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`flex items-center gap-1 ${getCategoryColor(site.category)}`}
            >
              {site.icon}
              {site.name}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SupportedSites;
