import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faLaptopMedical,
  faPaintBrush,
  faPen,
  faPlus,
  faPuzzlePiece,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../../elements/utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../../builder/ContentBuilder';
import ContentType from '../../builder/ContentBuilder/ContentType';
import BackgroundView from '../../common/BackgroundView';
import {
  getContentClass,
  getContentFrameClass,
  getContentFrameStyle,
  getGridSectionClass,
  getGridSectionContainerClass,
  getGridSectionItemClass,
  getGridSectionItemRootClass,
  getGridSectionItemStyle,
  getTextAlignment,
} from '../../SitebuilderService';
import ControlButton from '../../common/ControlButton';
import {
  ContentFrameItemDataType,
  ContentFrameType,
} from '../../ContentFrameType';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakModal from '../../../../oakui/wc/OakModal';

interface Props {
  frame: ContentFrameType;
  handleChange: any;
  handleAdd: any;
  handleDelete: any;
}
const ContentFrame = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleContentChange = (content: any) => {
    const _frame = { ...props.frame };
    _frame.items = content;
    props.handleChange(_frame);
  };

  const handleMetaChange = (meta: any) => {
    const _frame = { ...props.frame, meta };
    props.handleChange(_frame);
  };

  useEffect(() => {
    const el = document.getElementById(`content-frame-${elementId}`);
    if (el) {
      const computedStyle = getContentFrameStyle(props.frame.meta);
      el.style.setProperty('--content-frame-color', computedStyle.color);
      el.style.setProperty(
        '--content-frame-border-color',
        computedStyle.borderColor
      );
    }
  }, [props.frame]);

  const elementId = newId();

  const addNew = (type: ContentFrameItemDataType) => {
    const newBlock = getNewBlock(type);
    if (newBlock) {
      const _value: ContentFrameType = {
        ...props.frame,
        items: [...props.frame.items, newBlock],
      };
      props.handleChange(_value);
    }
    setIsAddOpen(false);
  };

  const getNewBlock = (type: ContentFrameItemDataType) => {
    switch (type) {
      case ContentFrameItemDataType.TEXT:
        return {
          id: newId(),
          type,
          data: {
            text: '',
          },
          meta: {
            elementType: 'body',
            fontsize: 'medium',
          },
        };
      case ContentFrameItemDataType.IMAGE:
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
            height: 'auto',
            parallax: false,
          },
        };
      case ContentFrameItemDataType.LINKS:
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
      <OakModal
        isOpen={isAddOpen}
        handleClose={() => setIsAddOpen(false)}
        width="auto"
        heading="Add new content"
      >
        <div slot="body">
          <div className="elements-site__content-root__type-selection">
            <OakRadio
              handleChange={() => addNew(ContentFrameItemDataType.TEXT)}
              name={ContentFrameItemDataType.TEXT}
            >
              Text
            </OakRadio>
            <OakRadio
              handleChange={() => addNew(ContentFrameItemDataType.LINKS)}
              name={ContentFrameItemDataType.LINKS}
            >
              Action
            </OakRadio>
            <OakRadio
              handleChange={() => addNew(ContentFrameItemDataType.IMAGE)}
              name={ContentFrameItemDataType.IMAGE}
            >
              Image
            </OakRadio>
          </div>
        </div>
      </OakModal>
      <MetaDetails
        isActive={isEditOpen}
        handleChange={handleMetaChange}
        meta={props.frame.meta}
        deactivate={() => setIsEditOpen(false)}
      />
      <div
        id={`content-frame-${elementId}`}
        className={`content-frame ${getContentFrameClass(props.frame.meta)}`}
      >
        <ContentBuilder
          handleChange={handleContentChange}
          items={props.frame.items}
          meta={props.frame.meta}
        />
        <div className="content-frame__action">
          <ControlButton handleClick={() => setIsAddOpen(true)} circle>
            <FontAwesomeIcon icon={faPlus} />
          </ControlButton>
          <ControlButton handleClick={props.handleAdd} circle>
            <FontAwesomeIcon icon={faLaptopMedical} />
          </ControlButton>
          <ControlButton handleClick={() => setIsEditOpen(true)} circle>
            <FontAwesomeIcon icon={faCog} />
          </ControlButton>
        </div>
      </div>
    </>
  );
};

export default ContentFrame;
