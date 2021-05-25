import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import './MetaDetails.scss';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakInput from '../../../../oakui/wc/OakInput';
import OakButton from '../../../../oakui/wc/OakButton';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';

interface Props {
  meta: any;
  handleChange: any;
}
const MetaDetails = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  const handleChange = (detail: any) => {
    const _meta = { ...props.meta, [detail.name]: detail.value };
    props.handleChange(_meta);
  };

  return (
    <div className="site-builder-meta__control">
      <div className="site-builder-meta__control__item">
        <OakRadioGroup
          name="elementType"
          radioGroupName={`elementType-${groupId}`}
          value={props.meta.elementType}
          label="Element type"
          handleChange={handleChange}
          gutterBottom
        >
          <OakRadio name="body" radioGroupName={`elementType-${groupId}`}>
            Body
          </OakRadio>
          <OakRadio name="subtitle" radioGroupName={`elementType-${groupId}`}>
            Subtitle
          </OakRadio>
          <OakRadio name="caption" radioGroupName={`elementType-${groupId}`}>
            Caption
          </OakRadio>
          <OakRadio name="h1" radioGroupName={`elementType-${groupId}`}>
            Heading 1
          </OakRadio>
          <OakRadio name="h2" radioGroupName={`elementType-${groupId}`}>
            Heading 2
          </OakRadio>
          <OakRadio name="h3" radioGroupName={`elementType-${groupId}`}>
            Heading 3
          </OakRadio>
        </OakRadioGroup>
      </div>
      <div className="site-builder-meta__control__item">
        <OakRadioGroup
          name="color"
          radioGroupName={`color-${groupId}`}
          value={props.meta.color}
          label="Color"
          handleChange={handleChange}
          gutterBottom
        >
          <OakRadio name="dark" radioGroupName={`color-${groupId}`}>
            Dark
          </OakRadio>
          <OakRadio name="light" radioGroupName={`color-${groupId}`}>
            Light
          </OakRadio>
          <OakRadio name="primary" radioGroupName={`color-${groupId}`}>
            Primary
          </OakRadio>
          <OakRadio name="secondary" radioGroupName={`color-${groupId}`}>
            Secondary
          </OakRadio>
          <OakRadio name="auto" radioGroupName={`color-${groupId}`}>
            Auto
          </OakRadio>
          <OakRadio name="custom" radioGroupName={`color-${groupId}`}>
            Custom color
          </OakRadio>
        </OakRadioGroup>
        {props.meta.color === 'custom' && (
          <OakInput
            type="color"
            name="hex"
            value={props.meta.hex || ''}
            handleInput={handleChange}
            shape="sharp"
            label="Custom color"
          />
        )}
      </div>
      <div className="site-builder-meta__control__item">
        <OakRadioGroup
          name="fontfamily"
          radioGroupName={`fontfamily-${groupId}`}
          value={props.meta.fontfamily}
          label="Font family"
          handleChange={handleChange}
          gutterBottom
        >
          <OakRadio name="title" radioGroupName={`fontfamily-${groupId}`}>
            Title
          </OakRadio>
          <OakRadio
            name="title-alternate"
            radioGroupName={`fontfamily-${groupId}`}
          >
            Title variant
          </OakRadio>
          <OakRadio name="body" radioGroupName={`fontfamily-${groupId}`}>
            Body
          </OakRadio>
          <OakRadio
            name="body-alternate"
            radioGroupName={`fontfamily-${groupId}`}
          >
            Body variant
          </OakRadio>
        </OakRadioGroup>
      </div>
      <div className="site-builder-meta__control__item">
        <OakRadioGroup
          name="fontsize"
          radioGroupName={`fontsize-${groupId}`}
          value={props.meta.fontsize}
          label="Font size"
          handleChange={handleChange}
          gutterBottom
        >
          <OakRadio name="small" radioGroupName={`fontsize-${groupId}`}>
            Small
          </OakRadio>
          <OakRadio name="medium" radioGroupName={`fontsize-${groupId}`}>
            Medium
          </OakRadio>
          <OakRadio name="large" radioGroupName={`fontsize-${groupId}`}>
            Large
          </OakRadio>
        </OakRadioGroup>
      </div>
      <div className="site-builder-meta__control__item">
        <OakRadioGroup
          name="fontweight"
          radioGroupName={`fontweight-${groupId}`}
          value={props.meta.fontweight}
          label="Font weight"
          handleChange={handleChange}
          gutterBottom
        >
          <OakRadio name="thin" radioGroupName={`fontweight-${groupId}`}>
            Thin
          </OakRadio>
          <OakRadio name="regular" radioGroupName={`fontweight-${groupId}`}>
            Regular
          </OakRadio>
          <OakRadio name="bold" radioGroupName={`fontweight-${groupId}`}>
            Bold
          </OakRadio>
        </OakRadioGroup>
      </div>
    </div>
  );
};

export default MetaDetails;
