import React, { useEffect, useState } from 'react';
import { newId } from '../../../../elements/utils/BasicUtil';
import TextInput from '../../common/TextInput';
import './style.scss';
import ActionLinks from '../../common/ActionLinks';
import ImageContainer from '../../common/ImageContainer';
import {
  ContentFrameItemType,
  ContentFrameItemDataType,
  ContentFrameMetaType,
} from '../../ContentFrameType';
import {
  getContentClass,
  getContentContainerClass,
} from '../../SitebuilderService';

interface Props {
  items: ContentFrameItemType[];
  handleChange: any;
  meta: ContentFrameMetaType;
}
const ContentBuilder = (props: Props) => {
  const [groupId, setGroupId] = useState(newId());

  const handleChange = (item: any) => {
    console.log(item, props.items);
    const index = props.items.findIndex((_item: any) => item.id === _item.id);
    if (index >= 0) {
      const _items = [...props.items];
      _items[index] = item;
      props.handleChange(_items);
    }
  };

  const handleDelete = (id: any) => {
    // props.handleChange(props.value.filter((item: any) => item.id !== id));
  };

  return (
    <>
      <div className="content-builder">
        <div className={getContentClass(props.meta)}>
          {props.items.map((item) => (
            <div key={item.id}>
              {item.type === ContentFrameItemDataType.TEXT && (
                <TextInput
                  block={item}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                  placeholder="Enter text"
                  align={props.meta.horizontalPosition}
                />
              )}
              {item.type === ContentFrameItemDataType.IMAGE && (
                <ImageContainer
                  block={item}
                  handleChange={handleChange}
                  align={props.meta.horizontalPosition}
                />
              )}
              {item.type === ContentFrameItemDataType.LINKS && (
                <ActionLinks
                  handleDelete={handleDelete}
                  block={item}
                  handleChange={handleChange}
                  align={props.meta.horizontalPosition}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentBuilder;
