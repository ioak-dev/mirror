import React, { useEffect, useState } from 'react';
import { newId } from '../../../utils/BasicUtil';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import './MetaDetails.scss';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakInput from '../../../../oakui/wc/OakInput';
import OakModal from '../../../../oakui/wc/OakModal';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';
import MetaDetailsSection from './MetaDetailsSection';
import CommonMetaDetailsSection from './CommonMetaDetailsSection';

interface Props {
  value: any;
  handleChange: any;
  isActive: boolean;
  deactivate: any;
}
const MetaDetails = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());
  const [elementId, setElementId] = useState(newId());

  const handleCommonChange = (value: any) => {
    props.handleChange(value);
  };

  const handleLeftChange = (value: any) => {
    const _value = { ...props.value };
    _value.left = value;
    props.handleChange(_value);
  };

  const handleRightChange = (value: any) => {
    const _value = { ...props.value };
    _value.right = value;
    props.handleChange(_value);
  };

  return (
    <OakModal
      isOpen={props.isActive}
      handleClose={props.deactivate}
      heading="Section settings"
    >
      <div slot="body">
        <div className="site-modal-section__root">
          <div className="site-modal-section">
            <div className="site-modal-section__title">Common</div>
            <CommonMetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleCommonChange}
              value={props.value}
              isActive={props.isActive}
            />
            <div className="site-modal-section__title">Left section</div>
            <MetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleLeftChange}
              value={props.value.left}
              isActive={props.isActive}
            />
          </div>
          <div className="site-modal-section">
            <div className="site-modal-section__title">Right section</div>
            <MetaDetailsSection
              deactivate={props.deactivate}
              handleChange={handleRightChange}
              value={props.value.right}
              isActive={props.isActive}
            />
          </div>
        </div>
      </div>
    </OakModal>
  );
};

export default MetaDetails;
