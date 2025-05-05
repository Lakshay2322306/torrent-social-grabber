
import React from 'react';
import { Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Header = () => {
  return (
    <header className="py-4 border-b border-border">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Download className="h-6 w-6 text-teal-400" />
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Multi</span>Downloader
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="space-y-3">
                      <h3 className="font-semibold">Download Settings</h3>
                      <div className="space-y-1">
                        <label className="text-sm text-muted-foreground">
                          Max simultaneous downloads
                        </label>
                        <select className="w-full bg-secondary rounded p-2 text-sm">
                          <option>1</option>
                          <option>3</option>
                          <option selected>5</option>
                          <option>10</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm text-muted-foreground">
                          Default download location
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            disabled
                            type="text"
                            className="flex-1 bg-secondary rounded p-2 text-sm"
                            value="/downloads"
                          />
                          <Button variant="secondary" size="sm">Browse</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable chunks</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Default quality (YouTube)</span>
                        <select className="bg-secondary rounded p-1 text-sm">
                          <option>Best</option>
                          <option selected>1080p</option>
                          <option>720p</option>
                          <option>480p</option>
                        </select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
