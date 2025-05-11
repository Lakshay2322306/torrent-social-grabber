import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pause, Play, Trash2, FileDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { checkDownloadStatus } from '@/utils/downloadApi';

interface DownloadItemProps {
  download: {
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
  };
  onRemove: (id: string) => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'youtube':
      return <span className="text-red-500 text-xs font-semibold">YT</span>;
    case 'instagram':
      return <span className="text-pink-500 text-xs font-semibold">IG</span>;
    case 'twitter':
      return <span className="text-blue-500 text-xs font-semibold">TW</span>;
    case 'tiktok':
      return <span className="text-cyan-500 text-xs font-semibold">TT</span>;
    case 'torrent':
      return <span className="text-green-500 text-xs font-semibold">TR</span>;
    default:
      return <span className="text-gray-500 text-xs font-semibold">DL</span>;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'downloading':
      return 'bg-teal-500';
    case 'paused':
      return 'bg-amber-500';
    case 'completed':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'queued':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

const DownloadItem: React.FC<DownloadItemProps> = ({ download, onRemove }) => {
  const [status, setStatus] = useState(download.status);
  const [progress, setProgress] = useState(download.progress);
  const [speed, setSpeed] = useState(download.speed);
  const [chunks, setChunks] = useState(download.chunks);
  
  // Check download status from API
  useEffect(() => {
    if (status === 'downloading' || status === 'queued') {
      const statusCheck = setInterval(async () => {
        try {
          // Only check status if we have a valid ID from the API
          if (download.id && download.id.startsWith('download-') === false) {
            const result = await checkDownloadStatus(download.id);
            
            if (result.success) {
              if (result.status === 'completed') {
                clearInterval(statusCheck);
                setStatus('completed');
                setProgress(100);
                setSpeed('0 KB/s');
              } else if (result.status === 'error') {
                clearInterval(statusCheck);
                setStatus('error');
              } else {
                setStatus(result.status);
                if (result.progress) setProgress(result.progress);
                if (result.speed) setSpeed(result.speed);
                
                // Update chunks if available
                if (result.chunks) {
                  setChunks(result.chunks);
                } else {
                  // Otherwise simulate chunk progress based on overall progress
                  setChunks(chunks.map(() => {
                    const randomVariation = Math.random() * 10 - 5; // +/- 5%
                    const chunkProgress = Math.max(0, Math.min(100, result.progress + randomVariation));
                    return chunkProgress;
                  }));
                }
              }
            }
          } else {
            // For mock downloads (without real API IDs), use the simulation logic
            simulateProgress();
          }
        } catch (error) {
          console.error('Error checking download status:', error);
        }
      }, 1000);
      
      return () => clearInterval(statusCheck);
    }
  }, [download.id, status]);
  
  // Simulate download progress for mock downloads
  const simulateProgress = () => {
    setProgress((prevProgress) => {
      const newProgress = prevProgress + Math.random() * 5;
      if (newProgress >= 100) {
        setStatus('completed');
        setSpeed('0 KB/s');
        return 100;
      }
      
      // Update chunks
      setChunks((prevChunks) => 
        prevChunks.map(chunk => {
          const newChunk = chunk + Math.random() * 5;
          return newChunk > 100 ? 100 : newChunk;
        })
      );
      
      // Update speed
      setSpeed(`${Math.floor(Math.random() * 1024) + 100} KB/s`);
      
      return newProgress;
    });
  };

  const togglePause = async () => {
    // If this is a real API download with ID, send pause/resume request
    if (download.id && download.id.startsWith('download-') === false) {
      try {
        const action = status === 'downloading' ? 'pause' : 'resume';
        const response = await fetch(`https://e67cfd0f-325c-4245-85db-ecda0449d4ac-00-2iqqtm6mqb6m8.pike.replit.dev/download/${action}/${download.id}`);
        
        if (response.ok) {
          setStatus(status === 'downloading' ? 'paused' : 'downloading');
        }
      } catch (error) {
        console.error(`Error ${status === 'downloading' ? 'pausing' : 'resuming'} download:`, error);
      }
    } else {
      // For mock downloads
      setStatus(status === 'downloading' ? 'paused' : 'downloading');
    }
  };

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                {getTypeIcon(download.type)}
              </div>
              <div className="font-medium truncate max-w-[200px]" title={download.filename}>
                {download.filename}
              </div>
              <Badge variant="secondary" className="text-xs">
                {download.size}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={togglePause} disabled={status === 'completed'}>
                      {status === 'downloading' ? 
                        <Pause className="h-3 w-3" /> : 
                        <Play className="h-3 w-3" />
                      }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{status === 'downloading' ? 'Pause' : 'Resume'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      disabled={status !== 'completed'}
                    >
                      <FileDown className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open file location</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={() => onRemove(download.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)}`} />
              <span className="capitalize">{status}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{Math.round(progress)}%</span>
              {status === 'downloading' && <span>{speed}</span>}
            </div>
          </div>
          
          {status === 'downloading' && (
            <div className="chunk-bar">
              {chunks.map((chunk, i) => (
                <div 
                  key={i} 
                  className="chunk-segment"
                  style={{ 
                    width: `${100 / chunks.length}%`, 
                    background: `linear-gradient(to right, rgba(45, 212, 191, ${chunk/100}) 0%, rgba(139, 92, 246, ${chunk/100}) 100%)` 
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadItem;
