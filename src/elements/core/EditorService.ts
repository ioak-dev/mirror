/* eslint-disable import/prefer-default-export */

import BlockType from './ContentEditor/BlockType';

export const toHtml = (blocks: any[]) => {
  let result = '';

  blocks.forEach((block) => {
    switch (block.type) {
      case BlockType.HEADING:
        result += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case BlockType.PARAGRAPH:
        result += `${block.data.text}`;
        break;
      case BlockType.LIST:
        result += `${block.data.text}`;
        break;
      case BlockType.UNSPLASH:
        if (block.data.position === 'center') {
          const image = `<img src='${block.data.raw.urls.regular}' alt='${block.data.raw.alt_description}'/>`;
          result += image;
        } else if (
          block.data.position === 'left' ||
          block.data.position === 'right'
        ) {
          // const image = `<img src='${block.data.raw.urls.regular}' alt='${block.data.raw.alt_description}'/>`;
          const image = `<img class='oak-editor-two-column--img-${block.data.position}' src='${block.data.raw.urls.regular}' alt='${block.data.raw.alt_description}'>${block.data.text}</img><div style="clear:both" />`;
          // result += `<div class="oak-editor-two-column">${image}<div>${block.data.text}</div></div>`;
          result += image;
        }
        break;
      default:
        break;
    }
  });

  return result;
};

export const toText = (blocks: any[]) => {
  let result = '';

  blocks.forEach((block) => {
    switch (block.type) {
      case BlockType.HEADING:
        result += `${block.data.text?.replace(/(<([^>]+)>)/gi, '')} `;
        break;
      case BlockType.PARAGRAPH:
        result += `${block.data.text?.replace(/(<([^>]+)>)/gi, '')} `;
        break;
      default:
        break;
    }
  });

  return result;
};

export const getFirstImage = (blocks: any[]): any => {
  let result: any = null;

  blocks.forEach((block) => {
    if (!result) {
      switch (block.type) {
        case BlockType.UNSPLASH:
          result = block;
          break;
        default:
          break;
      }
    }
  });

  return result;
};
