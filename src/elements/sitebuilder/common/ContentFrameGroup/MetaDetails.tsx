import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakInput from '../../../../oakui/wc/OakInput';
import OakModal from '../../../../oakui/wc/OakModal';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';

interface Props {
  item: any;
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
    const _item = { ...props.item, [detail.name]: detail.value };
    props.handleChange(_item);
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
            name="color"
            radioGroupName={`color-${groupId}`}
            value={props.item.color}
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
          {props.item.color === 'custom' && (
            <OakInput
              type="color"
              shape="sharp"
              name="hex"
              value={props.item.color}
              label="Choose custom color"
              handleChange={handleChange}
            />
          )}
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
