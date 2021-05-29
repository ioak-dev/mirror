import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../../elements/utils/BasicUtil';
import TextInput from '../../common/TextInput';
import './style.scss';
import OakButton from '../../../../oakui/wc/OakButton';
import ImageWizard from '../../common/ImageWizard';
import ActionLinks from '../../common/ActionLinks';
import ContentType from './ContentType';
import OakModal from '../../../../oakui/wc/OakModal';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import ActionButton from '../../../core/common/ActionButton';
import ControlButton from '../../common/ControlButton';
import {
  getContentRootClass,
  getTextAlignment,
} from '../../SitebuilderService';
import ImageContainer from '../../common/ImageContainer';

interface Props {
  value: any;
  handleChange: any;
  supportedTypes: ContentType[];
  position:
    | 'left'
    | 'right'
    | 'center'
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  padding: 'none' | 'small' | 'medium' | 'large';
}
const ContentBuilder = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupId, setGroupId] = useState(newId());

  useEffect(() => {
    console.log(props.value);
  }, [props.value]);

  const handleChange = (item: any) => {
    const index = props.value.findIndex((_item: any) => item.id === _item.id);
    console.log(props.value, item, index);
    if (index >= 0) {
      const _value = [...props.value];
      _value[index] = item;
      props.handleChange(_value);
    }
  };

  const handleDelete = (id: any) => {
    props.handleChange(props.value.filter((item: any) => item.id !== id));
  };

  const addNew = (type: ContentType) => {
    const newBlock = getNewBlock(type);
    if (newBlock) {
      const _value = [...props.value, newBlock];
      props.handleChange(_value);
    }
    setIsOpen(false);
  };

  const getNewBlock = (type: ContentType) => {
    switch (type) {
      case ContentType.TEXT:
        return {
          id: newId(),
          type,
          data: {
            text: 'abcd',
          },
          meta: {
            elementType: 'body',
            fontsize: 'medium',
          },
        };
      case ContentType.IMAGE:
        return {
          id: newId(),
          type,
          source: 'UNSPLASH',
          data: {
            urls: {
              regular:
                'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw0fHxiYWxsZXR8ZW58MHwwfHx8MTYyMTMzODkyNA&ixlib=rb-1.2.1&q=80&w=1080',
            },
          },
          meta: {
            overlay: 'low',
          },
        };
      case ContentType.ACTION:
        return {
          id: newId(),
          type,
          data: {
            items: [
              {
                id: newId(),
                color: 'default',
                label: 'label',
                url: 'google.com',
              },
            ],
          },
          meta: {
            size: 'medium',
            shape: 'sharp',
          },
        };

      default:
        return null;
    }
  };

  return (
    <>
      <div className="content-builder">
        {/* {props.value?.length > 0 && ( */}
        <div
          className={`content-builder__container ${getContentRootClass(
            props.position,
            props.padding
          )}`}
        >
          {props.value.map((item: any) => (
            <div key={item.id}>
              {item.type === ContentType.TEXT && (
                <TextInput
                  block={item}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                  placeholder="Enter text"
                  align={getTextAlignment(props.position)}
                />
              )}
              {item.type === ContentType.IMAGE && (
                <ImageContainer
                  block={item}
                  handleChange={handleChange}
                  align={getTextAlignment(props.position)}
                />
              )}
              {item.type === ContentType.ACTION && (
                <ActionLinks
                  handleDelete={handleDelete}
                  block={item}
                  handleChange={handleChange}
                  align={getTextAlignment(props.position)}
                />
              )}
            </div>
          ))}
          <ControlButton handleClick={() => setIsOpen(true)}>
            Add Content
          </ControlButton>
        </div>
        {/* )} */}
      </div>
      <OakModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        width="small"
        heading="Add new content"
      >
        <div slot="body">
          <div className="elements-site__content-root__type-selection">
            <OakRadio
              handleChange={() => addNew(ContentType.TEXT)}
              name={ContentType.TEXT}
            >
              Text
            </OakRadio>
            <OakRadio
              handleChange={() => addNew(ContentType.ACTION)}
              name={ContentType.ACTION}
            >
              Action
            </OakRadio>
            <OakRadio
              handleChange={() => addNew(ContentType.IMAGE)}
              name={ContentType.IMAGE}
            >
              Image
            </OakRadio>
            <OakRadio
              handleChange={() => addNew(ContentType.SPACING)}
              name={ContentType.SPACING}
            >
              Spacing
            </OakRadio>
          </div>
        </div>
      </OakModal>
    </>
  );
};

export default ContentBuilder;
