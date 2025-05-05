
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Download, Download as DownloadIcon, FileDown, Link, Magnet } from 'lucide-react';

const AddDownload = ({ onAddDownload }: { onAddDownload: (download: any) => void }) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentTab, setCurrentTab] = useState('url');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate URL analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Create a mock download object based on URL type
      const downloadType = url.includes('magnet:') ? 'torrent' : 
                           url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' :
                           url.includes('instagram') ? 'instagram' :
                           url.includes('twitter') || url.includes('x.com') ? 'twitter' :
                           url.includes('tiktok') ? 'tiktok' : 'general';
      
      const mockDownload = {
        id: `download-${Date.now()}`,
        url,
        type: downloadType,
        filename: `file-${Date.now()}.${downloadType === 'youtube' ? 'mp4' : 
                                      downloadType === 'torrent' ? 'torrent' : 'bin'}`,
        size: Math.floor(Math.random() * 1024) + 'MB',
        status: 'queued',
        progress: 0,
        speed: '0 KB/s',
        chunks: Array(4).fill(0).map(() => Math.random() * 100),
        createdAt: new Date().toISOString(),
      };
      
      onAddDownload(mockDownload);
      setUrl('');
      toast.success('Download added to queue');
    }, 1500);
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <Tabs defaultValue="url" value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="url" className="data-[state=active]:bg-secondary">
              <Link className="h-4 w-4 mr-2" />
              URL
            </TabsTrigger>
            <TabsTrigger value="torrent" className="data-[state=active]:bg-secondary">
              <Magnet className="h-4 w-4 mr-2" />
              Torrent
            </TabsTrigger>
            <TabsTrigger value="ytdlp" className="data-[state=active]:bg-secondary">
              <Download className="h-4 w-4 mr-2" />
              YT-DLP
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-muted-foreground">
                  Enter URL to download (website, video, image, file)
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/file.mp4"
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <div className="animate-pulse-opacity mr-2">Analyzing</div>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="torrent" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-muted-foreground">
                  Enter magnet link or upload .torrent file
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="magnet:?xt=urn:btih:..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <div className="animate-pulse-opacity mr-2">Analyzing</div>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      </>
                    ) : (
                      <>
                        <Magnet className="h-4 w-4 mr-2" />
                        Add Torrent
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-center w-full mt-2">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer border-border bg-secondary/40 hover:bg-secondary transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileDown className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Click to upload</span> or drag and drop .torrent file
                      </p>
                    </div>
                    <input type="file" className="hidden" accept=".torrent" />
                  </label>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="ytdlp" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-muted-foreground">
                  Enter URL for YT-DLP supported site (YouTube, Vimeo, Instagram, Twitter, etc.)
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <div className="animate-pulse-opacity mr-2">Analyzing</div>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-thumbnail" defaultChecked />
                    <label htmlFor="include-thumbnail" className="text-sm">
                      Download thumbnail
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-subtitles" defaultChecked />
                    <label htmlFor="include-subtitles" className="text-sm">
                      Download subtitles
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="audio-only" />
                    <label htmlFor="audio-only" className="text-sm">
                      Audio only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-metadata" defaultChecked />
                    <label htmlFor="include-metadata" className="text-sm">
                      Include metadata
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AddDownload;
