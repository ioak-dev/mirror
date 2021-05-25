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
const MetaDetails = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  useEffect(() => {
    document.getElementById(elementId)?.scrollIntoView(true);
  }, []);

  const handleChange = (detail: any) => {
    const _value = { ...props.value, [detail.name]: detail.value };
    props.handleChange(_value);
  };

  return (
    <OakModal
      isOpen={props.isActive}
      handleClose={props.deactivate}
      heading="Section settings"
    >
      <div slot="body">
        <div className="site-builder-meta" id={elementId}>
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
            name="bleed"
            radioGroupName={`bleed-${groupId}`}
            value={props.value.bleed}
            label="Bleed between content and boundary"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="none" radioGroupName={`bleed-${groupId}`}>
              None
            </OakRadio>
            <OakRadio name="small" radioGroupName={`bleed-${groupId}`}>
              Small
            </OakRadio>
            <OakRadio name="medium" radioGroupName={`bleed-${groupId}`}>
              Medium
            </OakRadio>
            <OakRadio name="large" radioGroupName={`bleed-${groupId}`}>
              Large
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
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
