
import React from 'react';
import { Activity, Database, Download, HardDrive, Wifi } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatusBarProps {
  activeDownloads: number;
  downloadSpeed: string;
  uploadSpeed: string;
  diskSpace: string;
}

const StatusBar: React.FC<StatusBarProps> = ({
  activeDownloads,
  downloadSpeed,
  uploadSpeed,
  diskSpace
}) => {
  return (
    <div className="bg-secondary/50 border-t border-border py-1.5 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <Download className="h-3 w-3 text-teal-400" />
                    <span>{activeDownloads} active</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Active downloads</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <Wifi className="h-3 w-3 text-teal-400" />
                    <span>{downloadSpeed} ↓ {uploadSpeed} ↑</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Download and upload speed</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <HardDrive className="h-3 w-3 text-teal-400" />
                    <span>{diskSpace} free</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Free disk space</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <Database className="h-3 w-3 text-teal-400" />
                    <span>Java 17.0.9</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Java Runtime Version</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1">
                    <Activity className="h-3 w-3 text-teal-400" />
                    <span>YT-DLP 2023.12.30</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>YT-DLP Version</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
