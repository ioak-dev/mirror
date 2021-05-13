import React, { useEffect, useState } from 'react';
import './OakEditorParagraph.scss';
import OakRichTextControlType from './types/OakRichTextControlType';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';
import OakEditorRichText from './OakEditorRichText';

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
const OakEditorParagraph = (props: Props) => {
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
    <div className="oak-editor-paragraph">
      <div
        className={`oak-editor-paragraph__input ${
          editing ? 'oak-editor-paragraph__input--editing' : ''
        }`}
      >
        <OakEditorRichText
          blockStyle
          value={props.block?.data?.text}
          controls={[
            OakRichTextControlType.BOLD,
            OakRichTextControlType.ITALIC,
            OakRichTextControlType.UNDERLINE,
            OakRichTextControlType.STRIKE,
            OakRichTextControlType.FONT_SIZE,
          ]}
          handleChange={handleChange}
          handleFocus={handleFocus}
        />
      </div>
    </div>
  );
};

export default OakEditorParagraph;
