import React, { useState } from 'react';
import './SiteBuilder.scss';
import OakButton from '../../../oakui/wc/OakButton';
import OakRadioGroup from '../../../oakui/wc/OakRadioGroup';
import { newId } from '../../../events/MessageService';
import OakRadio from '../../../oakui/wc/OakRadio';
import OakEditorBlockType from '../../../oakui/OakEditor/types/OakEditorBlockType';

interface Props {
  addSection: any;
}

const AddSectionPrompt = (props: Props) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const setSectionType = (detail: any) => {
    props.addSection(getNewBlock(detail.name));
    setShowPrompt(false);
  };

  const getNewBlock = (type: string) => {
    console.log(type);
    const id = newId();
    switch (type) {
      case 'CATEGORY':
        return {
          id,
          type,
          heading: '',
          categoryCount: 3,
          articleCount: 3,
          color: 'default',
          rounded: false,
        };
      case 'SPOTLIGHT':
        return {
          id,
          type,
          action: [],
          block: {
            id: newId(),
            type: null,
            supportedTypes: [
              OakEditorBlockType.IMAGE,
              OakEditorBlockType.UNSPLASH,
            ],
            label: 'IMAGE',
            data: {
              position: 'center',
              raw: null,
            },
          },
        };
      case 'FEATURE':
        return {
          id,
          type,
          heading: '',
          fontSize: '',
          textAlign: 'left',
          rounded: false,
          resize: true,
          layout: 'three',
          feature: [],
        };

      default:
        break;
    }
    return {
      id,
      type,
    };
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className="add-section-prompt">
      {!showPrompt && (
        <OakButton
          shape="sharp"
          theme="default"
          handleClick={() => setShowPrompt(true)}
        >
          Add section
        </OakButton>
      )}
      {showPrompt && (
        <OakButton
          shape="sharp"
          theme="default"
          handleClick={() => setShowPrompt(false)}
        >
          Cancel
        </OakButton>
      )}
      {showPrompt && (
        <OakRadioGroup
          radioGroupName={groupId}
          name="type"
          value=""
          handleChange={setSectionType}
        >
          <OakRadio name="CATEGORY">Category section (Dynamic)</OakRadio>
          <OakRadio name="SPOTLIGHT">Spotlight section (Static)</OakRadio>
          <OakRadio name="FEATURE">Feature list section (Static)</OakRadio>
        </OakRadioGroup>
      )}
    </div>
  );
};

export default AddSectionPrompt;
