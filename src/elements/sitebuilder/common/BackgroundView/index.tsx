import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faImage,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../../elements/utils/BasicUtil';
import './style.scss';
import ImageWizard from '../../common/ImageWizard';
import OakButton from '../../../../oakui/wc/OakButton';
import {
  getBackgroundClass,
  getBackgroundStyle,
  getOverlay,
} from '../../SitebuilderService';

interface Props {
  value: any;
  handleChange: any;
  handleEditRequest?: any;
  handleResizeUp?: any;
  handleResizeDown?: any;
  children: any;
  split?: boolean;
}
const BackgroundView = (props: Props) => {
  const [isChangeBackgroundOpen, setIsChangeBackgroundOpen] = useState(false);

  const handleEditRequest = () => {
    if (props.handleEditRequest) {
      props.handleEditRequest();
    }
  };

  useEffect(() => {
    const computedStyles = getBackgroundStyle(props.value);
    const el = document.getElementById(elementId);
    const overlayEl = document.getElementById(`overlay-${elementId}`);
    if (el) {
      el.style.backgroundImage = computedStyles.backgroundImage;
      el.style.backgroundColor = computedStyles.backgroundColor;
    }
    if (overlayEl) {
      overlayEl.style.backgroundColor = computedStyles.overlayBackgroundColor;
    }
  }, [props.value]);

  const handleMetaChange = (meta: any) => {
    const _value = { ...props.value, meta };
    props.handleChange(_value);
  };

  const handleChangeBackground = (value: any) => {
    props.handleChange(value);
  };

  const elementId = newId();

  return (
    <>
      <ImageWizard
        isActive={isChangeBackgroundOpen}
        deactivate={() => setIsChangeBackgroundOpen(false)}
        handleChange={handleChangeBackground}
        imageData={props.value}
        heading="Choose hero background"
      />

      <div
        className={getBackgroundClass(
          props.value.meta.parallax,
          props.split || false
        )}
        id={elementId}
      >
        <div
          className="elements-site__background__overlay"
          id={`overlay-${elementId}`}
        >
          <div className="background-view__action">
            {props.handleResizeDown && (
              <OakButton
                shape="sharp"
                theme="default"
                handleClick={props.handleResizeDown}
              >
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </OakButton>
            )}
            {props.handleResizeUp && (
              <OakButton
                shape="sharp"
                theme="default"
                handleClick={props.handleResizeUp}
              >
                <FontAwesomeIcon icon={faLongArrowAltRight} />
              </OakButton>
            )}
            {props.handleEditRequest && (
              <OakButton
                shape="sharp"
                theme="default"
                handleClick={handleEditRequest}
              >
                <FontAwesomeIcon icon={faCog} />
              </OakButton>
            )}
            <OakButton
              shape="sharp"
              theme="default"
              handleClick={() => setIsChangeBackgroundOpen(true)}
            >
              <FontAwesomeIcon icon={faImage} />
            </OakButton>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default BackgroundView;
