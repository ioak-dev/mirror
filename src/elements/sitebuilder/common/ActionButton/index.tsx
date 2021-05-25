import React, { useEffect, useState } from 'react';
import { newId } from '../../../../elements/utils/BasicUtil';
import './style.scss';
import {
  getActionButtonClass,
  getActionButtonStyle,
} from '../../SitebuilderService';

interface Props {
  children: any;
  handleClick: any;
  meta: any;
  item: any;
}
const ActionButton = (props: Props) => {
  const elementId = newId();
  useEffect(() => {
    const el = document.getElementById(elementId);
    if (el) {
      const computedStyle = getActionButtonStyle(props.meta, props.item);
      el.style.setProperty(
        '--action-button-background-color',
        computedStyle.backgroundColor
      );
      el.style.setProperty(
        '--action-button-background-color-hover',
        computedStyle.backgroundColorHover
      );
      el.style.setProperty('--action-button-color', computedStyle.color);
      el.style.setProperty(
        '--action-button-color-hover',
        computedStyle.colorHover
      );
    }
  }, [props.meta, props.item]);
  return (
    <button
      id={elementId}
      className={getActionButtonClass(props.meta, props.item)}
      onClick={props.handleClick}
    >
      {props.item.label}
    </button>
  );
};

export default ActionButton;
