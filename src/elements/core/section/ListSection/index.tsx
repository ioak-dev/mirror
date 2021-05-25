import React, { useEffect, useState } from 'react';
import Sectionlabel from '../../common/SectionLabel';
import ListEditor from '../../editor/ListEditor';
import NavigationActionType from '../NavigationActionType';
import NavigationToolset from '../NavigationToolset';
import './style.scss';

interface Props {
  label?: string;
  value: string;
  handleChange: any;
  handleNavigation?: any;
  placeholder?: string;
  navigationActions: NavigationActionType[];
}
const ListSection = (props: Props) => {
  const handleChange = (value: string) => {
    props.handleChange(value);
  };
  const handleNavigation = (value: NavigationActionType) => {
    props.handleNavigation(value);
  };

  return (
    <div className="elements-editor-section">
      <div className="elements-editor-section__toolbar">
        <div className="elements-editor-section__toolbar__left">
          <Sectionlabel label={props.label || 'LIST'} />
        </div>
        <div className="elements-editor-section__toolbar__right">
          <NavigationToolset
            actions={props.navigationActions}
            handleAction={handleNavigation}
          />
        </div>
      </div>
      <div className="elements-editor-section__editor">
        <ListEditor
          value={props.value}
          placeholder={props.placeholder}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ListSection;
