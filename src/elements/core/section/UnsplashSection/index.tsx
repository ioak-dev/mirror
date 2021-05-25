import React, { useEffect, useState } from 'react';
import Sectionlabel from '../../common/SectionLabel';
import ToolButton from '../../common/ToolButton';
import ParagraphEditor from '../../editor/ParagraphEditor';
import UnsplashEditor from '../../editor/UnsplashEditor';
import NavigationActionType from '../NavigationActionType';
import NavigationToolset from '../NavigationToolset';
import '../Section.scss';

interface Props {
  label?: string;
  value: any;
  handleChange: any;
  handleNavigation?: any;
  placeholder?: string;
  navigationActions: NavigationActionType[];
  fixed?: boolean;
}
const UnsplashSection = (props: Props) => {
  const handleChange = (value: string) => {
    props.handleChange(value);
  };
  const handleNavigation = (value: NavigationActionType) => {
    props.handleNavigation(value);
  };

  const handlePositionChange = (position: 'left' | 'right' | 'center') => {
    const _newData = { ...props.value.data, position };
    props.handleChange(_newData);
  };

  return (
    <div className="elements-editor-section">
      <div className="elements-editor-section__toolbar">
        <div className="elements-editor-section__toolbar__left">
          <Sectionlabel label={props.label || 'PARAGRAPH'} />
          {!props.fixed && (
            <ToolButton handleClick={() => handlePositionChange('left')}>
              Left
            </ToolButton>
          )}
          {!props.fixed && (
            <ToolButton handleClick={() => handlePositionChange('right')}>
              Right
            </ToolButton>
          )}
          {!props.fixed && (
            <ToolButton handleClick={() => handlePositionChange('center')}>
              Center
            </ToolButton>
          )}
        </div>
        <div className="elements-editor-section__toolbar__right">
          <NavigationToolset
            actions={props.navigationActions}
            handleAction={handleNavigation}
          />
        </div>
      </div>
      <div className="elements-editor-section__editor">
        <UnsplashEditor
          value={props.value}
          placeholder={props.placeholder}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UnsplashSection;
