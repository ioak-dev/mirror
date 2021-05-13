import React, { useState } from 'react';
import './OakEditorImageToolbar.scss';
import OakEditorToolbarButton from './OakEditorToolbarButton';

interface Props {
  centerImage?: any;
  rightImage?: any;
  leftImage?: any;
}
const OakEditorImageToolbar = (props: Props) => {
  return (
    <div className="oak-editor-image-toolbar">
      {props.leftImage && (
        <OakEditorToolbarButton position="left" handleClick={props.leftImage}>
          Left
        </OakEditorToolbarButton>
      )}
      {props.rightImage && (
        <OakEditorToolbarButton position="left" handleClick={props.rightImage}>
          Right
        </OakEditorToolbarButton>
      )}
      {props.centerImage && (
        <OakEditorToolbarButton position="left" handleClick={props.centerImage}>
          Center
        </OakEditorToolbarButton>
      )}
    </div>
  );
};

export default OakEditorImageToolbar;
