import React, { useState } from 'react';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import './HeroSection.scss';
import OakInput from '../../../../oakui/wc/OakInput';
import OakEditorBlock from '../../../../oakui/OakEditor/OakEditorBlock';
import { newId } from '../../../../events/MessageService';
import OakEditorBlockType from '../../../../oakui/OakEditor/types/OakEditorBlockType';
import OakBlock from '../../../../oakui/OakEditor/OakBlock';
import OakSelect from '../../../../oakui/wc/OakSelect';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';
import OakButton from '../../../../oakui/wc/OakButton';
import OakRadio from '../../../../oakui/wc/OakRadio';
import ActionSection from './ActionSection';

interface Props {
  section: any;
  handleChange: any;
}

const HeroSection = (props: Props) => {
  const handleBannerChange = (value: any) => {
    _handleChange('block', { ...props.section.block, data: value });
  };

  const setBannerSource = (value: any) => {
    _handleChange('block', { ...props.section.block, type: value });
  };

  const handleMetaChange = (detail: any) => {
    _handleChange(detail.name, detail.value);
  };

  const handleActionChange = (value: any) => {
    _handleChange('action', value);
  };

  const _handleChange = (field: string, value: any) => {
    const _section = { ...props.section, [field]: value };
    props.handleChange(_section);
  };

  const resetBanner = () => {
    _handleChange('banner', {
      id: newId(),
      type: null,
      supportedTypes: [OakEditorBlockType.IMAGE, OakEditorBlockType.UNSPLASH],
      label: 'BANNER',
      data: {
        position: 'center',
        raw: null,
      },
    });
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className="hero-builder">
      <div className="hero-builder__banner">
        <OakBlock
          value={props.section.block}
          handleChange={handleBannerChange}
          reset={resetBanner}
          setBlockType={setBannerSource}
        />
        <div
          className={sectionCompose({
            baseClass: '',
            fillColor: 'container',
            paddingHorizontal: 2,
            paddingVertical: 2,
          })}
        >
          <OakInput
            name="title"
            value={props.section.title}
            label="Title"
            handleInput={handleMetaChange}
            shape="underline"
            gutterBottom
          />
          <OakInput
            name="subtitle"
            value={props.section.subtitle}
            label="Subtitle"
            handleInput={handleMetaChange}
            type="textarea"
            shape="underline"
            gutterBottom
          />
          <OakSelect
            name="overlay"
            value={props.section.overlay}
            label="Intensity of overlay on banner image"
            handleInput={handleMetaChange}
            shape="underline"
            optionsAsKeyValue={[
              {
                id: 'none',
                value: 'None',
              },
              {
                id: 'ultralow',
                value: 'Ultra Low',
              },
              {
                id: 'low',
                value: 'Low',
              },
              {
                id: 'moderate',
                value: 'Moderate',
              },
              {
                id: 'heavy',
                value: 'Heavy',
              },
              {
                id: 'intense',
                value: 'Intense',
              },
            ]}
            gutterBottom
          />
          <OakCheckbox
            name="parallax"
            value={props.section.parallax}
            gutterBottom
            handleChange={handleMetaChange}
          >
            Add parallax effect
          </OakCheckbox>
          <OakSelect
            name="textAlign"
            value={props.section.textAlign}
            label="Text position"
            handleInput={handleMetaChange}
            shape="underline"
            optionsAsKeyValue={[
              { id: 'left', value: 'Left' },
              { id: 'middle', value: 'Middle' },
              { id: 'bottom-left', value: 'Bottom left' },
              { id: 'bottom-middle', value: 'Bottom middle' },
            ]}
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
          <ActionSection
            action={props.section.action}
            handleChange={handleActionChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
