import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
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
            name="layout"
            radioGroupName={`layout-${groupId}`}
            value={props.value.layout}
            label="Choose layout (as it appears on large screen)"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="single-column" radioGroupName={`layout-${groupId}`}>
              Single column
            </OakRadio>
            <OakRadio name="two-column" radioGroupName={`layout-${groupId}`}>
              Two column
            </OakRadio>
            <OakRadio name="three-column" radioGroupName={`layout-${groupId}`}>
              Three column
            </OakRadio>
            <OakRadio name="four-column" radioGroupName={`layout-${groupId}`}>
              Four column
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="align"
            radioGroupName={`align-${groupId}`}
            value={props.value.position}
            label="Text block alignment"
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
            <OakRadio name="small" radioGroupName={`padding-${groupId}`}>
              Small
            </OakRadio>
            <OakRadio name="medium" radioGroupName={`padding-${groupId}`}>
              Medium
            </OakRadio>
            <OakRadio name="large" radioGroupName={`padding-${groupId}`}>
              Large
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="margin"
            radioGroupName={`margin-${groupId}`}
            value={props.value.margin}
            label="Margin between grids"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="none" radioGroupName={`margin-${groupId}`}>
              None
            </OakRadio>
            <OakRadio name="small" radioGroupName={`margin-${groupId}`}>
              Small
            </OakRadio>
            <OakRadio name="medium" radioGroupName={`margin-${groupId}`}>
              Medium
            </OakRadio>
            <OakRadio name="large" radioGroupName={`margin-${groupId}`}>
              Large
            </OakRadio>
          </OakRadioGroup>
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
