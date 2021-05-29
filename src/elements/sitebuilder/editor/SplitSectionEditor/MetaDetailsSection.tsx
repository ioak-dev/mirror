import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import './MetaDetails.scss';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakInput from '../../../../oakui/wc/OakInput';
import OakModal from '../../../../oakui/wc/OakModal';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';

interface Props {
  value: any;
  handleChange: any;
  isActive: boolean;
  deactivate: any;
}
const MetaDetailsSection = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  const handleChange = (detail: any) => {
    const _value = { ...props.value, [detail.name]: detail.value };
    props.handleChange(_value);
  };

  return (
    <>
      <OakRadioGroup
        name="position"
        radioGroupName={`align-${groupId}`}
        value={props.value.position}
        label="Text block position"
        handleChange={handleChange}
        gutterBottom
      >
        <OakRadio name="left" radioGroupName={`align-${groupId}`}>
          Left
        </OakRadio>
        <OakRadio name="center" radioGroupName={`align-${groupId}`}>
          Center
        </OakRadio>
        <OakRadio name="right" radioGroupName={`align-${groupId}`}>
          Right
        </OakRadio>
        <OakRadio name="bottom-left" radioGroupName={`align-${groupId}`}>
          Bottom left
        </OakRadio>
        <OakRadio name="bottom-center" radioGroupName={`align-${groupId}`}>
          Bottom center
        </OakRadio>
        <OakRadio name="bottom-right" radioGroupName={`align-${groupId}`}>
          Bottom right
        </OakRadio>
        <OakRadio name="top-left" radioGroupName={`align-${groupId}`}>
          Top left
        </OakRadio>
        <OakRadio name="top-center" radioGroupName={`align-${groupId}`}>
          Top center
        </OakRadio>
        <OakRadio name="top-right" radioGroupName={`align-${groupId}`}>
          Top right
        </OakRadio>
      </OakRadioGroup>
      <OakRadioGroup
        name="padding"
        radioGroupName={`padding-${groupId}`}
        value={props.value.padding}
        label="Padding for content"
        handleChange={handleChange}
        gutterBottom
      >
        <OakRadio name="none" radioGroupName={`padding-${groupId}`}>
          None
        </OakRadio>
        <OakRadio name="xsmall" radioGroupName={`padding-${groupId}`}>
          Extra small
        </OakRadio>
        <OakRadio name="small" radioGroupName={`padding-${groupId}`}>
          Small
        </OakRadio>
        <OakRadio name="medium" radioGroupName={`padding-${groupId}`}>
          Medium
        </OakRadio>
        <OakRadio name="large" radioGroupName={`padding-${groupId}`}>
          Large
        </OakRadio>
        <OakRadio name="xlarge" radioGroupName={`padding-${groupId}`}>
          Extra large
        </OakRadio>
      </OakRadioGroup>
      <OakRadioGroup
        name="height"
        radioGroupName={`height-${groupId}`}
        value={props.value.height}
        label="Section height / Vertical padding"
        handleChange={handleChange}
        gutterBottom
      >
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
      </OakRadioGroup>
    </>
  );
};

export default MetaDetailsSection;
