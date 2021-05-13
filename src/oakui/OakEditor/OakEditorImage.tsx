import React, { useEffect, useState } from 'react';
import './OakEditorImage.scss';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';
import OakImageUpload from '../wc/OakImageUpload';

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
const OakEditorImage = (props: Props) => {
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
    <div className="oak-editor-image">
      <div
        className={`oak-editor-image__input ${
          editing ? 'oak-editor-image__input--editing' : ''
        }`}
      >
        <div className="oak-editor-image__input__container">
          <OakImageUpload />
        </div>
      </div>
    </div>
  );
};

export default OakEditorImage;
