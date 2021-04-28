import React, { useContext, useState, useEffect, memo } from 'react';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import { ProcessedVideo } from '../../common/interfaces';
import { useHistory } from 'react-router-dom/';
import VideosContext from '../videos-context';
import { CustomisedTable, CustomTableCell } from './video-table.style';
import FilterMenu from '../filtersMenu/filters-menu';
const VideosTable: React.FC = () => {
  const videoContext = useContext(VideosContext);
  const [key, setKey] = useState(1);
  const [displayingResult, setDisplayingResult] = useState<ProcessedVideo[]>([]);

  let history = useHistory();
  const deleteVideo = (index: number) => {
    let approval = window.confirm('This action will permenantely delete the selected video');
    let videos = videoContext.videos;
    if (approval) {
      videos.splice(index, 1);
      setKey(key === 1 ? 2 : 1);
    }
  };

  useEffect(() => {
    if (videoContext.videos.length > 0) {
      setDisplayingResult(videoContext.videos);
    }
  }, [videoContext.videos]);

  return (
    <>
      <FilterMenu updateResult={setDisplayingResult} />
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
          <TableBody id={'videosInfoTable'} key={key}>
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
                      <Button className="EditBtn" onClick={() => history.push(`/edit/${video.id}`)}>
                        Edit
                      </Button>
                      <Button className="DeleteBtn" onClick={() => deleteVideo(index)}>
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
export default memo(VideosTable);
