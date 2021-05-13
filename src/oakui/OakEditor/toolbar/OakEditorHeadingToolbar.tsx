import React, { useState } from 'react';
import './OakEditorHeadingToolbar.scss';
import OakEditorToolbarButton from './OakEditorToolbarButton';

interface Props {
  headingLevelOne?: any;
  headingLevelTwo?: any;
  headingLevelThree?: any;
  headingLevelFour?: any;
  handleClose?: any;
}
const OakEditorHeadingToolbar = (props: Props) => {
  return (
    <div className="oak-editor-heading-toolbar">
      {props.headingLevelOne && (
        <OakEditorToolbarButton
          position="left"
          handleClick={props.headingLevelOne}
        >
          H1
        </OakEditorToolbarButton>
      )}
      {props.headingLevelTwo && (
        <OakEditorToolbarButton
          position="left"
          handleClick={props.headingLevelTwo}
        >
          H2
        </OakEditorToolbarButton>
      )}
      {props.headingLevelThree && (
        <OakEditorToolbarButton
          position="left"
          handleClick={props.headingLevelThree}
        >
          H3
        </OakEditorToolbarButton>
      )}
      {props.headingLevelFour && (
        <OakEditorToolbarButton
          position="left"
          handleClick={props.headingLevelFour}
        >
          H4
        </OakEditorToolbarButton>
      )}
    </div>
  );
};

export default OakEditorHeadingToolbar;
