import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const HeadingEditor = (props: Props) => {
  const handleChange = (event: any) => {
    const _newData = { ...props.value.data, text: event.currentTarget.value };
    props.handleChange(_newData);
  };

  return (
    <div className="heading-editor">
      <input
        className={`heading-editor__input heading-editor__input--level-${
          props.value.data.level || 1
        }`}
        placeholder={props.placeholder}
        value={props.value.data.text}
        onChange={handleChange}
      />
    </div>
  );
};

export default HeadingEditor;
