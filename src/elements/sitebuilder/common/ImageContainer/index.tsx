import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import OakModal from '../../../../oakui/wc/OakModal';
import OakButton from '../../../../oakui/wc/OakButton';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakInput from '../../../../oakui/wc/OakInput';
import ActionButton from '../ActionButton';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';
import ControlButton from '../ControlButton';
import {
  getImageContainerClass,
  getImageContainerImgClass,
} from '../../SitebuilderService';
import ImageWizard from '../ImageWizard';

interface Props {
  block: any;
  handleChange: any;
  align: 'left' | 'right' | 'center';
}

const ImageContainer = (props: Props) => {
  const [elementId, setElementId] = useState(newId());
  const [isOpen, setIsOpen] = useState(false);
  const [groupId, setGroupId] = useState<any>(newId());

  const addNew = () => {
    const _block = { ...props.block };
    _block.data.items = [
      ..._block.data.items,
      {
        id: newId(),
        label: 'label new',
        link: 'url',
      },
    ];
    props.handleChange(_block);
  };

  const handleMetaChange = (detail: any) => {
    const _block = { ...props.block };
    _block.meta[detail.name] = detail.value;
    props.handleChange(_block);
  };

  const handleImageChange = (imageData: any) => {
    props.handleChange(imageData);
  };

  return (
    <>
      <ImageWizard
        deactivate={() => setIsOpen(false)}
        imageData={props.block}
        isActive={isOpen}
        handleChange={handleImageChange}
      />
      <div className="image-container__container">
        <div className={getImageContainerClass(props.align)}>
          <img
            className={getImageContainerImgClass()}
            src={props.block.data.urls.regular}
            alt={props.block.alt_description}
          />
        </div>
        <div className="image-container__control">
          <ControlButton handleClick={() => setIsOpen(true)} circle>
            <FontAwesomeIcon icon={faPen} />
          </ControlButton>
        </div>
      </div>
    </>
  );
};

export default ImageContainer;
