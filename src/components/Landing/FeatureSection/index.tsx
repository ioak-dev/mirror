import React, { useEffect, useState } from 'react';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';

import './SingleColumnLayout.scss';
import './ThreeColumnLayout.scss';
import './FourColumnLayout.scss';
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

const FeatureSection = (props: Props) => {
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
      className={`feature-section feature-section--layout-${props.section.layout}`}
    >
      {props.section.heading && (
        <h2
          className={`feature-section__title feature-section__title--size-${props.section.fontSize}`}
        >
          {props.section.heading}
        </h2>
      )}
      <div className="feature-section__list">
        {props.section.feature.map((feature: any) => (
          <div
            className={`feature-section__list__item__root ${
              props.section.zigzag
                ? 'feature-section__list__item__root--zigzag'
                : ''
            }`}
          >
            <div className="feature-section__list__item">
              <div className="feature-section__list__item__image">
                <img
                  className={`feature-section__list__item__image__img ${
                    props.section.rounded
                      ? 'feature-section__list__item__image__img--rounded'
                      : ''
                  }`}
                  src={feature.block.data.raw.urls.regular}
                  alt={feature.block.data.raw.alt_description}
                />
              </div>
              <div className="feature-section__list__item__content">
                <div
                  className={`feature-section__list__item__title feature-section__list__item__title--align-${props.section.textAlign}`}
                >
                  {feature.title}
                </div>
                <div
                  className={`feature-section__list__item__subtitle feature-section__list__item__subtitle--align-${props.section.textAlign}`}
                >
                  {feature.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
