import React, { useEffect, useRef, useState } from 'react';
import { createPopper } from '@popperjs/core';

import './style.scss';
import RichTextControlType from '../RichTextEditor/RichTextControlType';
import { newId } from '../../../utils/BasicUtil';
import OakButton from '../../../../oakui/wc/OakButton';

interface Props {
  toolbar?: boolean;
  onDemandDataRefreshEvent?: boolean;
  value: any;
  handleChange: any;
  controls: RichTextControlType[];
  placeholder?: string;
}
const TrialEditor = (props: Props) => {
  const id = `id-${newId()}`;
  const [showBlockbar, setShowBlockbar] = useState(false);
  const editableEl: any = useRef(null);
  const popperVirtualEl: any = useRef(null);
  const popperInstance: any = useRef(null);

  useEffect(() => {
    const el = document.getElementById(id);
    const popperEl = document.getElementById('popper-instance');
    if (el && popperEl) {
      editableEl.current = el;
      popperVirtualEl.current = {
        getBoundingClientRect: generateGetBoundingClientRect(),
      };
      popperInstance.current = createPopper(popperVirtualEl.current, popperEl, {
        strategy: 'fixed',
      });
      el.addEventListener('keyup', function (event) {
        openBlockbar();
        props.handleChange(el.innerHTML);
      });
      el.addEventListener('mouseup', function (event) {
        openBlockbar();
        // console.log(event, window.getSelection()?.toString());
      });
    }
  }, []);

  const makeHtml = (tag: string) => {
    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      //   console.log(
      //     window.getSelection()?.anchorNode,
      //     window.getSelection()?.focusNode,
      //     window.getSelection()?.anchorNode?.nextSibling,
      //     window.getSelection()?.anchorNode?.nodeValue
      //   );
      if (tag === 'li') {
        console.log(
          window.getSelection()?.anchorNode?.nodeType,
          window.getSelection()?.anchorNode?.nodeName,
          window.getSelection()?.anchorNode?.parentElement,
          window.getSelection()?.anchorNode?.parentNode,
          range.commonAncestorContainer
        );
        const oldContent = document.createTextNode(
          window.getSelection()?.anchorNode?.nodeValue || ''
        );
        const newElement = document.createElement(tag);
        newElement.append(oldContent);
        range.deleteContents();
        range.insertNode(newElement);
      } else {
        const oldContent = document.createTextNode(range.toString());
        const newElement = document.createElement(tag);
        newElement.append(oldContent);
        range.deleteContents();
        range.insertNode(newElement);
      }
      props.handleChange(editableEl.current.innerHTML);
      setShowBlockbar(false);

      setTimeout(() => {
        document.getElementById(id)?.focus();
      }, 100);
    }
  };

  const openBlockbar = () => {
    const range = window.getSelection()?.getRangeAt(0);
    if (range?.toString()) {
      if (!showBlockbar) {
        setShowBlockbar(true);
      }
      const boundingClientRect = range?.getBoundingClientRect();
      popperVirtualEl.current.getBoundingClientRect = generateGetBoundingClientRect(
        boundingClientRect.x,
        boundingClientRect.y + 40
      );
      popperInstance.current.update();
    } else {
      setShowBlockbar(false);
    }
  };

  const generateGetBoundingClientRect = (x = 0, y = 0) => {
    return () => ({
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    });
  };

  return (
    <div className="trial-editor">
      {/* <div id={id} contentEditable /> */}
      <div id={id} contentEditable />
      {props.value}
      <div id="popper-instance">
        {showBlockbar && (
          <div className="trial-editor__blockbar">
            <div className="trial-editor__action">
              <OakButton
                theme="default"
                size="xsmall"
                handleClick={() => makeHtml('li')}
              >
                UL
              </OakButton>
              <OakButton
                theme="default"
                size="xsmall"
                handleClick={() => makeHtml('H2')}
              >
                H2
              </OakButton>
              <OakButton
                theme="default"
                size="xsmall"
                handleClick={() => makeHtml('H3')}
              >
                H3
              </OakButton>
              <OakButton
                theme="default"
                size="xsmall"
                handleClick={() => makeHtml('strong')}
              >
                strong
              </OakButton>
              <OakButton
                theme="default"
                size="xsmall"
                handleClick={() => makeHtml('b')}
              >
                Bold
              </OakButton>
              <OakButton
                theme="default"
                size="xsmall"
                handleClick={() => makeHtml('i')}
              >
                Italic
              </OakButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrialEditor;
