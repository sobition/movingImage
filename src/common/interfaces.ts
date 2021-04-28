export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
}

export interface NormalisedCateory {
  [key: number]: string;
}
export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface VideoFormat {
  [key: string]: {
    res: string;
    size: number;
  };
}
export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
  format: VideoFormat;
  release: string;
}
