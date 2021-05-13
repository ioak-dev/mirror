import React, { useEffect, useState } from 'react';
import OakEditorHeading from './OakEditorHeading';
import OakEditorList from './OakEditorList';
import OakEditorParagraph from './OakEditorParagraph';
import OakEditorImage from './OakEditorImage';
import OakEditorBlockType from './types/OakEditorBlockType';
import OakEditorUnsplash from './OakEditorUnsplash';

import './OakEditorBlock.scss';
import OakEditorPrimaryToolbar from './toolbar/OakEditorPrimaryToolbar';
import OakEditorHeadingToolbar from './toolbar/OakEditorHeadingToolbar';
import OakEditorNew from './OakEditorNew';
import OakEditorBlockTypeLabel from './toolbar/OakEditorBlockTypeLabel';
import {
  ScrollToBlockCommand,
  ScrollToBlockCommandType,
} from './types/ScrollToBlockCommand';
import { newId } from '../../events/MessageService';
import OakEditorImageToolbar from './toolbar/OakEditorImageToolbar';

interface Props {
  groupId: string;
  block: any;
  handleChange: any;
  setBlockType: any;
  moveDown?: any;
  moveUp?: any;
  remove?: any;
  reset?: any;
  add?: any;
  fixed?: boolean;
  outline?: boolean;
}
const OakEditorBlock = (props: Props) => {
  const elementId = `id-${newId()}`;
  const handleHeadingLevelChange = (level: number) => {
    const _newData = { ...props.block.data, level };
    props.handleChange(_newData);
  };
  const handlePositionChange = (position: 'left' | 'right' | 'center') => {
    const _newData = { ...props.block.data, position };
    props.handleChange(_newData);
  };

  useEffect(() => {
    ScrollToBlockCommand.asObservable().subscribe(
      (item: ScrollToBlockCommandType) => {
        if (item.blockId === props.block.id) {
          const el = document.getElementById(elementId);
          if (el) {
            window.scrollTo({ top: el.offsetTop - 50, behavior: 'smooth' });
          }
        }
      }
    );
  }, []);

  return (
    <div className="oak-editor-block oak-bg-container" id={elementId}>
      <div className="oak-editor-block__toolbar">
        <div className="oak-editor-block__toolbar__left">
          <OakEditorBlockTypeLabel block={props.block} />
          {!props.fixed && props.block.type === OakEditorBlockType.HEADING && (
            <OakEditorHeadingToolbar
              headingLevelOne={() => handleHeadingLevelChange(1)}
              headingLevelTwo={() => handleHeadingLevelChange(2)}
              headingLevelThree={() => handleHeadingLevelChange(3)}
              headingLevelFour={() => handleHeadingLevelChange(4)}
            />
          )}
          {!props.fixed &&
            [OakEditorBlockType.IMAGE, OakEditorBlockType.UNSPLASH].includes(
              props.block.type
            ) && (
              <OakEditorImageToolbar
                leftImage={() => handlePositionChange('left')}
                rightImage={() => handlePositionChange('right')}
                centerImage={() => handlePositionChange('center')}
              />
            )}
        </div>
        {!props.fixed && (
          <OakEditorPrimaryToolbar
            add={props.add}
            remove={props.remove}
            reset={props.reset}
            moveDown={props.moveDown}
            moveUp={props.moveUp}
          />
        )}
      </div>
      {props.block.type === OakEditorBlockType.PARAGRAPH && (
        <OakEditorParagraph
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          setBlockType={props.setBlockType}
          fixed={props.fixed}
          outline={props.outline}
        />
      )}
      {props.block.type === OakEditorBlockType.LIST && (
        <OakEditorList
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          setBlockType={props.setBlockType}
          fixed={props.fixed}
          outline={props.outline}
        />
      )}
      {props.block.type === OakEditorBlockType.HEADING && (
        <OakEditorHeading
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          setBlockType={props.setBlockType}
          fixed={props.fixed}
          outline={props.outline}
        />
      )}
      {props.block.type === OakEditorBlockType.IMAGE && (
        <OakEditorImage
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          setBlockType={props.setBlockType}
          fixed={props.fixed}
          outline={props.outline}
        />
      )}
      {props.block.type === OakEditorBlockType.UNSPLASH && (
        <OakEditorUnsplash
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          setBlockType={props.setBlockType}
          fixed={props.fixed}
          outline={props.outline}
        />
      )}
      {!props.block.type && (
        <OakEditorNew
          groupId={props.groupId}
          block={props.block}
          remove={props.remove}
          setBlockType={props.setBlockType}
          outline={props.outline}
          supportedTypes={props.block.supportedTypes}
        />
      )}
    </div>
  );
};

export default OakEditorBlock;
