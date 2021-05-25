import React, { useState } from 'react';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import './FeatureSection.scss';
import OakInput from '../../../../oakui/wc/OakInput';
import { newId } from '../../../../events/MessageService';
import OakSelect from '../../../../oakui/wc/OakSelect';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';
import OakButton from '../../../../oakui/wc/OakButton';
import OakRadio from '../../../../oakui/wc/OakRadio';
import ActionSection from './ActionSection';
import FeatureItemSection from './FeatureItemSection';

interface Props {
  section: any;
  handleChange: any;
}

const FeatureSection = (props: Props) => {
  const handleMetaChange = (detail: any) => {
    _handleChange(detail.name, detail.value);
  };

  const handleFeatureItemChange = (value: any) => {
    _handleChange('feature', value);
  };

  const _handleChange = (field: string, value: any) => {
    const _section = { ...props.section, [field]: value };
    props.handleChange(_section);
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className="feature-section-builder">
      <div className="feature-section-builder__banner">
        <div
          className={sectionCompose({
            baseClass: '',
            fillColor: 'container',
            paddingHorizontal: 2,
            paddingVertical: 2,
          })}
        >
          <OakInput
            name="heading"
            value={props.section.heading}
            label="Heading"
            handleInput={handleMetaChange}
            shape="underline"
            gutterBottom
          />
          <OakRadioGroup
            radioGroupName={`font-size-${groupId}`}
            name="fontSize"
            value={props.section.fontSize}
            label="Font size"
            handleChange={handleMetaChange}
            gutterBottom
          >
            <OakRadio radioGroupName={`font-size-${groupId}`} name="small">
              Small
            </OakRadio>
            <OakRadio radioGroupName={`font-size-${groupId}`} name="regular">
              Regular
            </OakRadio>
            <OakRadio radioGroupName={`font-size-${groupId}`} name="large">
              Large
            </OakRadio>
          </OakRadioGroup>
          <OakCheckbox
            name="rounded"
            value={props.section.rounded}
            handleChange={handleMetaChange}
            gutterBottom
          >
            Rounded corners for image
          </OakCheckbox>
          <OakSelect
            name="layout"
            value={props.section.layout}
            label="Layout"
            handleInput={handleMetaChange}
            shape="underline"
            optionsAsKeyValue={[
              { id: 'single', value: 'Full page' },
              { id: 'three', value: 'Three column' },
              { id: 'four', value: 'Four column' },
            ]}
            gutterBottom
          />
          {props.section.layout === 'single' && (
            <OakCheckbox
              name="zigzag"
              value={props.section.zigzag}
              handleChange={handleMetaChange}
              gutterBottom
            >
              Alternate image and text
            </OakCheckbox>
          )}
          <OakRadioGroup
            radioGroupName={`align-${groupId}`}
            name="textAlign"
            value={props.section.textAlign}
            label="Text position"
            handleChange={handleMetaChange}
            gutterBottom
          >
            <OakRadio radioGroupName={`align-${groupId}`} name="left">
              Left
            </OakRadio>
            <OakRadio radioGroupName={`align-${groupId}`} name="center">
              Center
            </OakRadio>
          </OakRadioGroup>

          <OakRadioGroup
            radioGroupName={`variant-${groupId}`}
            name="variant"
            value={props.section.variant}
            label="Variant"
            handleChange={handleMetaChange}
            gutterBottom
          >
            <OakRadio radioGroupName={`variant-${groupId}`} name="image">
              Image
            </OakRadio>
            <OakRadio radioGroupName={`variant-${groupId}`} name="icon">
              Graphic (SVG graphic or icon) - Coming soon
            </OakRadio>
          </OakRadioGroup>
          <FeatureItemSection
            feature={props.section.feature}
            handleChange={handleFeatureItemChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
