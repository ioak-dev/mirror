import React, { useState } from 'react';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import './HeroSection.scss';
import OakInput from '../../../../oakui/wc/OakInput';
import { newId } from '../../../../events/MessageService';
import OakSelect from '../../../../oakui/wc/OakSelect';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';
import OakButton from '../../../../oakui/wc/OakButton';
import OakRadio from '../../../../oakui/wc/OakRadio';
import ActionSection from './ActionSection';
import BlockType from '../../../../elements/core/ContentEditor/BlockType';

interface Props {
  section: any;
  handleChange: any;
}

const SpotlightSection = (props: Props) => {
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
    _handleChange('block', {
      id: newId(),
      type: null,
      supportedTypes: [BlockType.IMAGE, BlockType.UNSPLASH],
      label: 'BANNER',
      data: {
        position: 'center',
        raw: null,
      },
    });
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className="spotlight-builder">
      <div className="spotlight-builder__banner">
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
          <OakSelect
            name="background"
            value={props.section.background}
            label="Background type"
            handleInput={handleMetaChange}
            shape="underline"
            optionsAsKeyValue={[
              { id: 'flat', value: 'Flat or no color' },
              { id: 'default', value: 'Default color' },
              { id: 'primary', value: 'Primary color' },
              { id: 'secondary', value: 'Secondary color' },
              { id: 'image', value: 'Image overlay' },
            ]}
            gutterBottom
          />
          {props.section.background === 'image' && (
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
          )}
          {props.section.background === 'image' && (
            <OakCheckbox
              name="parallax"
              value={props.section.parallax}
              gutterBottom
              handleChange={handleMetaChange}
            >
              Add parallax effect
            </OakCheckbox>
          )}
          <ActionSection
            action={props.section.action}
            handleChange={handleActionChange}
          />
        </div>
        {props.section.background === 'image' && (
          // <OakBlock
          //   value={props.section.block}
          //   handleChange={handleBannerChange}
          //   reset={resetBanner}
          //   setBlockType={setBannerSource}
          // />
          <>replace oak block with new elements component</>
        )}
      </div>
    </div>
  );
};

export default SpotlightSection;
