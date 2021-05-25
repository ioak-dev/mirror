import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
// import {} from 'lod';
import { newId } from '../../../events/MessageService';
import ActionButton from '../common/ActionButton';
import BlockType from './BlockType';
import { ScrollToBlockCommand } from '../events/ScrollToBlockCommand';
import ParagraphSection from '../section/ParagraphSection';
import NavigationActionType from '../section/NavigationActionType';
import ListSection from '../section/ListSection';
import UnsplashSection from '../section/UnsplashSection';
import NewSection from '../section/NewSection';
import HeadingSection from '../section/HeadingSection';
import OakButton from '../../../oakui/wc/OakButton';
// import { ScrollToBlockCommand } from './types/ScrollToBlockCommand';

interface Props {
  value: any[];
  handleChange: any;
  fixed?: boolean;
}

const ContentEditor = (props: Props) => {
  // const [navigationActions, setNavigationActions] = useState<
  //   NavigationActionType[]
  // >([]);
  // const [navigationActionsFirst, setNavigationActionsFirst] = useState<
  //   NavigationActionType[]
  // >([]);
  // const [navigationActionsLast, setNavigationActionsLast] = useState<
  //   NavigationActionType[]
  // >([]);
  // const [navigationActionsOnlyOne, setNavigationActionsOnlyOne] = useState<
  //   NavigationActionType[]
  // >([]);

  // useEffect(() => {
  //   if (props.fixed) {
  //     setNavigationActions([]);
  //     setNavigationActionsFirst([]);
  //     setNavigationActionsLast([]);
  //   } else {
  //     setNavigationActions([
  //       NavigationActionType.UP,
  //       NavigationActionType.DOWN,
  //       NavigationActionType.NEW,
  //       NavigationActionType.DELETE,
  //     ]);
  //     setNavigationActionsFirst([
  //       NavigationActionType.DOWN,
  //       NavigationActionType.NEW,
  //       NavigationActionType.DELETE,
  //     ]);
  //     setNavigationActionsLast([
  //       NavigationActionType.UP,
  //       NavigationActionType.NEW,
  //       NavigationActionType.DELETE,
  //     ]);
  //   }
  // }, [props.fixed]);

  const supportedTypes = [
    { value: BlockType.PARAGRAPH, label: 'Paragraph' },
    { value: BlockType.HEADING, label: 'Heading' },
    { value: BlockType.LIST, label: 'List' },
    { value: BlockType.IMAGE, label: 'Image' },
    { value: BlockType.UNSPLASH, label: 'Stock image from Unsplash' },
    { value: BlockType.PLAIN_TEXT, label: 'Plain text' },
    { value: BlockType.HTML, label: 'Raw HTML' },
    { value: BlockType.MARKDOWN, label: 'Markdown' },
  ];
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
    props.handleChange(_data);
  };

  const setBlockType = (block: any, type: BlockType) => {
    console.log(block, type);
    const _data = [...dataRef.current];
    _data.forEach((item) => {
      if (item.id === block.id) {
        item.data = getNewBlock(type).data;
        item.type = type;
      }
    });
    props.handleChange(_data);
  };

  const handleNavigation = (block: any, type: NavigationActionType) => {
    switch (type) {
      case NavigationActionType.UP:
        moveUp(block);
        break;
      case NavigationActionType.DOWN:
        moveDown(block);
        break;
      case NavigationActionType.NEW:
        add(block);
        break;
      case NavigationActionType.DELETE:
        remove(block);
        break;

      default:
        break;
    }
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

  const addBlockToEnd = (blockType: BlockType) => {
    const _data: any[] = dataRef.current ? [...dataRef.current] : [];
    _data.push(getNewBlock(blockType));
    props.handleChange(_data);
  };

  const getNewBlock = (blockType?: BlockType) => {
    switch (blockType) {
      case BlockType.PARAGRAPH:
        return {
          id: newId(),
          type: blockType,
          data: {
            text: '',
          },
        };
      case BlockType.HEADING:
        return {
          id: newId(),
          type: blockType,
          data: {
            level: 1,
            text: '',
          },
        };
      case BlockType.LIST:
        return {
          id: newId(),
          type: blockType,
          data: {
            text: '<ul><li> </li></ul>',
          },
        };
      case BlockType.UNSPLASH:
        return {
          id: newId(),
          type: blockType,
          data: {
            text: '',
            position: 'center',
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

  const _getNavigationActions = (index: number) => {
    if (props.fixed) {
      return [];
    }
    
    if (index === 0 && dataRef?.current?.length === 1) {
      return [NavigationActionType.NEW, NavigationActionType.DELETE];
    }

    if (index === 0) {
      return [
        NavigationActionType.DOWN,
        NavigationActionType.NEW,
        NavigationActionType.DELETE,
      ];
    }

    if (index === dataRef?.current?.length - 1) {
      return [
        NavigationActionType.UP,
        NavigationActionType.NEW,
        NavigationActionType.DELETE,
      ];
    }

    return [
      NavigationActionType.UP,
      NavigationActionType.DOWN,
      NavigationActionType.NEW,
      NavigationActionType.DELETE,
    ];
  };

  return (
    <div className="content-editor">
      {dataRef?.current?.map((block: any, index: number) => (
        <div key={block.id}>
          {!block.type && (
            <NewSection
              navigationActions={_getNavigationActions(index)}
              supportedTypes={supportedTypes}
              block={block}
              groupId={groupId}
              handleNavigation={(type: NavigationActionType) =>
                handleNavigation(block, type)
              }
              handleChange={(type: BlockType) => setBlockType(block, type)}
            />
          )}
          {block.type === BlockType.PARAGRAPH && (
            <ParagraphSection
              navigationActions={_getNavigationActions(index)}
              value={block}
              placeholder="Add content"
              handleNavigation={(type: NavigationActionType) =>
                handleNavigation(block, type)
              }
              handleChange={(value: any) => handleChange(block, value)}
            />
          )}
          {block.type === BlockType.HEADING && (
            <HeadingSection
              navigationActions={_getNavigationActions(index)}
              value={block}
              placeholder="Add content"
              handleNavigation={(type: NavigationActionType) =>
                handleNavigation(block, type)
              }
              handleChange={(value: any) => handleChange(block, value)}
              fixed={props.fixed}
            />
          )}
          {block.type === BlockType.LIST && (
            <ListSection
              navigationActions={_getNavigationActions(index)}
              value={block}
              placeholder="Create list items"
              handleNavigation={(type: NavigationActionType) =>
                handleNavigation(block, type)
              }
              handleChange={(value: any) => handleChange(block, value)}
            />
          )}
          {block.type === BlockType.UNSPLASH && (
            <UnsplashSection
              navigationActions={_getNavigationActions(index)}
              value={block}
              placeholder="Add content"
              handleNavigation={(type: NavigationActionType) =>
                handleNavigation(block, type)
              }
              handleChange={(value: any) => handleChange(block, value)}
              fixed={props.fixed}
            />
          )}
        </div>
        // <OakEditorBlock
        //   outline={props.outline}
        //   groupId={groupId}
        //   key={block.id}
        //   block={block}
        //   handleChange={(text: any) => handleChange(block, text)}
        //   setBlockType={(type: BlockType) => setBlockType(block, type)}
        //   add={() => add(block)}
        //   remove={() => remove(block)}
        //   moveUp={() => moveUp(block)}
        //   moveDown={() => moveDown(block)}
        //   fixed={props.fixed}
        // />
      ))}
      {!props.fixed && (!dataRef?.current || dataRef?.current?.length === 0) && (
        // <ActionButton handleClick={add}>Add section</ActionButton>
        <OakButton shape="sharp" theme="default" handleClick={add}>
          Add section
        </OakButton>
      )}
    </div>
  );
};

export default ContentEditor;
