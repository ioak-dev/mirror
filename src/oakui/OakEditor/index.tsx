import React, { useEffect, useRef, useState } from 'react';
import OakEditorBlock from './OakEditorBlock';
import './style.scss';
// import {} from 'lod';
import OakButton from '../wc/OakButton';
import { newId } from '../../events/MessageService';
import OakEditorBlockType from './types/OakEditorBlockType';
import OakEditorBlockTypeToolbar from './toolbar/OakEditorBlockTypeToolbar';
import OakEditorToolbarButton from './toolbar/OakEditorToolbarButton';
import { ScrollToBlockCommand } from './types/ScrollToBlockCommand';

interface Props {
  value: any[];
  handleChange: any;
  fixed?: boolean;
  outline?: boolean;
}

const OakEditor = (props: Props) => {
  const [data, _setData] = useState<any>();
  const [groupId, setGroupId] = useState<any>(newId());

  const dataRef = useRef(data);
  const setData = (val: any) => {
    dataRef.current = val;
    _setData(val);
  };

  useEffect(() => {
    if (props.value) {
      setData(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.value) {
      setData(props.value);
    }
  }, []);

  const handleChange = (block: any, newData: any) => {
    const _data = [...dataRef.current];
    _data.forEach((item) => {
      if (item.id === block.id) {
        item.data = newData;
      }
    });
    // _data[index].data.text = text;
    console.log('****', _data);
    props.handleChange(_data);
    // setData(_data);
  };

  const setBlockType = (block: any, type: OakEditorBlockType) => {
    const _data = [...dataRef.current];
    _data.forEach((item) => {
      if (item.id === block.id) {
        item.type = type;
      }
    });
    props.handleChange(_data);
  };

  const moveDown = (block: any) => {
    const _data: any[] = [...dataRef.current];
    const index = _data.findIndex((item) => item.id === block.id);
    arraymove(_data, index, index + 1);
    props.handleChange(_data);
  };

  const moveUp = (block: any) => {
    console.log(block);
    const _data: any[] = [...dataRef.current];
    const index = _data.findIndex((item) => item.id === block.id);
    arraymove(_data, index, index - 1);
    props.handleChange(_data);
  };

  const add = (block?: any) => {
    // if (!dataRef.current || !block) {
    //   addBlockToEnd(blockType);
    //   return;
    // }
    const _data: any[] = [...dataRef.current];
    const index = _data.findIndex((item) => item.id === block.id);
    const newBlock = getNewBlock();
    _data.splice(index + 1, 0, newBlock);
    props.handleChange(_data);
    ScrollToBlockCommand.next({ blockId: newBlock.id });
  };

  const addBlockToEnd = (blockType: OakEditorBlockType) => {
    const _data: any[] = dataRef.current ? [...dataRef.current] : [];
    _data.push(getNewBlock(blockType));
    props.handleChange(_data);
  };

  const getNewBlock = (blockType?: OakEditorBlockType) => {
    switch (blockType) {
      case OakEditorBlockType.PARAGRAPH:
        return {
          id: newId(),
          type: blockType,
          data: {
            text: '',
          },
        };
      case OakEditorBlockType.HEADING:
        return {
          id: newId(),
          type: blockType,
          data: {
            level: 1,
            text: '',
          },
        };
      case OakEditorBlockType.LIST:
        return {
          id: newId(),
          type: blockType,
          data: {
            text: '<ul><li> </li></ul>',
          },
        };

      default:
        return {
          id: newId(),
          type: blockType,
          data: {
            text: '',
          },
        };
    }
  };

  const remove = (block: any) => {
    const _data: any[] = [...dataRef.current];
    const index = _data.findIndex((item) => item.id === block.id);
    _data.splice(index, 1);
    props.handleChange(_data);
  };

  const arraymove = (arr: any[], fromIndex: number, toIndex: number) => {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  };

  return (
    <div className="oak-editor">
      {dataRef?.current?.map((block: any, index: number) => (
        <OakEditorBlock
          outline={props.outline}
          groupId={groupId}
          key={block.id}
          block={block}
          handleChange={(text: any) => handleChange(block, text)}
          setBlockType={(type: OakEditorBlockType) => setBlockType(block, type)}
          add={() => add(block)}
          remove={() => remove(block)}
          moveUp={() => moveUp(block)}
          moveDown={() => moveDown(block)}
          fixed={props.fixed}
        />
      ))}
      {(!dataRef?.current || dataRef?.current?.length === 0) && (
        <OakButton shape="sharp" theme="default" handleClick={add}>
          Add section
        </OakButton>
      )}
    </div>
  );
};

export default OakEditor;
