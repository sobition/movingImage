import React, { useEffect, useState } from 'react';
import { AppBar, Container, Typography } from '@material-ui/core';
import { VideosTable } from './components/videosTable/videos-table';
import VideoForm from './components/videoForm/video-form';
import { getVideos } from './services/videos';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ProcessedVideo } from './common/interfaces';

import VideosContext from './components/videos-context';
import { NewVideoLink, CustomToolbar } from './App.style';
const App: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  let location = useLocation();

  useEffect(() => {
    getVideos().then((videos) => {
      setVideos(videos);
    });
  }, []);

  return (
    <>
      <AppBar position="static">
        <CustomToolbar className={'toolbar-container'}>
          <Typography variant="h6">Videos</Typography>
          {location.pathname === '/' ? (
            <NewVideoLink className={'new-video-link'} to={'/new'}>
              Add Video
            </NewVideoLink>
          ) : (
            ''
          )}
        </CustomToolbar>
      </AppBar>
      <VideosContext.Provider value={{ videos, setVideos }}>
        <Switch>
          <Route exact path="/">
            <Container>
              <h1>VManager Demo v0.0.1</h1>
              <VideosTable />
            </Container>
          </Route>

          <Route exact path="/new">
            <VideoForm />
          </Route>

          <Route path="/edit/:videoId">
            <VideoForm />
          </Route>
        </Switch>
      </VideosContext.Provider>
    </>
  );
};

export default App;
