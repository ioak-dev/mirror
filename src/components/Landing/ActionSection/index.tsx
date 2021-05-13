import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';

import './style.scss';
import OakButton from '../../../oakui/wc/OakButton';
import { newId } from '../../../events/MessageService';
import HideNavBarCommand from '../../../events/HideNavBarCommand';

interface Props {
  action: any;
  cookies: any;
  assetId: string;
}

const ActionSection = (props: Props) => {
  const history = useHistory();
  const elementId = newId();

  const handleClick = (item: any) => {
    switch (item.action) {
      case 'articleList':
        goToArticles();
        break;
      case 'newArticle':
        newArticle();
        break;
      case 'custom':
        if (item.tab) {
          window.open(item.href);
        } else {
          window.location.href = item.href;
        }
        break;

      default:
        break;
    }
  };

  const goToArticles = () => {
    history.push(`/${props.assetId}/article`);
  };

  const newArticle = () => {
    history.push(`/${props.assetId}/article/create`);
  };

  return (
    <div className="action-section">
      {props.action.map((item: any) => (
        <div className="action-section__item" key={item.id}>
          <OakButton
            theme={item.color}
            shape="sharp"
            size="medium"
            handleClick={() => handleClick(item)}
          >
            {item.label}
          </OakButton>
        </div>
      ))}
    </div>
  );
};

export default ActionSection;
