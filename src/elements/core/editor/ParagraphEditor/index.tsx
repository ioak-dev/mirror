import React, { useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import RichTextControlType from '../RichTextEditor/RichTextControlType';
import './style.scss';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const ParagraphEditor = (props: Props) => {
  const handleChange = (text: string) => {
    const _newData = { ...props.value.data, text };
    props.handleChange(_newData);
  };

  return (
    <div className="paragraph-editor">
      <RichTextEditor
        value={props.value.data.text}
        placeholder={props.placeholder}
        controls={[
          RichTextControlType.BOLD,
          RichTextControlType.ITALIC,
          RichTextControlType.UNDERLINE,
          RichTextControlType.STRIKE,
          RichTextControlType.FONT_SIZE,
        ]}
        handleChange={handleChange}
      />
    </div>
  );
};

export default ParagraphEditor;
