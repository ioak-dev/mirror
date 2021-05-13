import React, { useEffect, useState } from 'react';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';

import './FullImageContentCentered.scss';
import OakButton from '../../../oakui/wc/OakButton';
import { newId } from '../../../events/MessageService';
import HideNavBarCommand from '../../../events/HideNavBarCommand';
import ActionSection from '../ActionSection';

interface Props {
  history: any;
  section: any;
  cookies: any;
  assetId: string;
}

const FullImageContentCentered = (props: Props) => {
  const elementId = newId();
  useEffect(() => {
    HideNavBarCommand.next(true);
  }, []);

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (props.section?.block?.data?.raw?.urls?.regular && el) {
      el.style.backgroundImage = `url(${props.section.block.data.raw.urls.regular})`;
    }
  }, [props.section]);

  const goToArticles = () => {
    props.history.push(`/${props.assetId}/article`);
  };

  const newArticle = () => {
    props.history.push(`/${props.assetId}/article/create`);
  };

  return (
    <div
      className={`full-image-content-centered ${
        props.section.parallax ? 'full-image-content-centered--parallax' : ''
      }`}
      id={elementId}
    >
      {/* {props.hero.banner.data.raw && (
        <img
          className="full-image-content-centered__img"
          src={props.hero.banner.data.raw.urls.regular}
          alt={props.hero.banner.data.raw.alt_description}
        />
      )} */}
      <div
        className={`full-image-content-centered__container 
        full-image-content-centered__container--overlay-${props.section.overlay} 
        full-image-content-centered__container--align-${props.section.textAlign}`}
      >
        <div
          className={`full-image-content-centered__content           
          full-image-content-centered__content--align-${props.section.textAlign}`}
        >
          <h1
            className={`full-image-content-centered__content__title 
            full-image-content-centered__content__title--size-${props.section.fontSize}`}
          >
            {props.section.title}
          </h1>
          <div
            className={`full-image-content-centered__content__subtitle 
          full-image-content-centered__content__subtitle--size-${props.section.fontSize}`}
          >
            {props.section.subtitle}
          </div>
        </div>
        <div
          className={`full-image-content-centered__action full-image-content-centered__action--align-${props.section.textAlign}`}
        >
          <ActionSection
            action={props.section.action}
            assetId={props.assetId}
            cookies={props.cookies}
          />
        </div>
      </div>
    </div>
  );
};

export default FullImageContentCentered;
