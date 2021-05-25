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
import {
  getContentRootClass,
  getTextAlignment,
} from '../../SitebuilderService';

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
  bleed: 'none' | 'small' | 'medium' | 'large';
}
const ContentBuilder = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupId, setGroupId] = useState(newId());

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
      <div className={getContentRootClass(props.position, props.bleed)}>
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
            {item.type === ContentType.ACTION && (
              <ActionLinks
                block={item}
                handleChange={handleChange}
                align={getTextAlignment(props.position)}
              />
            )}
          </div>
        ))}
        <ActionButton handleClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </ActionButton>
      </div>
      <OakModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        width="small"
        heading="Choose content type"
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
