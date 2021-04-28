import React, { useState, useContext, useEffect } from 'react';
import { SearchForm, SearchedTag, FilterRow, SortSelectField } from './filter-menu.style';
import Button from '@material-ui/core/Button';

import { ProcessedVideo } from '../../common/interfaces';
import VideosContext from '../videos-context';

interface FilterMenuProps {
  updateResult: any;
}

const FiltersMenu: React.FC<FilterMenuProps> = (props) => {
  const videoContext = useContext(VideosContext);
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [searchIsSet, setSearchIsSet] = useState<Boolean>(false);
  const [sortParameter, setSortParameter] = useState<string>('');

  const searchVideo = (phrase: string) => {
    let result: ProcessedVideo[] = [];
    if (phrase) {
      videoContext.videos.map((video: ProcessedVideo) => {
        let videoName: string = video.name.toUpperCase();
        if (videoName.includes(phrase.toUpperCase())) {
          result.push(video);
        }
      });
      if (result.length > 0) {
        props.updateResult(result);
        setSearchIsSet(true);
      } else {
        alert('No result is found. Please try something else');
      }
    } else {
      alert('please enter a phrase to search');
    }
  };

  const resetSearch = () => {
    setSearchPhrase('');
    setSearchIsSet(false);
    props.updateResult(videoContext.videos);
  };

  const sortVideosList = (sortParam: string) => {
    let newList = [...videoContext.videos];

    switch (sortParam) {
      case 'quality':
        newList.sort((a, b) => {
          let qualityOfA = Object.keys(a.format)[0];
          let qualityOfB = Object.keys(b.format)[0];

          if (qualityOfA === 'medium' && qualityOfB === 'best') {
            return 1;
          } else if (qualityOfA === 'best' && qualityOfB === 'medium') {
            return -1;
          } else {
            return 0;
          }
        });

        break;

      case 'size':
        newList.sort((a, b) => {
          let qualityOfA = Object.keys(a.format)[0];
          let qualityOfB = Object.keys(b.format)[0];

          if (a.format[qualityOfA].size > b.format[qualityOfB].size) {
            return 1;
          } else if (a.format[qualityOfA].size < b.format[qualityOfB].size) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      default:
        break;
    }
    props.updateResult(newList);
  };

  useEffect(() => {
    sortVideosList(sortParameter);
  }, [sortParameter]);
  return (
    <FilterRow>
      <SearchForm id={'searchForm'} onSubmit={() => searchVideo(searchPhrase)}>
        <input
          id={'searchField'}
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
          placeholder={"search video's name"}
        />
        <Button id="searchBtn" onClick={() => searchVideo(searchPhrase)}>
          Search
        </Button>
        {searchIsSet ? (
          <SearchedTag>
            <div>{searchPhrase}</div>
            <svg id={'resetSearch'} onClick={() => resetSearch()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512.001">
              <path d="M284.284 256L506.142 34.142c7.811-7.81 7.811-20.474 0-28.284-7.811-7.811-20.474-7.811-28.284 0L256 227.716 34.142 5.858c-7.811-7.811-20.474-7.811-28.284 0-7.811 7.81-7.811 20.474 0 28.284L227.716 256 5.858 477.858c-7.811 7.811-7.811 20.474 0 28.284 7.81 7.81 20.473 7.811 28.284 0L256 284.284l221.858 221.858c7.81 7.81 20.473 7.811 28.284 0s7.811-20.474 0-28.284L284.284 256z" />
            </svg>
          </SearchedTag>
        ) : (
          ''
        )}
      </SearchForm>
      <div>
        <SortSelectField value={sortParameter} onChange={(e) => setSortParameter(e.target.value)} name="sort" id="sortSelect">
          <option value="" disabled selected hidden>
            {'sort list'}
          </option>{' '}
          <option value="quality">quality</option>
          <option value="size">size</option>
        </SortSelectField>
      </div>
    </FilterRow>
  );
};

export default FiltersMenu;
