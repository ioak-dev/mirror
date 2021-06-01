import React, { useEffect, useState } from 'react';
import { newId } from '../../../../elements/utils/BasicUtil';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakModal from '../../../../oakui/wc/OakModal';
import './style.scss';
import UnsplashPicker from '../UnsplashPicker';
import OakInput from '../../../../oakui/wc/OakInput';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';

interface Props {
  imageData: any;
  isActive: boolean;
  handleChange: any;
  deactivate: any;
  heading?: string;
  supportedTypes?: ('SOLID-COLOR' | 'IMAGE' | 'UNSPLASH')[];
  supportedModifiers?: ('OVERLAY' | 'PARALLAX' | 'HEIGHT')[];
}
const ImageWizard = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());

  const handleSourceChange = (detail: any) => {
    const _imageData = { ...props.imageData, source: detail.value };
    props.handleChange(_imageData);
  };

  const handleMetaChange = (detail: any) => {
    const _imageData = {
      ...props.imageData,
      meta: { ...props.imageData.meta, [detail.name]: detail.value },
    };
    props.handleChange(_imageData);
  };

  const handleUnsplashChange = (value: any) => {
    const _imageData = { ...props.imageData, data: value };
    props.handleChange(_imageData);
    props.deactivate();
  };

  const handleChange = (detail: any) => {
    const _imageData = { ...props.imageData };
    if (!_imageData.data) {
      _imageData.data = {};
    }
    _imageData.data[detail.name] = detail.value;
    props.handleChange(_imageData);
  };
  // const handleImageChange = (imageData: any) => {
  //   const _newData = {
  //     urls: imageData.urls,
  //     user: imageData.user,
  //     alt_description: imageData.alt_description,
  //   };
  //   props.handleChange(_newData);
  // };

  return (
    <div className="zero-height">
      <OakModal
        isOpen={props.isActive}
        handleClose={props.deactivate}
        height="auto"
        width="medium"
        heading={props.heading || 'Choose graphic'}
      >
        <div slot="body">
          <div className="image-wizard">
            <OakRadioGroup
              name="source"
              radioGroupName={`image-source-${groupId}`}
              value={props.imageData.source}
              label="Source"
              handleChange={handleSourceChange}
              gutterBottom
            >
              {(!props.supportedTypes ||
                props.supportedTypes.includes('SOLID-COLOR')) && (
                <OakRadio
                  name="SOLID-COLOR"
                  radioGroupName={`image-source-${groupId}`}
                >
                  Solid color
                </OakRadio>
              )}
              {(!props.supportedTypes ||
                props.supportedTypes.includes('IMAGE')) && (
                <OakRadio
                  name="IMAGE"
                  radioGroupName={`image-source-${groupId}`}
                >
                  Image
                </OakRadio>
              )}
              {(!props.supportedTypes ||
                props.supportedTypes.includes('UNSPLASH')) && (
                <OakRadio
                  name="UNSPLASH"
                  radioGroupName={`image-source-${groupId}`}
                >
                  Stock image from Unsplash
                </OakRadio>
              )}
            </OakRadioGroup>
            {['UNSPLASH', 'IMAGE'].includes(props.imageData.source) && (
              <div>
                {(!props.supportedModifiers ||
                  props.supportedModifiers.includes('HEIGHT')) && (
                  <OakRadioGroup
                    name="height"
                    radioGroupName={`height-${groupId}`}
                    value={props.imageData.meta.height}
                    label="Image height"
                    handleChange={handleMetaChange}
                    gutterBottom
                  >
                    <OakRadio
                      name="xsmall"
                      radioGroupName={`height-${groupId}`}
                    >
                      Extra small
                    </OakRadio>
                    <OakRadio name="small" radioGroupName={`height-${groupId}`}>
                      Small
                    </OakRadio>
                    <OakRadio
                      name="medium"
                      radioGroupName={`height-${groupId}`}
                    >
                      Medium
                    </OakRadio>
                    <OakRadio name="large" radioGroupName={`height-${groupId}`}>
                      Large
                    </OakRadio>
                    <OakRadio
                      name="xlarge"
                      radioGroupName={`height-${groupId}`}
                    >
                      Extra large
                    </OakRadio>
                    <OakRadio name="auto" radioGroupName={`height-${groupId}`}>
                      Auto or Maximum
                    </OakRadio>
                  </OakRadioGroup>
                )}
                {(!props.supportedModifiers ||
                  props.supportedModifiers.includes('OVERLAY')) && (
                  <OakRadioGroup
                    name="overlayIntensity"
                    radioGroupName={`overlay-${groupId}`}
                    value={props.imageData.meta.overlayIntensity}
                    label="Overlay intensity"
                    handleChange={handleMetaChange}
                    gutterBottom
                  >
                    <OakRadio name="none" radioGroupName={`overlay-${groupId}`}>
                      None
                    </OakRadio>
                    <OakRadio
                      name="ultralow"
                      radioGroupName={`overlay-${groupId}`}
                    >
                      Ultra low
                    </OakRadio>
                    <OakRadio name="low" radioGroupName={`overlay-${groupId}`}>
                      Low
                    </OakRadio>
                    <OakRadio
                      name="moderate"
                      radioGroupName={`overlay-${groupId}`}
                    >
                      Moderate
                    </OakRadio>
                    <OakRadio
                      name="heavy"
                      radioGroupName={`overlay-${groupId}`}
                    >
                      Heavy
                    </OakRadio>
                    <OakRadio
                      name="intense"
                      radioGroupName={`overlay-${groupId}`}
                    >
                      Intense
                    </OakRadio>
                  </OakRadioGroup>
                )}
                {(!props.supportedModifiers ||
                  props.supportedModifiers.includes('OVERLAY')) && (
                  <div className="elements-site-color-picker">
                    <OakInput
                      type="color"
                      name="overlayColor"
                      value={props.imageData.meta.overlayColor}
                      handleChange={handleMetaChange}
                      shape="sharp"
                      label="Overlay color"
                      gutterBottom
                    />
                  </div>
                )}
                {(!props.supportedModifiers ||
                  props.supportedModifiers.includes('PARALLAX')) && (
                  <OakCheckbox
                    name="parallax"
                    value={props.imageData.meta.parallax}
                    handleChange={handleMetaChange}
                    gutterBottom
                  >
                    Parallax effect
                  </OakCheckbox>
                )}
              </div>
            )}
            {props.imageData.source === 'UNSPLASH' && (
              <UnsplashPicker handleChange={handleUnsplashChange} />
            )}
            {props.imageData.source === 'SOLID-COLOR' && (
              <div className="image-wizard__solid">
                <OakRadioGroup
                  name="color"
                  radioGroupName={`solid-${groupId}`}
                  value={props.imageData.data.color}
                  label="Color"
                  handleChange={handleChange}
                  gutterBottom
                >
                  <OakRadio name="none" radioGroupName={`solid-${groupId}`}>
                    None
                  </OakRadio>
                  <OakRadio name="default" radioGroupName={`solid-${groupId}`}>
                    Default
                  </OakRadio>
                  <OakRadio name="primary" radioGroupName={`solid-${groupId}`}>
                    Primary
                  </OakRadio>
                  <OakRadio
                    name="secondary"
                    radioGroupName={`solid-${groupId}`}
                  >
                    Secondary
                  </OakRadio>
                  <OakRadio name="custom" radioGroupName={`solid-${groupId}`}>
                    Custom
                  </OakRadio>
                </OakRadioGroup>
                {props.imageData.data?.color === 'custom' && (
                  <OakInput
                    type="color"
                    name="hex"
                    value={props.imageData?.data?.hex || ''}
                    label="Custom color"
                    shape="sharp"
                    handleInput={handleChange}
                    gutterBottom
                  />
                )}
                {props.imageData.data?.color === 'custom' && (
                  <OakInput
                    type="number"
                    name="opacity"
                    value={props.imageData?.data?.opacity || 1}
                    label="Transparency - Alpha"
                    shape="sharp"
                    handleInput={handleChange}
                    gutterBottom
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </OakModal>
    </div>
  );
};

export default ImageWizard;
