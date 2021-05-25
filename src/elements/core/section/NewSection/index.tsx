import React, { useEffect, useState } from 'react';
import './style.scss';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../../oakui/wc/OakRadio';
import { newId } from '../../../utils/BasicUtil';
import BlockType from '../../ContentEditor/BlockType';
import Sectionlabel from '../../common/SectionLabel';
import NavigationToolset from '../NavigationToolset';
import NavigationActionType from '../NavigationActionType';

interface Props {
  label?: string;
  groupId: string;
  block: any;
  handleChange: any;
  supportedTypes: { label: string; value: string }[];
  handleNavigation: any;
  navigationActions: NavigationActionType[];
}
const NewSection = (props: Props) => {
  const handleChange = (detail: any) => {
    props.handleChange(detail.value);
  };
  const handleNavigation = (value: NavigationActionType) => {
    props.handleNavigation(value);
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className="elements-editor-section">
      <div className="elements-editor-section__toolbar">
        <div className="elements-editor-section__toolbar__left">
          <Sectionlabel label={props.label || 'NEW BLOCK'} />
        </div>
        <div className="elements-editor-section__toolbar__right">
          <NavigationToolset
            actions={props.navigationActions}
            handleAction={handleNavigation}
          />
        </div>
      </div>
      <div className="elements-editor-section__editor">
        <div className="new-section">
          <OakRadioGroup
            radioGroupName={groupId}
            name="type"
            value={props.block.type}
            handleChange={handleChange}
          >
            {props.supportedTypes.map((item) => (
              <div key={item.value}>
                <OakRadio radioGroupName={groupId} name={item.value}>
                  {item.label}
                </OakRadio>
              </div>
            ))}
          </OakRadioGroup>
        </div>
      </div>
    </div>
  );
};

export default NewSection;
