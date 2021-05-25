import React, { useEffect, useState } from 'react';
import Sectionlabel from '../../common/SectionLabel';
import ParagraphEditor from '../../editor/ParagraphEditor';
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
}
const ParagraphSection = (props: Props) => {
  const handleChange = (value: any) => {
    props.handleChange(value);
  };
  const handleNavigation = (value: NavigationActionType) => {
    props.handleNavigation(value);
  };

  return (
    <div className="elements-editor-section">
      <div className="elements-editor-section__toolbar">
        <div className="elements-editor-section__toolbar__left">
          <Sectionlabel label={props.label || 'PARAGRAPH'} />
        </div>
        <div className="elements-editor-section__toolbar__right">
          <NavigationToolset
            actions={props.navigationActions}
            handleAction={handleNavigation}
          />
        </div>
      </div>
      <div className="elements-editor-section__editor">
        <ParagraphEditor
          value={props.value}
          placeholder={props.placeholder}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ParagraphSection;
