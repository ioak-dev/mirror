import React, { useState } from 'react';
import './ActionSection.scss';
import OakButton from '../../../../oakui/wc/OakButton';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import { newId } from '../../../../events/MessageService';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakEditorBlockType from '../../../../oakui/OakEditor/types/OakEditorBlockType';
import OakInput from '../../../../oakui/wc/OakInput';
import OakSelect from '../../../../oakui/wc/OakSelect';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';

interface Props {
  action: any[];
  handleChange: any;
}

const ActionSection = (props: Props) => {
  const addAction = () => {
    const _action = [...props.action];
    _action.push({
      id: newId(),
      label: '',
      color: 'default',
      action: '',
      href: '',
      tab: false,
    });
    props.handleChange(_action);
  };

  const handleChange = (detail: any, inputAction: any) => {
    const _action = [...props.action];
    const index = _action.findIndex((item) => item.id === inputAction.id);
    _action[index] = { ..._action[index], [detail.name]: detail.value };
    props.handleChange(_action);
  };

  return (
    <div className="action-section-conf">
      <OakButton
        shape="sharp"
        theme="default"
        variant="appear"
        handleClick={addAction}
      >
        Add action
      </OakButton>
      <div className="action-section-conf__item__root">
        {props.action.map((action) => (
          <div className="action-section-conf__item oak-bg-surface">
            <OakInput
              name="label"
              label="Label"
              value={action.label}
              shape="underline"
              handleInput={(detail: any) => handleChange(detail, action)}
              gutterBottom
            />
            <OakSelect
              name="color"
              label="Color"
              value={action.color}
              shape="underline"
              optionsAsKeyValue={[
                { id: 'default', value: 'Default' },
                { id: 'primary', value: 'Primary' },
                { id: 'secondary', value: 'Secondary' },
              ]}
              handleInput={(detail: any) => handleChange(detail, action)}
              gutterBottom
            />
            <OakSelect
              name="action"
              label="Action"
              value={action.action}
              shape="underline"
              optionsAsKeyValue={[
                { id: 'articleList', value: 'Article list' },
                { id: 'newArticle', value: 'New article' },
                { id: 'custom', value: 'Custom URL' },
              ]}
              handleInput={(detail: any) => handleChange(detail, action)}
              gutterBottom
            />
            {action.action === 'custom' && (
              <OakInput
                name="href"
                label="Target URL"
                value={action.href}
                shape="underline"
                handleInput={(detail: any) => handleChange(detail, action)}
                gutterBottom
              />
            )}
            {action.action === 'custom' && (
              <OakCheckbox
                name="tab"
                value={action.tab}
                handleChange={(detail: any) => handleChange(detail, action)}
                gutterBottom
              >
                Open in new tab
              </OakCheckbox>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionSection;
