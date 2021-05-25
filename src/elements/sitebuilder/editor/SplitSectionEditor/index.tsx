import React, { useEffect, useState } from 'react';
import './style.scss';
import MetaDetails from './MetaDetails';
import ContentBuilder from '../../builder/ContentBuilder';
import ContentType from '../../builder/ContentBuilder/ContentType';
import BackgroundView from '../../common/BackgroundView';
import {
  getContentClass,
  getSplitSectionClass,
} from '../../SitebuilderService';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const SplitSectionEditor = (props: Props) => {
  const [isLeftEditOpen, setIsLeftEditOpen] = useState(false);
  const [isRightEditOpen, setIsRightEditOpen] = useState(false);

  const handleContentLeftChange = (content: any) => {
    const _value = { ...props.value };
    _value.left.content = content;
    props.handleChange(_value);
  };

  const handleContentRightChange = (content: any) => {
    const _value = { ...props.value };
    _value.right.content = content;
    props.handleChange(_value);
  };

  const handleLeftMetaChange = (value: any) => {
    const _value = { ...props.value };
    _value.left = value;
    _value.right = { ..._value.right, height: value.height };
    props.handleChange(_value);
  };

  const handleRightMetaChange = (value: any) => {
    const _value = { ...props.value };
    _value.right = value;
    _value.left = { ..._value.left, height: value.height };
    props.handleChange(_value);
  };

  const handleChangeLeftBackground = (value: any) => {
    const _value = { ...props.value };
    _value.left.background = value;
    props.handleChange(_value);
  };

  const handleChangeRightBackground = (value: any) => {
    const _value = { ...props.value };
    _value.right.background = value;
    props.handleChange(_value);
  };

  const handleResizeUp = () => {
    const _value = { ...props.value };
    _value.proportion -= 1;
    props.handleChange(_value);
  };

  const handleResizeDown = () => {
    const _value = { ...props.value };
    _value.proportion += 1;
    props.handleChange(_value);
  };

  return (
    <>
      <MetaDetails
        isActive={isLeftEditOpen}
        handleChange={handleLeftMetaChange}
        value={props.value.left}
        deactivate={() => setIsLeftEditOpen(false)}
      />
      <MetaDetails
        isActive={isRightEditOpen}
        handleChange={handleRightMetaChange}
        value={props.value.right}
        deactivate={() => setIsRightEditOpen(false)}
      />

      <div className={getSplitSectionClass(props.value.proportion)}>
        <div>
          <BackgroundView
            value={props.value.left.background}
            handleChange={handleChangeLeftBackground}
            handleEditRequest={() => setIsLeftEditOpen(true)}
            split
          >
            <div
              className={getContentClass(
                props.value.left.height,
                props.value.left.position
              )}
            >
              <div className="elements-site__content__textblock">
                <ContentBuilder
                  position={props.value.left.position}
                  bleed={props.value.left.bleed}
                  supportedTypes={[ContentType.TEXT, ContentType.ACTION]}
                  value={props.value.left.content}
                  handleChange={handleContentLeftChange}
                />
              </div>
            </div>
          </BackgroundView>
        </div>
        <div>
          <BackgroundView
            value={props.value.right.background}
            handleChange={handleChangeRightBackground}
            handleEditRequest={() => setIsRightEditOpen(true)}
            handleResizeUp={props.value.proportion > -3 ? handleResizeUp : null}
            handleResizeDown={
              props.value.proportion < 3 ? handleResizeDown : null
            }
            split
          >
            <div
              className={getContentClass(
                props.value.right.height,
                props.value.right.position
              )}
            >
              <div className="elements-site__content__textblock">
                <ContentBuilder
                  position={props.value.right.position}
                  bleed={props.value.right.bleed}
                  supportedTypes={[ContentType.TEXT, ContentType.ACTION]}
                  value={props.value.right.content}
                  handleChange={handleContentRightChange}
                />
              </div>
            </div>
          </BackgroundView>
        </div>
      </div>
    </>
  );
};

export default SplitSectionEditor;
