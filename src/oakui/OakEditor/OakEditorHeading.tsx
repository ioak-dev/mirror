import React, { useEffect, useState } from 'react';
import './OakEditorHeading.scss';
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
const OakEditorHeading = (props: Props) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    OakEditorFocusedEvent.asObservable().subscribe((item) => {
      console.log(item, props.groupId, props.block.id);
      if (item.groupId === props.groupId) {
        setEditing(item.id === props.block.id);
      }
    });
  }, []);

  const handleFocus = () => {
    OakEditorFocusedEvent.next({
      groupId: props.groupId,
      id: props.block.id,
    });
  };

  const handleChange = (event: any) => {
    const _newData = { ...props.block.data, text: event.currentTarget.value };
    props.handleChange(_newData);
  };

  return (
    <div className="oak-editor-heading">
      <input
        className={`oak-editor-heading__input oak-editor-heading__input--level-${
          props.block.data.level || 1
        } ${editing ? 'oak-editor-heading__input--editing' : ''}`}
        placeholder="..."
        value={props.block.data.text}
        onFocus={handleFocus}
        onChange={handleChange}
      />
    </div>
  );
};

export default OakEditorHeading;
