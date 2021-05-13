import React, { useEffect, useState } from 'react';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';

import './style.scss';
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

const SpotlightSection = (props: Props) => {
  const elementId = newId();

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (
      props.section?.background === 'image' &&
      props.section?.block?.data?.raw?.urls?.regular &&
      el
    ) {
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
      className={`spotlight-section ${
        props.section.parallax ? 'spotlight-section--parallax' : ''
      }`}
      id={elementId}
    >
      <div
        className={`spotlight-section__container 
        spotlight-section__container--overlay-${
          props.section.background === 'image' ? props.section.overlay : 'none'
        } 
        spotlight-section__container--background-${props.section.background}
        spotlight-section__container--align-${props.section.textAlign}`}
      >
        <div
          className={`spotlight-section__content           
          spotlight-section__content--align-${props.section.textAlign}`}
        >
          <h2
            className={`spotlight-section__content__title 
            spotlight-section__content__title--size-${props.section.fontSize}`}
          >
            {props.section.title}
          </h2>
          <div
            className={`spotlight-section__content__subtitle 
          spotlight-section__content__subtitle--size-${props.section.fontSize}`}
          >
            {props.section.subtitle}
          </div>
        </div>
        <div
          className={`spotlight-section__action spotlight-section__action--align-${props.section.textAlign}`}
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

export default SpotlightSection;
