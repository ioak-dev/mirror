import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ContentFrameItemDataType,
  OverlapSectionEditor,
  SectionType,
  SingleSectionEditor,
  SplitContentEditor,
  SplitSectionEditor,
} from 'elements';

import OakViewer from '../../oakui/OakViewer';
import './Elements.scss';

interface Props {
  history?: any;
}

const newId = () => {
  return `uid-${uuidv4()}`;
};

const Elements = (props: Props) => {
  const [richTextEditorValue, setRichTextEditorValue] = useState('Test');
  const [content, setContent] = useState<any[]>([
    {
      id: newId(),
      type: SectionType.SINGLE_SECTION,
      height: 'full',
      verticalPosition: 'middle',
      layout: '',
      gap: 'small',
      content: {
        meta: {},
        items: [
          {
            id: newId(),
            meta: {
              verticalPosition: 'top',
              horizontalPosition: 'left',
              verticalPadding: 'small',
              horizontalPadding: 'small',
              color: 'none',
              hex: null,
            },
            items: [
              {
                id: newId(),
                type: ContentFrameItemDataType.TEXT,
                data: {
                  text: 'Lorem ipsum',
                },
                meta: {
                  elementType: 'body',
                  fontsize: 'medium',
                },
              },
            ],
          },
        ],
      },
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
      proportion: 0,
      height: 'full',
      left: {
        verticalPosition: 'middle',
        layout: '',
        gap: 'small',
        content: {
          meta: {},
          items: [
            {
              id: newId(),
              meta: {
                verticalPosition: 'top',
                horizontalPosition: 'left',
                verticalPadding: 'small',
                horizontalPadding: 'small',
                color: 'none',
                hex: null,
              },
              items: [
                {
                  id: newId(),
                  type: ContentFrameItemDataType.TEXT,
                  data: {
                    text: 'Lorem ipsum',
                  },
                  meta: {
                    elementType: 'body',
                    fontsize: 'medium',
                  },
                },
              ],
            },
          ],
        },
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
      right: {
        verticalPosition: 'middle',
        layout: '',
        gap: 'small',
        content: {
          meta: {},
          items: [
            {
              id: newId(),
              meta: {
                verticalPosition: 'top',
                horizontalPosition: 'left',
                verticalPadding: 'small',
                horizontalPadding: 'small',
                color: 'none',
                hex: null,
              },
              items: [
                {
                  id: newId(),
                  type: ContentFrameItemDataType.TEXT,
                  data: {
                    text: 'Lorem ipsum',
                  },
                  meta: {
                    elementType: 'body',
                    fontsize: 'medium',
                  },
                },
              ],
            },
          ],
        },
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
    },
    {
      id: newId(),
      type: SectionType.SPLIT_CONTENT,
      proportion: 1,
      height: 'large',
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
        verticalPosition: 'middle',
        layout: '',
        gap: 'small',
        content: {
          meta: {},
          items: [
            {
              id: newId(),
              meta: {
                verticalPosition: 'top',
                horizontalPosition: 'left',
                verticalPadding: 'small',
                horizontalPadding: 'small',
                color: 'none',
                hex: null,
              },
              items: [
                {
                  id: newId(),
                  type: ContentFrameItemDataType.TEXT,
                  data: {
                    text: 'Lorem ipsum',
                  },
                  meta: {
                    elementType: 'body',
                    fontsize: 'medium',
                  },
                },
              ],
            },
          ],
        },
      },
      right: {
        verticalPosition: 'middle',
        layout: '',
        gap: 'small',
        content: {
          meta: {},
          items: [
            {
              id: newId(),
              meta: {
                verticalPosition: 'top',
                horizontalPosition: 'left',
                verticalPadding: 'small',
                horizontalPadding: 'small',
                color: 'none',
                hex: null,
              },
              items: [
                {
                  id: newId(),
                  type: ContentFrameItemDataType.TEXT,
                  data: {
                    text: 'Lorem ipsum',
                  },
                  meta: {
                    elementType: 'body',
                    fontsize: 'medium',
                  },
                },
              ],
            },
          ],
        },
      },
    },
    {
      id: newId(),
      type: SectionType.OVERLAP_SECTION,
      backgroundSection: {
        type: SectionType.SINGLE_SECTION,
        height: 'medium',
        verticalPosition: 'middle',
        layout: '',
        gap: 'small',
        content: {
          meta: {},
          items: [
            {
              id: newId(),
              meta: {
                verticalPosition: 'top',
                horizontalPosition: 'left',
                verticalPadding: 'small',
                horizontalPadding: 'small',
                color: 'none',
                hex: null,
              },
              items: [
                {
                  id: newId(),
                  type: ContentFrameItemDataType.TEXT,
                  data: {
                    text: 'Lorem ipsum',
                  },
                  meta: {
                    elementType: 'body',
                    fontsize: 'medium',
                  },
                },
              ],
            },
          ],
        },
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
      foregroundSection: {
        type: SectionType.SINGLE_SECTION,
        height: 'medium',
        verticalPosition: 'middle',
        layout: '',
        gap: 'small',
        content: {
          meta: {},
          items: [
            {
              id: newId(),
              meta: {
                verticalPosition: 'top',
                horizontalPosition: 'left',
                verticalPadding: 'small',
                horizontalPadding: 'small',
                color: 'none',
                hex: null,
              },
              items: [
                {
                  id: newId(),
                  type: ContentFrameItemDataType.TEXT,
                  data: {
                    text: 'Lorem ipsum',
                  },
                  meta: {
                    elementType: 'body',
                    fontsize: 'medium',
                  },
                },
              ],
            },
          ],
        },
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
        <SingleSectionEditor
          value={content[0]}
          handleChange={(value: any) => handleChange(value, content[0])}
        />
        <OverlapSectionEditor
          value={content[3]}
          handleChange={(value: any) => handleChange(value, content[3])}
        />
        <SplitSectionEditor
          value={content[1]}
          handleChange={(value: any) => handleChange(value, content[1])}
        />
        <SplitContentEditor
          value={content[2]}
          handleChange={(value: any) => handleChange(value, content[2])}
        />
        {/* <GridSectionEditor
          value={content[3]}
          handleChange={(value: any) => handleChange(value, content[3])}
        />
        <SplitContentEditor
          value={content[2]}
          handleChange={(value: any) => handleChange(value, content[2])}
        /> */}
      </div>
      {/* <div className="content-editor-demo">
        <OakViewer customStyle>{toHtml(content)}</OakViewer>
      </div> */}
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
