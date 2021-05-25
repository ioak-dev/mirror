import React, { useEffect, useState } from 'react';
import { newId } from '../../../../elements/utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../../builder/ContentBuilder';
import ContentType from '../../builder/ContentBuilder/ContentType';
import BackgroundView from '../../common/BackgroundView';
import { getContentClass, getTextAlignment } from '../../SitebuilderService';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const HeroEditor = (props: Props) => {
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
    props.handleChange(value);
  };

  const handleChangeBackground = (value: any) => {
    const _value = { ...props.value };
    _value.background = value;
    console.log(_value);
    props.handleChange(_value);
  };

  const elementId = newId();

  return (
    <>
      <MetaDetails
        isActive={isEditOpen}
        handleChange={handleMetaChange}
        value={props.value}
        deactivate={() => setIsEditOpen(false)}
      />

      <BackgroundView
        value={props.value.background}
        handleChange={handleChangeBackground}
        handleEditRequest={() => setIsEditOpen(true)}
      >
        <div
          className={getContentClass(props.value.height, props.value.position)}
        >
          <div className="elements-site__content__textblock">
            <ContentBuilder
              position={props.value.position}
              bleed={props.value.bleed}
              supportedTypes={[ContentType.TEXT, ContentType.ACTION]}
              value={props.value.content}
              handleChange={handleContentChange}
            />
          </div>
        </div>
      </BackgroundView>
    </>
  );
};

export default HeroEditor;
