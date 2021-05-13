import React, { useEffect, useState } from 'react';
import './OakEditorList.scss';
import OakEditorRichText from './OakEditorRichText';
import OakRichTextControlType from './types/OakRichTextControlType';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';

interface Props {
  groupId: string;
  block: any;
  handleChange: any;
  setBlockType: any;
  moveDown?: any;
  moveUp?: any;
  remove?: any;
  add?: any;
  fixed?: boolean;
  outline?: boolean;
}
const OakEditorList = (props: Props) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    OakEditorFocusedEvent.asObservable().subscribe((item) => {
      if (item.groupId === props.groupId) {
        setEditing(item.id === props.block.id);
      }
    });
  }, []);

  const handleFocus = (isFocused: boolean) => {
    if (isFocused) {
      OakEditorFocusedEvent.next({
        groupId: props.groupId,
        id: props.block.id,
      });
    }
  };

  const handleChange = (text: string) => {
    const _newData = { ...props.block.data, text };
    props.handleChange(_newData);
  };

  return (
    <div className="oak-editor-list">
      <div
        className={`oak-editor-list__input ${
          editing ? 'oak-editor-list__input--editing' : ''
        }`}
      >
        <OakEditorRichText
          blockStyle
          value={props.block?.data?.text}
          controls={[
            OakRichTextControlType.INCREASE_INDENT,
            OakRichTextControlType.DECREASE_INDENT,
            OakRichTextControlType.BULLET_LIST,
            OakRichTextControlType.ORDERED_LIST,
            OakRichTextControlType.BOLD,
            OakRichTextControlType.ITALIC,
            OakRichTextControlType.UNDERLINE,
            OakRichTextControlType.STRIKE,
          ]}
          handleChange={handleChange}
          handleFocus={handleFocus}
        />
      </div>
    </div>
  );
};

export default OakEditorList;
