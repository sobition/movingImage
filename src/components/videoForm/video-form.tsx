import React, { useState, useContext, useEffect, memo } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { EditInputGroup, ButtonContainer } from './video-form.style';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import VideosContext from '../videos-context';
import { getVideos } from '../../services/videos';
import { ProcessedVideo } from '../../common/interfaces';
import { VideoCategories, VideoAuthors } from '../../common/constants';
import getCurrentDate from '../../utils/getCurrentDate';

const VideoForm: React.FC = () => {
  const videoContextValue = useContext(VideosContext);
  let location = useLocation();
  let history = useHistory();
  const { videoId } = useParams<{ videoId: string }>();

  const typedKeys = <T,>(object: T): (keyof T)[] => Object.keys(object) as (keyof T)[];

  const [formValues, setFormValues] = useState<ProcessedVideo>({
    id: Math.ceil(Math.random() * 10 + 10),
    name: '',
    author: '',
    categories: [],
    release: getCurrentDate(),
    format: { one: { res: '1080p', size: 1000 } },
  });
  const [Invalids, setInvalids] = useState<string[]>([]);
  const SubmitForm = () => {
    if (ValidateForm()) {
      if (location.pathname === '/new') {
        let newVideo: ProcessedVideo = {
          ...formValues,
          author: formValues.author,
          name: formValues.name,
        };

        videoContextValue.setVideos([...videoContextValue.videos, newVideo]);
        history.push('/');
      } else {
        videoContextValue.videos.every((video: ProcessedVideo) => {
          if (video.id === parseInt(videoId)) {
            let videoIndex = videoContextValue.videos.indexOf(video);
            let newList = videoContextValue.videos;
            newList[videoIndex] = JSON.parse(JSON.stringify(formValues));
            videoContextValue.setVideos(newList);
            return false;
          }
          return true;
        });
        history.push('/');
      }
    }
  };

  const ValidateForm = () => {
    let invalidArray: string[] = [];

    typedKeys(formValues).forEach((field) => {
      let item: any = formValues[field];
      if (!item) {
        invalidArray.push(field);
      }
    });
    if (!formValues.categories.length) {
      invalidArray.push('categories');
    }
    setInvalids(invalidArray);

    return !invalidArray.length;
  };

  const getVideoInfoData = (videosArray: ProcessedVideo[], Videoid: string) => {
    videosArray.every((video: ProcessedVideo) => {
      if (video.id === parseInt(Videoid)) {
        setFormValues({ ...video, release: getCurrentDate(), format: { one: { res: '1080p', size: 1000 } } });
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    if (!videoContextValue.videos.length && location.pathname.includes('/edit')) {
      getVideos().then((videos: ProcessedVideo[]) => {
        videoContextValue.setVideos(videos);
        getVideoInfoData(videos, videoId);
      });
    } else {
      getVideoInfoData(videoContextValue.videos, videoId);
    }
  }, []);

  return (
    <>
      <Container>
        <h1 className="edit-page-header">{location.pathname === '/new' ? 'Add Video' : `Edit video: ${formValues.name}`}</h1>
        <form onSubmit={() => SubmitForm()} className={''} noValidate autoComplete="off">
          <EditInputGroup>
            <label>Video name</label>
            <div>
              <input
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                placeholder={'Video name'}
              />
              {Invalids.includes('name') ? <small>please enter the name</small> : ''}
            </div>
          </EditInputGroup>

          <EditInputGroup>
            <label>Video author</label>
            <div>
              <select
                name="author"
                id="author"
                value={formValues.author}
                onChange={(e) => setFormValues({ ...formValues, author: e.target.value })}>
                <option value="" disabled selected hidden>
                  {'Video author'}
                </option>
                {VideoAuthors.map((author) => {
                  return <option value={author}>{author}</option>;
                })}
              </select>
              {Invalids.includes('author') ? <small>please enter the author's name</small> : ''}
            </div>
          </EditInputGroup>
          <EditInputGroup>
            <label>Video category</label>
            <div>
              <select
                name="categories"
                id="categories"
                value={formValues.categories}
                onChange={(e) =>
                  setFormValues({ ...formValues, categories: Array.from(e.target.selectedOptions, (option) => option.value) })
                }
                multiple>
                {VideoCategories.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
              {Invalids.includes('categories') ? <small>please select the categories</small> : ''}
            </div>
          </EditInputGroup>

          <ButtonContainer>
            <Button variant="contained" color="primary" onClick={() => (ValidateForm() ? SubmitForm() : '')}>
              {location.pathname === '/new' ? 'Add' : 'Edit'}
            </Button>
            <Button id="CancelBtn" onClick={() => history.push('/')}>
              Cancel
            </Button>
          </ButtonContainer>
        </form>
      </Container>
    </>
  );
};

export default memo(VideoForm);
