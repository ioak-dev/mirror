import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import './style.scss';
import RichTextControlType from './RichTextControlType';
import { newId } from '../../../utils/BasicUtil';

interface Props {
  toolbar?: boolean;
  onDemandDataRefreshEvent?: boolean;
  value: any;
  handleChange: any;
  controls: RichTextControlType[];
  placeholder?: string;
}
const RichTextEditor = (props: Props) => {
  const [quillInstance, setQuillInstance] = useState<any>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (props.value !== null && props.value !== undefined && !quillInstance) {
      init();
    }
  }, [props.value]);

  useEffect(() => {
    if (quillInstance && props.value) {
      const delta = quillInstance.clipboard.convert(props.value);
      quillInstance.setContents(delta, 'silent');
    }
  }, [props.onDemandDataRefreshEvent]);

  const id = `id-${newId()}`;

  const getToolbarOptions = () => {
    const toolbarOptions: any[] = props.controls.map((control) =>
      translateControl(control)
    );
    return toolbarOptions;
  };

  const translateControl = (control: RichTextControlType) => {
    switch (control) {
      case RichTextControlType.BOLD:
        return 'bold';
      case RichTextControlType.ITALIC:
        return 'italic';
      case RichTextControlType.UNDERLINE:
        return 'underline';
      case RichTextControlType.STRIKE:
        return 'strike';
      case RichTextControlType.ORDERED_LIST:
        return { list: 'ordered' };
      case RichTextControlType.BULLET_LIST:
        return { list: 'bullet' };
      case RichTextControlType.DECREASE_INDENT:
        return { indent: '-1' };
      case RichTextControlType.INCREASE_INDENT:
        return { indent: '+1' };
      case RichTextControlType.FONT_SIZE:
        return { size: ['small', false, 'large', 'huge'] };
      default:
        break;
    }
  };

  const init = () => {
    const toolbarOptions = getToolbarOptions();
    const quill: any = new Quill(`#${id}`, {
      theme: props.toolbar ? 'snow' : 'bubble',
      placeholder: props.placeholder,
      modules: {
        toolbar: toolbarOptions?.length > 0 ? toolbarOptions : false,
        keyboard: {
          bindings: {
            tab: {
              key: 9,
              handler: () => {
                return true;
              },
            },
          },
        },
      },
    });
    // quill.root.addEventListener('blur', function () {
    //   console.log('blur');
    //   props.handleChange(quillInstance.root.innerHTML);
    // });
    const delta = quill.clipboard.convert(props.value);
    quill.setContents(delta, 'silent');
    quill.clipboard.addMatcher(
      Node.ELEMENT_NODE,
      function (node: any, delta: any) {
        const plaintext = node.innerText;
        const Delta = Quill.import('delta');
        return new Delta().insert(plaintext);
      }
    );
    setQuillInstance(quill);
  };

  useEffect(() => {
    if (quillInstance) {
      quillListeners();
    }
  }, [quillInstance]);

  const quillListeners = () => {
    quillInstance.on('text-change', function () {
      props.handleChange(quillInstance.root.innerHTML);
    });
    quillInstance.on(
      'selection-change',
      function (range: any, oldRange: any, source: any) {
        setEditing(!!range);
        if (range === null && oldRange !== null) {
          // console.log('manual blur');
          // props.handleChange(quillInstance.root.innerHTML);
        } else if (range !== null && oldRange === null) {
          //
        }
      }
    );
  };

  useEffect(() => {
    if (quillInstance) {
      quillInstance.root.setAttribute('spell-check', editing);
    }
  }, [editing]);

  return (
    <div className="rich-text-editor">
      <div id={id} />
    </div>
  );
};

export default RichTextEditor;
