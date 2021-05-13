import React, { useEffect, useState } from 'react';
import './OakEditorToolbarButton.scss';

interface Props {
  children: any;
  handleClick: any;
  position?: 'left' | 'right';
}
const OakEditorToolbarButton = (props: Props) => {
  return (
    <button
      className={`oak-editor-toolbar-button oak-editor-toolbar-button--${
        props.position || 'right'
      }`}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default OakEditorToolbarButton;
