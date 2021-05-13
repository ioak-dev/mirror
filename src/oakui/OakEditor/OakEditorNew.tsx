import React, { useEffect, useState } from 'react';
import './OakEditorNew.scss';
import OakRichTextControlType from './types/OakRichTextControlType';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';
import OakEditorRichText from './OakEditorRichText';
import OakRadioGroup from '../wc/OakRadioGroup';
import OakRadio from '../wc/OakRadio';
import { newId } from '../../events/MessageService';
import OakEditorBlockType from './types/OakEditorBlockType';
import {
  ScrollToBlockCommand,
  ScrollToBlockCommandType,
} from './types/ScrollToBlockCommand';
import { OakEditorBlock } from './types/OakEditorBlock';

interface Props {
  groupId: string;
  block: any;
  setBlockType: any;
  remove?: any;
  fixed?: boolean;
  outline?: boolean;
  supportedTypes?: OakEditorBlockType[];
}
const OakEditorNew = (props: Props) => {
  const [editing, setEditing] = useState(false);

  const handleFocus = (isFocused: boolean) => {
    if (isFocused) {
      OakEditorFocusedEvent.next({
        groupId: props.groupId,
        id: props.block.id,
      });
    }
  };

  const handleChange = (detail: any) => {
    props.setBlockType(detail.value);
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className="oak-editor-new">
      <div
        className={`oak-editor-new__input ${
          editing ? 'oak-editor-new__input--editing' : ''
        }`}
      >
        <OakRadioGroup
          radioGroupName={groupId}
          name="type"
          value={props.block.type}
          handleChange={handleChange}
        >
          {(!props.supportedTypes ||
            props.supportedTypes.includes(OakEditorBlockType.HEADING)) && (
            <OakRadio
              radioGroupName={groupId}
              name={OakEditorBlockType.HEADING}
            >
              Heading
            </OakRadio>
          )}
          {(!props.supportedTypes ||
            props.supportedTypes.includes(OakEditorBlockType.PARAGRAPH)) && (
            <OakRadio
              radioGroupName={groupId}
              name={OakEditorBlockType.PARAGRAPH}
            >
              Paragraph
            </OakRadio>
          )}
          {(!props.supportedTypes ||
            props.supportedTypes.includes(OakEditorBlockType.LIST)) && (
            <OakRadio radioGroupName={groupId} name={OakEditorBlockType.LIST}>
              List
            </OakRadio>
          )}
          {(!props.supportedTypes ||
            props.supportedTypes.includes(OakEditorBlockType.IMAGE)) && (
            <OakRadio radioGroupName={groupId} name={OakEditorBlockType.IMAGE}>
              Image
            </OakRadio>
          )}
          {(!props.supportedTypes ||
            props.supportedTypes.includes(OakEditorBlockType.UNSPLASH)) && (
            <OakRadio
              radioGroupName={groupId}
              name={OakEditorBlockType.UNSPLASH}
            >
              Stock Image from Unsplash
            </OakRadio>
          )}
          {(!props.supportedTypes ||
            props.supportedTypes.includes(OakEditorBlockType.MARKDOWN)) && (
            <OakRadio
              radioGroupName={groupId}
              name={OakEditorBlockType.MARKDOWN}
            >
              Markdown
            </OakRadio>
          )}
          {(!props.supportedTypes ||
            props.supportedTypes.includes(OakEditorBlockType.HTML)) && (
            <OakRadio radioGroupName={groupId} name={OakEditorBlockType.HTML}>
              Raw Html
            </OakRadio>
          )}
        </OakRadioGroup>
      </div>
    </div>
  );
};

export default OakEditorNew;
