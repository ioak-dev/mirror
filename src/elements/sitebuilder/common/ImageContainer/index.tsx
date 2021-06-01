import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
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
        heading="Choose image"
        supportedTypes={['IMAGE', 'UNSPLASH']}
        supportedModifiers={['OVERLAY', 'PARALLAX', 'HEIGHT']}
      />
      <div className="image-container__container">
        <div className={getImageContainerClass(props.align, props.block.meta)}>
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
