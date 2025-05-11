
interface DownloadParams {
  url: string;
  type?: 'general' | 'youtube' | 'instagram' | 'twitter' | 'tiktok' | 'torrent';
  options?: {
    audioOnly?: boolean;
    includeSubtitles?: boolean;
    includeThumbnail?: boolean;
    includeMetadata?: boolean;
  };
}

interface DownloadResponse {
  success: boolean;
  message: string;
  downloadId?: string;
  filename?: string;
  size?: string;
}

export async function initiateDownload({ url, type = 'general', options }: DownloadParams): Promise<DownloadResponse> {
  try {
    const response = await fetch('https://e67cfd0f-325c-4245-85db-ecda0449d4ac-00-2iqqtm6mqb6m8.pike.replit.dev/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        type,
        ...options
      })
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Download API Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to connect to download server'
    };
  }
}

export async function checkDownloadStatus(downloadId: string) {
  try {
    const response = await fetch(`https://e67cfd0f-325c-4245-85db-ecda0449d4ac-00-2iqqtm6mqb6m8.pike.replit.dev/download/status/${downloadId}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Status API Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to check download status'
    };
  }
}
