
import React from 'react';
import DownloadItem from './DownloadItem';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, Trash2 } from 'lucide-react';

interface Download {
  id: string;
  url: string;
  type: string;
  filename: string;
  size: string;
  status: string;
  progress: number;
  speed: string;
  chunks: number[];
  createdAt: string;
}

interface DownloadListProps {
  downloads: Download[];
  onRemoveDownload: (id: string) => void;
  onClearCompleted: () => void;
}

const DownloadList: React.FC<DownloadListProps> = ({
  downloads,
  onRemoveDownload,
  onClearCompleted,
}) => {
  if (downloads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <div className="rounded-full bg-secondary/80 p-4 mb-4">
          <PlayCircle className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium">No downloads yet</h3>
        <p className="text-sm mt-1">Add a URL, torrent, or video to begin downloading</p>
      </div>
    );
  }

  const activeDownloads = downloads.filter(d => d.status === 'downloading' || d.status === 'queued');
  const completedDownloads = downloads.filter(d => d.status === 'completed');
  const pausedDownloads = downloads.filter(d => d.status === 'paused');
  
  return (
    <div className="space-y-6">
      {activeDownloads.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Active Downloads ({activeDownloads.length})</h2>
            <Button variant="ghost" size="sm" className="h-8">
              <PauseCircle className="h-4 w-4 mr-2" />
              Pause All
            </Button>
          </div>
          <div className="space-y-2">
            {activeDownloads.map(download => (
              <DownloadItem 
                key={download.id} 
                download={download} 
                onRemove={onRemoveDownload} 
              />
            ))}
          </div>
        </div>
      )}
      
      {pausedDownloads.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Paused Downloads ({pausedDownloads.length})</h2>
            <Button variant="ghost" size="sm" className="h-8">
              <PlayCircle className="h-4 w-4 mr-2" />
              Resume All
            </Button>
          </div>
          <div className="space-y-2">
            {pausedDownloads.map(download => (
              <DownloadItem 
                key={download.id} 
                download={download} 
                onRemove={onRemoveDownload} 
              />
            ))}
          </div>
        </div>
      )}
      
      {completedDownloads.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Completed Downloads ({completedDownloads.length})</h2>
            <Button variant="ghost" size="sm" className="h-8" onClick={onClearCompleted}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Completed
            </Button>
          </div>
          <div className="space-y-2">
            {completedDownloads.map(download => (
              <DownloadItem 
                key={download.id} 
                download={download} 
                onRemove={onRemoveDownload} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadList;
