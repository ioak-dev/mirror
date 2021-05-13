import React, { useEffect, useState } from 'react';
import './OakEditorUnsplash.scss';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';
import OakImageUpload from '../wc/OakImageUpload';
import OakInput from '../wc/OakInput';
import OakClickArea from '../wc/OakClickArea';
import OakButton from '../wc/OakButton';
import { searchUnsplash } from './service';
import OakPaginate from '../wc/OakPaginate';
import OakEditorRichText from './OakEditorRichText';
import OakRichTextControlType from './types/OakRichTextControlType';

interface Props {
  groupId: string;
  block: any;
  handleChange: any;
  setBlockType: any;
  moveDown?: any;
  moveUp?: any;
  remove?: any;
  add?: any;
  fixed?: boolean;
  outline?: boolean;
}
const OakEditorUnsplash = (props: Props) => {
  const [chooseImage, setChooseImage] = useState(false);
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState({
    searchText: '',
    pageNo: 1,
    rowsPerPage: 20,
    totalPages: 0,
    total: 0,
  });
  const [results, setResults] = useState<any>([]);

  const handleCaptionChange = (detail: any) => {
    const _newData = { ...props.block.data, caption: detail.value };
    props.handleChange(_newData);
  };

  const handleTextChange = (text: any) => {
    const _newData = { ...props.block.data, text };
    props.handleChange(_newData);
  };

  const handlePaginateChange = (detail: any) => {
    searchImages(detail.pageNo, detail.rowsPerPage, detail.searchText);
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
    const _newData = { ...props.block.data, raw: imageData };
    setChooseImage(false);
    props.handleChange(_newData);
  };

  useEffect(() => {
    OakEditorFocusedEvent.asObservable().subscribe((item) => {
      if (item.groupId === props.groupId) {
        setEditing(item.id === props.block.id);
      }
    });
  }, []);

  return (
    <div className="oak-editor-unsplash">
      <div
        className={`oak-editor-unsplash__input ${
          editing ? 'oak-editor-unsplash__input--editing' : ''
        }`}
      >
        {!chooseImage && props.block.data?.raw?.urls?.regular && (
          <div
            className={`oak-editor-unsplash__output__container oak-editor-unsplash__output__container--${
              props.block.data.position
            } ${
              props.block.data.position !== 'center'
                ? `oak-editor-two-column oak-editor-two-column--${props.block.data.position}`
                : ''
            }`}
          >
            {props.block.data.position === 'right' && (
              <div className="oak-editor-unsplash__output__container__text">
                <OakEditorRichText
                  controls={[
                    OakRichTextControlType.BOLD,
                    OakRichTextControlType.ITALIC,
                    OakRichTextControlType.UNDERLINE,
                    OakRichTextControlType.STRIKE,
                    OakRichTextControlType.FONT_SIZE,
                  ]}
                  blockStyle
                  value={props.block.data.text}
                  handleChange={handleTextChange}
                />
              </div>
            )}
            <div className="oak-editor-unsplash__output__container__image">
              <img
                className="oak-editor-unsplash__output__container__image__img"
                src={props.block.data.raw.urls.regular}
                alt={props.block.data.raw.alt_description}
              />
              <OakInput
                name="caption"
                value={props.block.data.caption || ''}
                shape="underline"
                label="Caption"
                placeholder="Caption"
                handleInput={handleCaptionChange}
                gutterBottom
              />
              <OakButton
                shape="sharp"
                theme="default"
                variant="appear"
                handleClick={() => setChooseImage(true)}
              >
                Change Image
              </OakButton>
            </div>
            {props.block.data.position === 'left' && (
              <div className="oak-editor-unsplash__output__container__text">
                <OakEditorRichText
                  controls={[
                    OakRichTextControlType.BOLD,
                    OakRichTextControlType.ITALIC,
                    OakRichTextControlType.UNDERLINE,
                    OakRichTextControlType.STRIKE,
                    OakRichTextControlType.FONT_SIZE,
                  ]}
                  blockStyle
                  value={props.block.data.text}
                  handleChange={handleTextChange}
                />
              </div>
            )}
          </div>
        )}
        {(chooseImage || !props.block.data?.raw?.urls?.thumb) && (
          <div className="oak-editor-unsplash__input__container">
            <div className="oak-editor-unsplash__input__container__search">
              <OakPaginate
                variant="list"
                formElementShape="underline"
                formElementSize="xsmall"
                paginatePref={{
                  pageNo: state.pageNo,
                  rowsPerPage: state.rowsPerPage,
                  searchText: state.searchText,
                }}
                label=""
                totalRows={state.total}
                handleChange={handlePaginateChange}
              />
            </div>
            <div className="oak-editor-unsplash__input__container__results">
              {results.map((item: any) => (
                <OakClickArea
                  key={item.id}
                  handleClick={() => handleImageChange(item)}
                >
                  <img
                    className="oak-editor-unsplash__input__container__results__img"
                    src={item.urls.thumb}
                    alt={item.alt_description}
                  />
                </OakClickArea>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OakEditorUnsplash;
