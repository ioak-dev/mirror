import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { newId } from '../../../../elements/utils/BasicUtil';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../../builder/ContentBuilder';
import ContentType from '../../builder/ContentBuilder/ContentType';
import BackgroundView from '../../common/BackgroundView';
import {
  getContentClass,
  getGridSectionClass,
  getGridSectionContainerClass,
  getGridSectionItemClass,
  getTextAlignment,
} from '../../SitebuilderService';
import ControlButton from '../../common/ControlButton';
import GridSectionItem from './GridSectionItem';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const GridSectionEditor = (props: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleContentChange = (item: any, content: any) => {
    const _value = { ...props.value, item: [...props.value.item] };
    const index = _value.item.findIndex(
      (localItem: any) => localItem.id === item.id
    );
    if (index > -1) {
      _value.item[index].content = content;
      props.handleChange(_value);
    }
  };

  const handleGridItemChange = (item: any, localValue: any) => {
    console.log(item, localValue);
    const _value = { ...props.value, item: [...props.value.item] };
    const index = _value.item.findIndex(
      (localItem: any) => localItem.id === item.id
    );
    if (index > -1) {
      _value.item[index] = localValue;
      props.handleChange(_value);
    }
  };

  const handleAdd = (itemId?: string) => {
    const _value = { ...props.value, item: [...props.value.item] };
    const index = _value.item.findIndex((item: any) => item.id === itemId);
    if (index > -1) {
      _value.item.splice(index + 1, 0, { id: newId(), content: [] });
    } else {
      _value.item.push({
        id: newId(),
        content: [],
      });
    }
    props.handleChange(_value);
  };

  const handleDelete = (itemId: string) => {
    const _value = { ...props.value, item: [...props.value.item] };
    _value.item = _value.item.filter((item: any) => item.id !== itemId);
    props.handleChange(_value);
  };

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (
      el &&
      props.value?.background?.source === 'UNSPLASH' &&
      props.value?.background?.data?.urls
    ) {
      el.style.backgroundImage = `url("${props.value.background.data.urls.regular}")`;
      el.style.backgroundColor = 'inherit';
    }
    if (el && props.value?.background?.source === 'SOLID-COLOR') {
      el.style.backgroundImage = 'none';
      if (props.value?.background?.data?.color === 'custom') {
        el.style.backgroundColor = props.value?.background?.data?.hex;
      } else if (props.value?.background?.data?.color === 'default') {
        el.style.backgroundColor = 'var(--color-surface)';
      } else {
        el.style.backgroundColor = `var(--color-${props.value?.background?.data?.color})`;
      }
    }
  }, [props.value]);

  const handleMetaChange = (value: any) => {
    props.handleChange(value);
  };

  const handleChangeBackground = (value: any) => {
    const _value = { ...props.value };
    _value.background = value;
    console.log(_value);
    props.handleChange(_value);
  };

  const elementId = newId();

  return (
    <>
      <MetaDetails
        isActive={isEditOpen}
        handleChange={handleMetaChange}
        value={props.value}
        deactivate={() => setIsEditOpen(false)}
      />

      <BackgroundView
        value={props.value.background}
        handleChange={handleChangeBackground}
        handleEditRequest={() => setIsEditOpen(true)}
      >
        <div className="elements-site-viewbox">
          <div className={getGridSectionClass()}>
            <div className={getGridSectionContainerClass(props.value.layout)}>
              {props.value.item.map((item: any) => (
                <div key={item.id}>
                  <GridSectionItem
                    count={props.value.item.length}
                    align={props.value.align}
                    padding={props.value.padding}
                    margin={props.value.margin}
                    item={item}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    handleChange={(value: any) =>
                      handleGridItemChange(item, value)
                    }
                  />
                </div>
              ))}
              {props.value.item.length === 0 && (
                <ControlButton handleClick={() => handleAdd()}>
                  Add new grid item
                </ControlButton>
              )}
            </div>
          </div>
        </div>
      </BackgroundView>
    </>
  );
};

export default GridSectionEditor;
