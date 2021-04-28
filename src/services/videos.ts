import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Author, ProcessedVideo, VideoFormat } from '../common/interfaces';

interface Cateory {

  [key: number]: string;
}

const getCategoriesName = (catIdArray: number[], categoriesRef: Cateory) => {
  let arr: string[] = [];
  catIdArray.forEach((catId: number) => {
    arr.push(categoriesRef[catId]);
  });

  return arr;
};

const randomVideoFormatGenerator = () => {
  let qualityOptions = ['1080p', '720p'];
  let format: VideoFormat = {};
  switch (qualityOptions[Math.floor(Math.random() * qualityOptions.length)]) {
    case '1080p':
      format['best'] = {
        res: '1080p',
        size: 1000,
      };
      break;
    case '720p':
      format['medium'] = {
        res: '720p',
        size: 850,
      };
      break;

    default:
      break;
  }

  return { ...format };
};

const randomDateGenerator = () => {
  return `${Math.ceil(Math.random() * 30)}.${Math.ceil(Math.random() * 12)}.${Math.floor(Math.random() * 100 + 1920)}`;
};

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    let processedVideos: ProcessedVideo[] = [];
    let categoriesRef: Cateory = {};

    categories.forEach((category) => {
      categoriesRef[category.id] = category.name;
    });

    authors.forEach((author: Author) => {
      author.videos.forEach((vid) => {
        let videoInfo = { ...vid };
        processedVideos.push({
          author: author.name,
          id: videoInfo.id,
          name: videoInfo.name,
          categories: getCategoriesName(videoInfo['catIds'], categoriesRef),
          format: randomVideoFormatGenerator(),
          release: randomDateGenerator(),
        });
      });
    });

    return processedVideos;
  });
};

