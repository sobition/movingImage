import React, { useContext, useState, useEffect } from 'react';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import { ProcessedVideo } from '../../common/interfaces';
import { useHistory, useParams } from 'react-router-dom/';
import VideosContext from '../videos-context';
import { CustomisedTable, CustomTableCell, SearchForm, SearchedTag } from './video-table.style';

export const VideosTable: React.FC = () => {
  const videoContext = useContext(VideosContext);
  const [key, setKey] = useState(1);
  const [displayingResult, setDisplayingResult] = useState<ProcessedVideo[]>([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchIsSet, setSearchIsSet] = useState<Boolean>(false);
  let history = useHistory();
  const deleteVideo = (index: number) => {
    let approval = window.confirm('This action will permenantely delete the selected video');
    let videos = videoContext.videos;
    if (approval) {
      videos.splice(index, 1);
      setKey(key === 1 ? 2 : 1);
    }
  };

  const resetSearch = () => {
    setSearchPhrase('');
    setSearchIsSet(false);
    setDisplayingResult(videoContext.videos);
  };

  const searchVideo = (phrase: string) => {
    let result: ProcessedVideo[] = [];
    videoContext.videos.map((video: ProcessedVideo) => {
      if (video.name.includes(phrase)) {
        result.push(video);
      }
    });
    if (result.length > 0) {
      setDisplayingResult(result);
      setSearchIsSet(true);
    } else {
      alert('No result is found. Please try something else');
    }
  };

  useEffect(() => {
    if (videoContext.videos.length > 0) {
      setDisplayingResult(videoContext.videos);
    }
  }, [videoContext.videos]);

  return (
    <>
      <SearchForm onSubmit={() => searchVideo(searchPhrase)}>
        <input value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} placeholder={"search video's name"} />
        <Button onClick={() => searchVideo(searchPhrase)}>Search</Button>
        {searchIsSet ? (
          <SearchedTag>
            <div>{searchPhrase}</div>
            <svg onClick={() => resetSearch()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512.001">
              <path d="M284.284 256L506.142 34.142c7.811-7.81 7.811-20.474 0-28.284-7.811-7.811-20.474-7.811-28.284 0L256 227.716 34.142 5.858c-7.811-7.811-20.474-7.811-28.284 0-7.811 7.81-7.811 20.474 0 28.284L227.716 256 5.858 477.858c-7.811 7.811-7.811 20.474 0 28.284 7.81 7.81 20.473 7.811 28.284 0L256 284.284l221.858 221.858c7.81 7.81 20.473 7.811 28.284 0s7.811-20.474 0-28.284L284.284 256z" />
            </svg>
          </SearchedTag>
        ) : (
          ''
        )}
      </SearchForm>

      <TableContainer component={Paper} style={{ marginTop: '40px' }}>
        <CustomisedTable>
          <TableHead>
            <TableRow>
              <TableCell>Video Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Highest quality format</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody key={key}>
            {displayingResult.length > 0
              ? displayingResult.map((video: ProcessedVideo, index: number) => (
                  <TableRow key={video.id}>
                    <TableCell component="th" scope="row">
                      {video.name}
                    </TableCell>
                    <TableCell>{video.author}</TableCell>
                    <TableCell>{video.categories.join(', ')}</TableCell>
                    <TableCell>{`${Object.keys(video.format)[0]}${' '}${video.format[Object.keys(video.format)[0]].res}`}</TableCell>
                    <TableCell>{video.release}</TableCell>
                    <CustomTableCell>
                      <Button id="EditBtn" onClick={() => history.push(`/edit/${video.id}`)}>
                        Edit
                      </Button>
                      <Button id="DeleteBtn" onClick={() => deleteVideo(index)}>
                        Delete
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </CustomisedTable>
      </TableContainer>
    </>
  );
};
