import {
  faChevronLeft,
  faChevronRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { newId } from '../../../../elements/utils/BasicUtil';
import OakForm from '../../../../oakui/wc/OakForm';
import { searchUnsplash } from '../../../../elements/core/section/UnsplashSection/service';
import OakButton from '../../../../oakui/wc/OakButton';
import OakClickArea from '../../../../oakui/wc/OakClickArea';
import OakInput from '../../../../oakui/wc/OakInput';
import OakPaginate from '../../../../oakui/wc/OakPaginate';
import './style.scss';

interface Props {
  handleChange: any;
}
const UnsplashPicker = (props: Props) => {
  const [state, setState] = useState({
    searchText: '',
    pageNo: 1,
    rowsPerPage: 20,
    totalPages: 0,
    total: 0,
  });
  const [results, setResults] = useState<any>([]);

  const handlePaginateChange = (detail: any) => {
    searchImages(detail.pageNo, detail.rowsPerPage, detail.searchText);
  };

  const handleSearchTextChange = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const previousPage = () => {
    if (state.pageNo > 1) {
      searchImages(state.pageNo - 1, state.rowsPerPage, state.searchText);
    }
  };

  const nextPage = () => {
    if (state.pageNo < state.totalPages) {
      searchImages(state.pageNo + 1, state.rowsPerPage, state.searchText);
    }
  };

  const search = () => {
    searchImages(state.pageNo, state.rowsPerPage, state.searchText);
  };

  const searchImages = async (
    pageNo: number,
    rowsPerPage: number,
    searchText: string
  ) => {
    const result = await searchUnsplash(searchText, pageNo, rowsPerPage);
    setState({
      ...state,
      rowsPerPage,
      searchText,
      pageNo: result.currentPage,
      totalPages: result.totalPages,
      total: result.total,
    });
    setResults(result.results);
  };

  const handleImageChange = (imageData: any) => {
    const _newData = {
      urls: imageData.urls,
      user: imageData.user,
      alt_description: imageData.alt_description,
    };
    props.handleChange(_newData);
  };

  const formId = newId();

  return (
    <div className="unsplash-picker">
      <div className="unsplash-picker__input__container">
        <div className="unsplash-picker__input__container__search">
          <div className="unsplash-picker__input__container__search__left">
            <OakForm formGroupName={formId} handleSubmit={search}>
              <OakInput
                name="searchText"
                value={state.searchText}
                shape="sharp"
                handleInput={handleSearchTextChange}
                formGroupName={formId}
                placeholder="Search term"
              />
            </OakForm>
            <OakClickArea handleClick={search}>
              <FontAwesomeIcon icon={faSearch} />
            </OakClickArea>
          </div>
          <div className="unsplash-picker__input__container__search__right">
            <OakClickArea handleClick={previousPage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </OakClickArea>
            <div>
              Page {state.pageNo} of {state.totalPages}
            </div>
            <OakClickArea handleClick={nextPage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </OakClickArea>
          </div>
        </div>
        <div className="unsplash-picker__input__container__results">
          {results.map((item: any) => (
            <OakClickArea
              key={item.id}
              handleClick={() => handleImageChange(item)}
            >
              <img
                className="unsplash-picker__input__container__results__img"
                src={item.urls.thumb}
                alt={item.alt_description}
              />
            </OakClickArea>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnsplashPicker;
