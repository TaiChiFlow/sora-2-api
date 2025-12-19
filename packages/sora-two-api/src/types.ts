export type SoraTwoAspectRatio = '16:9' | '9:16';

export type SoraTwoTaskStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type SoraTwoVideoGenerationRequest = {
  model?: 'sora-2' | (string & {});
  prompt: string;
  aspect_ratio?: SoraTwoAspectRatio;
  image_urls?: string[];
  remove_watermark?: boolean;
  duration?: 10 | 15 | number;
  callback_url?: string;
};

export type SoraTwoUsage = {
  billing_rule?: string;
  credits_reserved?: number;
  user_group?: string;
};

export type SoraTwoVideoTaskInfo = {
  can_cancel?: boolean;
  estimated_time?: number;
  video_duration?: number;
};

export type SoraTwoVideoGenerationResponse = {
  created: number;
  id: string;
  model: string;
  object: 'video.generation.task' | string;
  progress: number;
  status: SoraTwoTaskStatus;
  type: 'video' | 'image' | 'audio' | 'text' | string;
  task_info?: SoraTwoVideoTaskInfo;
  usage?: SoraTwoUsage;
};

export type SoraTwoTaskDetailResponse = {
  created: number;
  id: string;
  model: string;
  object: 'image.generation.task' | 'video.generation.task' | 'audio.generation.task' | string;
  progress: number;
  results?: string[];
  status: SoraTwoTaskStatus;
  type: 'video' | 'image' | 'audio' | 'text' | string;
  task_info?: {
    can_cancel?: boolean;
    [k: string]: unknown;
  };
};

export class SoraTwoApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'SoraTwoApiError';
    this.status = status;
  }
}
