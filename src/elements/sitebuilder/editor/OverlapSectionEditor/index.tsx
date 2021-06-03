import React, { useEffect, useState } from 'react';
import { newId } from '../../../../elements/utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../../builder/ContentBuilder';
import ContentType from '../../builder/ContentBuilder/ContentType';
import BackgroundView from '../../common/BackgroundView';
import {
  getContentClass,
  getContentContainerClass,
  getOverlapSectionClass,
  getTextAlignment,
} from '../../SitebuilderService';
import ContentFrame from '../../common/ContentFrame';
import ContentFrameGroup from '../../common/ContentFrameGroup';
import SingleSectionEditor from '../SingleSectionEditor';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const OverlapSectionEditor = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleContentChange = (content: any) => {
    console.log(content);
    const _value = { ...props.value, content };
    props.handleChange(_value);
  };

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (
      el &&
      props.value?.background?.source === 'UNSPLASH' &&
      props.value?.background?.data?.urls
    ) {
      el.style.backgroundImage = `url("${props.value.background.data.urls.regular}")`;
      el.style.backgroundColor = 'inherit';
    }
    if (el && props.value?.background?.source === 'SOLID-COLOR') {
      el.style.backgroundImage = 'none';
      if (props.value?.background?.data?.color === 'custom') {
        el.style.backgroundColor = props.value?.background?.data?.hex;
      } else if (props.value?.background?.data?.color === 'default') {
        el.style.backgroundColor = 'var(--color-surface)';
      } else {
        el.style.backgroundColor = `var(--color-${props.value?.background?.data?.color})`;
      }
    }
  }, [props.value]);

  const handleMetaChange = (value: any) => {
    console.log(value);
    const _value = { ...props.value, foregroundSection: value };
    props.handleChange(_value);
  };

  const handleChangeBackground = (value: any) => {
    const _value = { ...props.value };
    _value.background = value;
    console.log(_value);
    props.handleChange(_value);
  };

  const handleBackgroundSectionChange = (value: any) => {
    console.log(value);
    const _value = { ...props.value, backgroundSection: value };
    props.handleChange(_value);
  };

  const handleForegroundSectionChange = (value: any) => {
    console.log(value);
    const _value = { ...props.value, foregroundSection: value };
    props.handleChange(_value);
  };

  const elementId = newId();

  return (
    <>
      <MetaDetails
        isActive={isEditOpen}
        handleChange={handleMetaChange}
        value={props.value.foregroundSection}
        deactivate={() => setIsEditOpen(false)}
      />
      <SingleSectionEditor
        value={props.value.backgroundSection}
        handleChange={handleBackgroundSectionChange}
        // handleEditRequest={() => setIsEditOpen(true)}
      >
        <div
          className={getOverlapSectionClass(
            props.value.backgroundSection.height,
            props.value.foregroundSection.width,
            props.value.foregroundSection.offset
          )}
        >
          <SingleSectionEditor
            value={props.value.foregroundSection}
            handleChange={handleForegroundSectionChange}
            handleEditRequest={() => setIsEditOpen(true)}
          />
        </div>
      </SingleSectionEditor>
      {/* <BackgroundView
        value={props.value.background}
        handleChange={handleChangeBackground}
      >
        <div className="overlap-section__container">
          <SingleSectionEditor
            value={props.value.child}
            handleChange={handleBackgroundSectionChange}
            // handleEditRequest={() => setIsEditOpen(true)}
          />
        </div>
        <ContentFrameGroup
          horizontalPosition={props.value.horizontalPosition}
          layout={props.value.layout}
          gap={props.value.gap}
          gridWidth={props.value.gridWidth}
          expandToFill={props.value.expandToFill}
          content={props.value.content}
          handleChange={handleContentChange}
        />
      </BackgroundView> */}
    </>
  );
};

export default OverlapSectionEditor;
