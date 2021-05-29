import React, { useState } from 'react';
import './style.scss';
import SingleSectionEditor from './sitebuilder/editor/SingleSectionEditor';
import { newId } from './utils/BasicUtil';

import './Hero.scss';
import SplitSectionEditor from './sitebuilder/editor/SplitSectionEditor';
import OakViewer from '../oakui/OakViewer';
import { toHtml } from './sitebuilder/SitebuilderService';
import SectionType from './sitebuilder/builder/SectionType';
import SplitContentEditor from './sitebuilder/editor/SplitContentEditor';
import GridSectionEditor from './sitebuilder/editor/GridSectionEditor';

interface Props {
  history?: any;
}

const Elements = (props: Props) => {
  const [richTextEditorValue, setRichTextEditorValue] = useState('Test');
  const [content, setContent] = useState<any[]>([
    {
      id: newId(),
      type: SectionType.SINGLE_SECTION,
      height: 'full',
      position: 'center',
      content: [],
      background: {
        source: 'UNSPLASH',
        data: {
          urls: {
            regular:
              'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw0fHxiYWxsZXR8ZW58MHwwfHx8MTYyMTMzODkyNA&ixlib=rb-1.2.1&q=80&w=1080',
          },
        },
        meta: {
          overlay: 'low',
        },
      },
    },
    {
      id: newId(),
      type: SectionType.SPLIT_SECTION,
      position: 'center',
      proportion: 0,
      left: {
        height: 'medium',
        content: [],
        position: 'center',
        background: {
          source: 'UNSPLASH',
          data: {
            urls: {
              regular:
                'https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw3fHxuYXR1cmV8ZW58MHwwfHx8MTYyMTc1Mzc4Ng&ixlib=rb-1.2.1&q=80&w=1080',
            },
          },
          meta: {
            overlay: 'low',
          },
        },
      },
      right: {
        height: 'medium',
        content: [],
        position: 'center',
        background: {
          source: 'SOLID-COLOR',
          data: {
            color: 'default',
          },
          meta: {
            overlay: 'low',
          },
        },
      },
    },
    {
      id: newId(),
      type: SectionType.SPLIT_CONTENT,
      position: 'center',
      proportion: 0,
      background: {
        source: 'UNSPLASH',
        data: {
          urls: {
            regular:
              'https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw3fHxuYXR1cmV8ZW58MHwwfHx8MTYyMTc1Mzc4Ng&ixlib=rb-1.2.1&q=80&w=1080',
          },
        },
        meta: {
          overlay: 'low',
        },
      },
      left: {
        content: [],
        position: 'center',
        height: 'medium',
      },
      right: {
        content: [],
        position: 'center',
        height: 'medium',
      },
    },
    {
      id: newId(),
      type: SectionType.GRID_SECTION,
      height: 'full',
      position: 'center',
      item: [
        {
          id: newId(),
          content: [],
        },
      ],
      background: {
        source: 'UNSPLASH',
        data: {
          urls: {
            regular:
              'https://images.unsplash.com/photo-1516737488405-7b6d6868fad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjk0OTh8MHwxfHNlYXJjaHw0fHxiYWxsZXR8ZW58MHwwfHx8MTYyMTMzODkyNA&ixlib=rb-1.2.1&q=80&w=1080',
          },
        },
        meta: {
          overlay: 'low',
        },
      },
    },
  ]);
  const handleRichTextEditorValueChange = (value: any) => {
    setRichTextEditorValue(value);
  };

  const submit = () => {
    console.log(content);
  };

  const handleChange = (value: any, block: any) => {
    const _content = [...content];
    const index = _content.findIndex((item) => item.id === block.id);
    if (index > -1) {
      _content[index] = value;
    }
    console.log(_content);
    setContent(_content);
  };

  return (
    <div className="elements">
      <div className="content-editor-demo">
        <GridSectionEditor
          value={content[3]}
          handleChange={(value: any) => handleChange(value, content[3])}
        />
        <SplitContentEditor
          value={content[2]}
          handleChange={(value: any) => handleChange(value, content[2])}
        />
        <SingleSectionEditor
          value={content[0]}
          handleChange={(value: any) => handleChange(value, content[0])}
        />
        <SplitSectionEditor
          value={content[1]}
          handleChange={(value: any) => handleChange(value, content[1])}
        />
      </div>
      <div className="content-editor-demo">
        <OakViewer customStyle>{toHtml(content)}</OakViewer>
      </div>
      {/* <div className="content-editor-demo">
        <ContentEditor value={content} handleChange={handleChange} />
        <OakButton handleClick={submit}>Submit</OakButton>
      </div>
      <div className="elements__demo">
        <div
          className={typographyCompose({
            variant: 'h3',
          })}
        >
          Rich text editor
        </div>
        <div className="elements__editor">
          <RichTextEditor
            value={richTextEditorValue}
            placeholder="Placeholder text here"
            handleChange={handleRichTextEditorValueChange}
            controls={[
              RichTextControlType.BOLD,
              RichTextControlType.ITALIC,
              RichTextControlType.UNDERLINE,
              RichTextControlType.STRIKE,
              RichTextControlType.BULLET_LIST,
              RichTextControlType.ORDERED_LIST,
              RichTextControlType.DECREASE_INDENT,
              RichTextControlType.INCREASE_INDENT,
              RichTextControlType.FONT_SIZE,
            ]}
          />
        </div>
      </div> */}
    </div>
  );
};

export default Elements;
