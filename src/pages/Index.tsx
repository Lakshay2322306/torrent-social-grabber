
import React, { useState } from 'react';
import Header from '@/components/Header';
import AddDownload from '@/components/AddDownload';
import DownloadList from '@/components/DownloadList';
import StatusBar from '@/components/StatusBar';
import SupportedSites from '@/components/SupportedSites';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

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

const Index = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);

  const handleAddDownload = (download: Download) => {
    setDownloads(prevDownloads => [download, ...prevDownloads]);
  };

  const handleRemoveDownload = (id: string) => {
    setDownloads(prevDownloads => prevDownloads.filter(d => d.id !== id));
    toast.success('Download removed');
  };

  const handleClearCompleted = () => {
    setDownloads(prevDownloads => prevDownloads.filter(d => d.status !== 'completed'));
    toast.success('Completed downloads cleared');
  };

  const activeDownloads = downloads.filter(d => d.status === 'downloading').length;
  const downloadSpeed = activeDownloads > 0 ? `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 99)} MB/s` : '0 KB/s';
  const uploadSpeed = activeDownloads > 0 ? `${Math.floor(Math.random() * 500) + 10} KB/s` : '0 KB/s';
  const diskSpace = '128.5 GB';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AddDownload onAddDownload={handleAddDownload} />
            <Separator />
            <DownloadList 
              downloads={downloads} 
              onRemoveDownload={handleRemoveDownload}
              onClearCompleted={handleClearCompleted}
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Multi Downloader</h3>
              <p className="text-sm text-muted-foreground">
                A powerful Java-based downloader that supports torrents, social media, and various website downloads using YT-DLP integration.
              </p>
              
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                  Chunk-based downloading for faster speeds
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                  Social media content scraping
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                  YT-DLP integration for 1000+ sites
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                  Torrent support with magnet links
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                  Advanced quality selection
                </li>
              </ul>
            </div>
            
            <SupportedSites />
            
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Download Statistics</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-mono">{downloads.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-mono">{downloads.filter(d => d.status === 'completed').length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-mono">{activeDownloads}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <StatusBar 
        activeDownloads={activeDownloads}
        downloadSpeed={downloadSpeed}
        uploadSpeed={uploadSpeed}
        diskSpace={diskSpace}
      />
    </div>
  );
};

export default Index;
