import React, { useState } from 'react';
import { BlockType } from 'elements';
import './FeatureItemSection.scss';
import OakButton from '../../../../oakui/wc/OakButton';
import { newId } from '../../../../events/MessageService';
import OakInput from '../../../../oakui/wc/OakInput';

interface Props {
  feature: any[];
  handleChange: any;
}

const FeatureItemSection = (props: Props) => {
  const addFeature = () => {
    const _feature = [...props.feature];
    _feature.push({
      id: newId(),
      title: '',
      subtitle: '',
      block: {
        id: newId(),
        type: null,
        supportedTypes: [BlockType.IMAGE, BlockType.UNSPLASH],
        label: 'IMAGE',
        data: {
          position: 'center',
          raw: null,
        },
      },
    });
    props.handleChange(_feature);
  };

  const handleBannerChange = (value: any, inputFeature: any) => {
    _handleChange(inputFeature.id, 'block', {
      ...inputFeature.block,
      data: value,
    });
  };

  const setBannerSource = (value: any, inputFeature: any) => {
    _handleChange(inputFeature.id, 'block', {
      ...inputFeature.block,
      type: value,
    });
  };

  const resetBanner = (inputFeature: any) => {
    _handleChange(inputFeature.id, 'block', {
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

  const handleChange = (detail: any, inputFeature: any) => {
    _handleChange(inputFeature.id, detail.name, detail.value);
  };

  const _handleChange = (id: string, field: string, value: any) => {
    const _feature = [...props.feature];
    const index = _feature.findIndex((item) => item.id === id);
    _feature[index] = { ..._feature[index], [field]: value };
    props.handleChange(_feature);
  };

  return (
    <div className="feature-item-section-conf">
      <OakButton
        shape="sharp"
        theme="default"
        variant="appear"
        handleClick={addFeature}
      >
        Add feature
      </OakButton>
      <div className="feature-item-section-conf__item__root">
        {props.feature.map((feature) => (
          <div className="feature-item-section-conf__item oak-bg-surface">
            <OakInput
              name="title"
              label="Title"
              value={feature.title}
              shape="underline"
              handleInput={(detail: any) => handleChange(detail, feature)}
              gutterBottom
            />
            <OakInput
              name="subtitle"
              label="Description"
              value={feature.subtitle}
              shape="underline"
              handleInput={(detail: any) => handleChange(detail, feature)}
              gutterBottom
            />
            replace oak block with new elements component
            {/* <OakBlock
              value={feature.block}
              handleChange={(value: any) => handleBannerChange(value, feature)}
              reset={(value: any) => resetBanner(feature)}
              setBlockType={(value: any) => setBannerSource(value, feature)}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureItemSection;
