import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import './CommonMetaDetailsSection.scss';
import OakRadio from '../../../../oakui/wc/OakRadio';

interface Props {
  value: any;
  handleChange: any;
  isActive: boolean;
  deactivate: any;
}
const CommonMetaDetailsSection = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  const handleChange = (detail: any) => {
    const _value = { ...props.value, [detail.name]: detail.value };
    props.handleChange(_value);
  };

  return (
    <>
      <OakRadioGroup
        name="height"
        radioGroupName={`height-${groupId}`}
        value={props.value.height}
        label="Section height / Vertical padding"
        handleChange={handleChange}
        gutterBottom
      >
        <OakRadio name="auto" radioGroupName={`height-${groupId}`}>
          Auto
        </OakRadio>
        <OakRadio name="small" radioGroupName={`height-${groupId}`}>
          Small
        </OakRadio>
        <OakRadio name="medium" radioGroupName={`height-${groupId}`}>
          Medium
        </OakRadio>
        <OakRadio name="large" radioGroupName={`height-${groupId}`}>
          Large
        </OakRadio>
        <OakRadio name="full" radioGroupName={`height-${groupId}`}>
          Full page
        </OakRadio>
      </OakRadioGroup>{' '}
    </>
  );
};

export default CommonMetaDetailsSection;
