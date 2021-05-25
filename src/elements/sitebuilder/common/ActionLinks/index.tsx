import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import OakModal from '../../../../oakui/wc/OakModal';
import OakButton from '../../../../oakui/wc/OakButton';
import { newId } from '../../../utils/BasicUtil';
import './style.scss';
import OakRadio from '../../../../oakui/wc/OakRadio';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakInput from '../../../../oakui/wc/OakInput';
import ActionButton from '../ActionButton';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';

interface Props {
  block: any;
  handleChange: any;
  align: 'left' | 'right' | 'center';
}

const ActionLinks = (props: Props) => {
  const [elementId, setElementId] = useState(newId());
  const [openCommonSetting, setOpenCommonSetting] = useState(false);
  const [groupId, setGroupId] = useState<any>(newId());
  const [action, setAction] = useState<any>(null);
  const handleClick = (_action: any) => {
    // if (props.edit) {
    setAction(_action);
    // }
  };

  const addNew = () => {
    const _block = { ...props.block };
    _block.data.items = [
      ..._block.data.items,
      {
        id: newId(),
        label: 'label new',
        link: 'url',
      },
    ];
    props.handleChange(_block);
  };

  const handleChange = (detail: any) => {
    const _block = { ...props.block };
    const _items = [..._block.data.items];
    const index = _items.findIndex((item) => item.id === action.id);
    _items[index] = { ..._items[index], [detail.name]: detail.value };
    _block.data.items = _items;
    props.handleChange(_block);
  };

  const handleMetaChange = (detail: any) => {
    const _block = { ...props.block };
    _block.meta[detail.name] = detail.value;
    props.handleChange(_block);
  };

  const handleDelete = () => {
    const _block = { ...props.block };
    const _items = _block.data.items.filter(
      (item: any) => item.id !== action.id
    );
    _block.data.items = _items;
    props.handleChange(_block);
    setAction(null);
  };

  return (
    <>
      <div
        className={`elements-site__action elements-site__action--align-${props.align}`}
      >
        {props.block.data.items?.map((item: any) => (
          <ActionButton
            key={item.id}
            handleClick={() => handleClick(item)}
            meta={props.block.meta}
            item={item}
          >
            {item.label}
          </ActionButton>
        ))}
        <OakButton
          variant="outline"
          shape="sharp"
          theme="default"
          handleClick={addNew}
        >
          <FontAwesomeIcon icon={faPlus} />
        </OakButton>
        <OakButton
          variant="outline"
          shape="sharp"
          theme="default"
          handleClick={() => setOpenCommonSetting(true)}
        >
          <FontAwesomeIcon icon={faCog} />
        </OakButton>
      </div>
      {/* {props.edit && ( */}
      <OakModal
        isOpen={action}
        handleClose={() => setAction(null)}
        heading="Edit action"
      >
        {action && (
          <div slot="body">
            <OakInput
              name="label"
              value={action.label}
              shape="sharp"
              handleInput={handleChange}
              label="Label"
              gutterBottom
            />
            <OakInput
              name="url"
              value={action.url}
              shape="sharp"
              handleInput={handleChange}
              label="URL"
              gutterBottom
            />
            <OakRadioGroup
              name="color"
              radioGroupName={`color-${groupId}`}
              value={action.color}
              label="Color"
              handleChange={handleChange}
              gutterBottom
            >
              <OakRadio name="default" radioGroupName={`color-${groupId}`}>
                Default
              </OakRadio>
              <OakRadio name="primary" radioGroupName={`color-${groupId}`}>
                Primary
              </OakRadio>
              <OakRadio name="secondary" radioGroupName={`color-${groupId}`}>
                Secondary
              </OakRadio>
              <OakRadio name="custom" radioGroupName={`color-${groupId}`}>
                Custom
              </OakRadio>
            </OakRadioGroup>
            {action.color === 'custom' && (
              <OakInput
                type="color"
                name="hex"
                value={action.hex}
                shape="sharp"
                handleInput={handleChange}
                label="Custom color"
                gutterBottom
              />
            )}
            <OakRadioGroup
              name="variant"
              radioGroupName={`variant-${groupId}`}
              value={action.variant}
              label="Variation"
              handleChange={handleChange}
              gutterBottom
            >
              <OakRadio name="regular" radioGroupName={`variant-${groupId}`}>
                Regular
              </OakRadio>
              <OakRadio name="appear" radioGroupName={`variant-${groupId}`}>
                Background appears on hover
              </OakRadio>
              <OakRadio name="disappear" radioGroupName={`variant-${groupId}`}>
                Background disappears on hover
              </OakRadio>
            </OakRadioGroup>
            <OakCheckbox
              name="rounded"
              value={props.block.meta.rounded}
              handleChange={handleMetaChange}
              gutterBottom
            >
              Rounded
            </OakCheckbox>
            <OakButton shape="sharp" theme="danger" handleClick={handleDelete}>
              Delete
            </OakButton>
          </div>
        )}
      </OakModal>
      <OakModal
        isOpen={openCommonSetting}
        handleClose={() => setOpenCommonSetting(false)}
        heading="Action settings"
      >
        {props.block && (
          <div slot="body">
            <OakRadioGroup
              name="size"
              radioGroupName={`size-${groupId}`}
              value={props.block.meta.size}
              label="Size"
              handleChange={handleMetaChange}
              gutterBottom
            >
              <OakRadio name="small" radioGroupName={`size-${groupId}`}>
                Small
              </OakRadio>
              <OakRadio name="medium" radioGroupName={`size-${groupId}`}>
                Medium
              </OakRadio>
              <OakRadio name="large" radioGroupName={`size-${groupId}`}>
                Large
              </OakRadio>
            </OakRadioGroup>
            <OakCheckbox
              name="rounded"
              value={props.block.meta.rounded}
              handleChange={handleMetaChange}
              gutterBottom
            >
              Rounded
            </OakCheckbox>
          </div>
        )}
      </OakModal>
    </>
  );
};

export default ActionLinks;
