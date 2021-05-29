import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faPaintBrush,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../../elements/utils/BasicUtil';
import './GridSectionItem.scss';
import ItemMetaDetails from './ItemMetaDetails';
import ContentBuilder from '../../builder/ContentBuilder';
import ContentType from '../../builder/ContentBuilder/ContentType';
import BackgroundView from '../../common/BackgroundView';
import {
  getContentClass,
  getGridSectionClass,
  getGridSectionContainerClass,
  getGridSectionItemClass,
  getGridSectionItemRootClass,
  getGridSectionItemStyle,
  getTextAlignment,
} from '../../SitebuilderService';
import ControlButton from '../../common/ControlButton';

interface Props {
  item: any;
  align: 'left' | 'center' | 'right';
  padding: any;
  margin: any;
  handleChange: any;
  handleAdd: any;
  handleDelete: any;
  count: number;
}
const GridSectionItem = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleContentChange = (content: any) => {
    const _item = { ...props.item, content };
    props.handleChange(_item);
    // }
  };

  const handleMetaChange = (value: any) => {
    props.handleChange(value);
  };

  useEffect(() => {
    const el = document.getElementById(`item-${elementId}`);
    if (el) {
      const computedStyle = getGridSectionItemStyle(
        props.item.color,
        props.item.hex
      );
      el.style.setProperty('--grid-item-color', computedStyle.color);
    }
  }, [props.item]);

  const elementId = newId();

  return (
    <>
      <ItemMetaDetails
        isActive={isEditOpen}
        handleChange={handleMetaChange}
        item={props.item}
        deactivate={() => setIsEditOpen(false)}
      />
      <div
        className={`grid-section-item ${getGridSectionItemRootClass(
          props.margin
        )}`}
      >
        <div
          className={getGridSectionItemClass(
            props.item.color,
            props.item.hex,
            props.padding
          )}
          id={`item-${elementId}`}
        >
          <ContentBuilder
            position={props.align}
            padding="none"
            supportedTypes={[ContentType.TEXT, ContentType.ACTION]}
            value={props.item.content}
            handleChange={handleContentChange}
          />
        </div>
        <div className="grid-section-item__action">
          <ControlButton
            handleClick={() => props.handleAdd(props.item.id)}
            circle
          >
            <FontAwesomeIcon icon={faPlus} />
          </ControlButton>
          {props.count > 0 && (
            <ControlButton
              handleClick={() => props.handleDelete(props.item.id)}
              circle
            >
              <FontAwesomeIcon icon={faTrash} />
            </ControlButton>
          )}
          <ControlButton handleClick={() => setIsEditOpen(true)} circle>
            <FontAwesomeIcon icon={faPaintBrush} />
          </ControlButton>
        </div>
      </div>
    </>
  );
};

export default GridSectionItem;
