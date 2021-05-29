import React, { useEffect, useState } from 'react';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../../builder/ContentBuilder';
import ContentType from '../../builder/ContentBuilder/ContentType';
import BackgroundView from '../../common/BackgroundView';
import {
  getContentClass,
  getSplitSectionClass,
  getSplitSectionContentClass,
} from '../../SitebuilderService';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const SplitSectionEditor = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRightEditOpen, setIsRightEditOpen] = useState(false);

  const handleContentLeftChange = (content: any) => {
    const _value = { ...props.value };
    _value.left.content = content;
    props.handleChange(_value);
  };

  const handleContentRightChange = (content: any) => {
    const _value = { ...props.value };
    _value.right.content = content;
    props.handleChange(_value);
  };

  const handleChange = (value: any) => {
    props.handleChange(value);
  };

  const handleRightMetaChange = (value: any) => {
    const _value = { ...props.value };
    _value.right = value;
    _value.left = { ..._value.left, height: value.height };
    props.handleChange(_value);
  };

  const handleChangeLeftBackground = (value: any) => {
    const _value = { ...props.value };
    _value.left.background = value;
    props.handleChange(_value);
  };

  const handleChangeRightBackground = (value: any) => {
    const _value = { ...props.value };
    _value.right.background = value;
    props.handleChange(_value);
  };

  const handleResizeUp = () => {
    const _value = { ...props.value };
    _value.proportion -= 1;
    props.handleChange(_value);
  };

  const handleResizeDown = () => {
    const _value = { ...props.value };
    _value.proportion += 1;
    props.handleChange(_value);
  };

  return (
    <>
      <MetaDetails
        isActive={isEditOpen}
        handleChange={handleChange}
        value={props.value}
        deactivate={() => setIsEditOpen(false)}
      />

      <div className={getSplitSectionClass(props.value.proportion)}>
        <div>
          <BackgroundView
            value={props.value.left.background}
            handleChange={handleChangeLeftBackground}
            handleResizeDown={
              props.value.proportion < 3 ? handleResizeDown : null
            }
            split
          >
            <div
              className={`${getSplitSectionContentClass(
                props.value.proportion,
                'left'
              )} ${getContentClass(
                props.value.left.height,
                props.value.left.position
              )}`}
            >
              <div className="elements-site__content__textblock">
                <ContentBuilder
                  position={props.value.left.position}
                  padding={props.value.left.padding}
                  supportedTypes={[ContentType.TEXT, ContentType.ACTION]}
                  value={props.value.left.content}
                  handleChange={handleContentLeftChange}
                />
              </div>
            </div>
          </BackgroundView>
        </div>
        <div>
          <BackgroundView
            value={props.value.right.background}
            handleChange={handleChangeRightBackground}
            handleEditRequest={() => setIsEditOpen(true)}
            handleResizeUp={props.value.proportion > -3 ? handleResizeUp : null}
            resizeControlPosition="left"
            split
          >
            <div
              className={`${getSplitSectionContentClass(
                props.value.proportion,
                'right'
              )} ${getContentClass(
                props.value.right.height,
                props.value.right.position
              )}`}
            >
              <div className="elements-site__content__textblock">
                <ContentBuilder
                  position={props.value.right.position}
                  padding={props.value.right.padding}
                  supportedTypes={[ContentType.TEXT, ContentType.ACTION]}
                  value={props.value.right.content}
                  handleChange={handleContentRightChange}
                />
              </div>
            </div>
          </BackgroundView>
        </div>
      </div>
    </>
  );
};

export default SplitSectionEditor;
