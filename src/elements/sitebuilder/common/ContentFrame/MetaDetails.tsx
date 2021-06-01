import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakInput from '../../../../oakui/wc/OakInput';
import OakModal from '../../../../oakui/wc/OakModal';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';
import { ContentFrameMetaType } from '../../ContentFrameType';

interface Props {
  meta: ContentFrameMetaType;
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
    const _meta = { ...props.meta, [detail.name]: detail.value };
    props.handleChange(_meta);
  };

  return (
    <OakModal
      isOpen={props.isActive}
      handleClose={props.deactivate}
      heading="Content frame settings"
    >
      <div slot="body">
        <div className="site-builder-meta" id={elementId}>
          <OakRadioGroup
            name="horizontalPadding"
            radioGroupName={`horizontalPadding-${groupId}`}
            value={props.meta.horizontalPadding}
            label="Horizontal padding"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio
              name="none"
              radioGroupName={`horizontalPadding-${groupId}`}
            >
              None
            </OakRadio>
            <OakRadio
              name="small"
              radioGroupName={`horizontalPadding-${groupId}`}
            >
              Small
            </OakRadio>
            <OakRadio
              name="medium"
              radioGroupName={`horizontalPadding-${groupId}`}
            >
              Medium
            </OakRadio>
            <OakRadio
              name="large"
              radioGroupName={`horizontalPadding-${groupId}`}
            >
              Large
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="verticalPadding"
            radioGroupName={`verticalPadding-${groupId}`}
            value={props.meta.verticalPadding}
            label="Vertical padding"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="none" radioGroupName={`verticalPadding-${groupId}`}>
              None
            </OakRadio>
            <OakRadio
              name="small"
              radioGroupName={`verticalPadding-${groupId}`}
            >
              Small
            </OakRadio>
            <OakRadio
              name="medium"
              radioGroupName={`verticalPadding-${groupId}`}
            >
              Medium
            </OakRadio>
            <OakRadio
              name="large"
              radioGroupName={`verticalPadding-${groupId}`}
            >
              Large
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="gap"
            radioGroupName={`gap-${groupId}`}
            value={props.meta.gap}
            label="Spacing between contents"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="none" radioGroupName={`gap-${groupId}`}>
              None
            </OakRadio>
            <OakRadio name="small" radioGroupName={`gap-${groupId}`}>
              Small
            </OakRadio>
            <OakRadio name="medium" radioGroupName={`gap-${groupId}`}>
              Medium
            </OakRadio>
            <OakRadio name="large" radioGroupName={`gap-${groupId}`}>
              Large
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="verticalPosition"
            radioGroupName={`verticalPosition-${groupId}`}
            value={props.meta.verticalPosition}
            label="Vertical alignment"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="top" radioGroupName={`verticalPosition-${groupId}`}>
              Top
            </OakRadio>
            <OakRadio
              name="middle"
              radioGroupName={`verticalPosition-${groupId}`}
            >
              Middle
            </OakRadio>
            <OakRadio
              name="bottom"
              radioGroupName={`verticalPosition-${groupId}`}
            >
              Bottom
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="horizontalPosition"
            radioGroupName={`horizontalPosition-${groupId}`}
            value={props.meta.horizontalPosition}
            label="Horizontal alignment"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio
              name="left"
              radioGroupName={`horizontalPosition-${groupId}`}
            >
              Left
            </OakRadio>
            <OakRadio
              name="center"
              radioGroupName={`horizontalPosition-${groupId}`}
            >
              Center
            </OakRadio>
            <OakRadio
              name="right"
              radioGroupName={`horizontalPosition-${groupId}`}
            >
              Right
            </OakRadio>
          </OakRadioGroup>
          <OakRadioGroup
            name="borderThickness"
            radioGroupName={`borderThickness-${groupId}`}
            value={props.meta.borderThickness || 'none'}
            label="Border thickness"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="none" radioGroupName={`borderThickness-${groupId}`}>
              No border
            </OakRadio>
            <OakRadio name="thin" radioGroupName={`borderThickness-${groupId}`}>
              Thin
            </OakRadio>
            <OakRadio
              name="normal"
              radioGroupName={`borderThickness-${groupId}`}
            >
              Normal
            </OakRadio>
            <OakRadio
              name="thick"
              radioGroupName={`borderThickness-${groupId}`}
            >
              Thick
            </OakRadio>
          </OakRadioGroup>
          {props.meta.borderThickness !== 'none' && (
            <OakInput
              type="color"
              shape="sharp"
              name="borderColorHex"
              value={props.meta.borderColorHex}
              label="Border color"
              handleChange={handleChange}
            />
          )}
          <OakRadioGroup
            name="color"
            radioGroupName={`color-${groupId}`}
            value={props.meta.color}
            label="Background color"
            handleChange={handleChange}
            gutterBottom
          >
            <OakRadio name="none" radioGroupName={`color-${groupId}`}>
              None
            </OakRadio>
            <OakRadio name="default" radioGroupName={`color-${groupId}`}>
              Default
            </OakRadio>
            <OakRadio name="primary" radioGroupName={`color-${groupId}`}>
              Primary
            </OakRadio>
            <OakRadio name="secondary" radioGroupName={`color-${groupId}`}>
              Secondary
            </OakRadio>
            <OakRadio name="custom" radioGroupName={`color-${groupId}`}>
              Custom
            </OakRadio>
          </OakRadioGroup>
          {props.meta.color === 'custom' && (
            <OakInput
              type="color"
              shape="sharp"
              name="hex"
              value={props.meta.color}
              label="Choose custom color"
              handleChange={handleChange}
            />
          )}
          {props.meta.color === 'custom' && (
            <OakInput
              type="number"
              name="opacity"
              value={props.meta.opacity || 1}
              label="Transparency - Alpha"
              shape="sharp"
              handleInput={handleChange}
              gutterBottom
            />
          )}
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
