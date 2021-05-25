import ContentType from './builder/ContentBuilder/ContentType';
import TextType from './builder/ContentBuilder/TextType';
import SectionType from './builder/SectionType';

const tinycolor = require('tinycolor2');

export const toHtml = (blocks: any[]) => {
  let res = '';
  blocks.forEach((block) => {
    switch (block.type) {
      case SectionType.SINGLE_SECTION:
        res += getHtmlForSingleSection(block);
        break;
      default:
        break;
    }
  });
  return res;
};

const getHtmlForSingleSection = (block: any) => {
  let content = `<div
          class="${getContentClass(block.height, block.position)}"
        >`;
  content += "<div className='elements-site__content__textblock'>";
  content += getContent(block.content, block.position, block.bleed);
  content += '</div>';
  content += '</div>';
  const result = getBackgroundView(block.background, content);
  return result;
};

const getContent = (
  content: any[],
  position:
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right',
  bleed: 'none' | 'small' | 'medium' | 'large'
) => {
  let res = `<div className="${getContentRootClass(position, bleed)}">`;
  content.forEach((item) => {
    switch (item.type) {
      case ContentType.TEXT:
        res += getTextBlock(item, getTextAlignment(position));
        break;
      case ContentType.ACTION:
        res += getActionLinks(item, getTextAlignment(position));
        break;

      default:
        break;
    }
  });
  res += '</div>';
  return res;
};

const getTextBlock = (textBlock: any, align: any) => {
  let color = null;
  if (textBlock.meta.color === 'custom') {
    color = textBlock.meta.hex;
  }
  const textClass = getTextClass(textBlock, align);
  switch (textBlock.meta.elementType) {
    case TextType.H1:
    case TextType.H2:
    case TextType.H3:
      return `<${textBlock.meta.elementType} class="${textClass}" style="color: ${color};">${textBlock.data.text}</${textBlock.meta.elementType}>`;
    case TextType.BODY:
    case TextType.SUBTITLE:
    case TextType.CAPTION:
      return `<div class="${textClass}" style="color: ${color};">${textBlock.data.text}</div>`;

    default:
      return '';
  }
};

const getActionLinks = (actionBlock: any, align: any) => {
  let res = `<div class="elements-site__action elements-site__action--align-${align}">`;
  actionBlock.data.items.forEach((item: any) => {
    console.log(actionBlock.meta, item);
    res += getActionButton(actionBlock.meta, item);
  });
  res += '</div>';
  return res;
};

const getActionButton = (meta: any, item: any) => {
  const computedStyle = getActionButtonStyle(meta, item);
  let style = `--action-button-background-color: ${computedStyle.backgroundColor};`;
  style += `--action-button-background-color-hover: ${computedStyle.backgroundColorHover};`;
  style += `--action-button-color: ${computedStyle.color};`;
  style += `--action-button-color-hover: ${computedStyle.colorHover};`;
  let res = `<button style="${style}" class="${getActionButtonClass(
    meta,
    item
  )}" onClick='${() => actionButtonClickHandler(item)}'>`;
  res += item.label;
  res += `</button>`;
  return res;
};

function actionButtonClickHandler(item: any) {
  window.open(item.url);
}

export const getActionButtonClass = (meta: any, item: any) => {
  let res = 'elements-site__action-button';
  res += ` elements-site__action-button--color-${item.color}`;
  if (meta.rounded) {
    res += ` elements-site__action-button--rounded`;
  }
  res += ` elements-site__action-button--size-${meta.size}`;
  res += ` elements-site__action-button--variant-${item.variant}`;
  return res;
};

export const getActionButtonStyle = (meta: any, item: any) => {
  let res: any = {
    backgroundColor: null,
    color: null,
    backgroundColorHover: null,
    colorHover: null,
  };
  if (item.color === 'custom') {
    const backgroundColor = tinycolor(item.hex || '#000');
    const backgroundColorHover = backgroundColor.clone().darken(7);
    const color = backgroundColor.isLight() ? '#000' : '#fff';
    const colorHover = backgroundColorHover.isLight() ? '#000' : '#fff';
    res = {
      backgroundColor: backgroundColor.toString(),
      backgroundColorHover: backgroundColorHover.toString(),
      color,
      colorHover,
    };
  }
  return res;
};

const getBackgroundView = (value: any, children: string) => {
  const computedStyles = getBackgroundStyle(value);
  let result = `<div class="${getBackgroundClass(
    value.meta.parallax,
    false
  )}" style="background-image:${
    computedStyles.backgroundImage
  }; background-color:${computedStyles.backgroundColor};">`;
  result += `<div class='elements-site__background__overlay' 
    style="background-color:${computedStyles.overlayBackgroundColor};">`;
  result += children;
  result += '</div>';
  result += '</div>';
  return result;
};

export const getBackgroundStyle = (
  value: any
): {
  backgroundColor: string;
  backgroundImage: string;
  overlayBackgroundColor: string;
} => {
  let backgroundImage = 'none';
  let backgroundColor = null;
  let overlayBackgroundColor = null;
  if (value?.source === 'UNSPLASH' && value?.data?.urls) {
    backgroundImage = `url(${value.data.urls.regular})`;
    backgroundColor = 'inherit';
  }
  if (value?.source === 'SOLID-COLOR') {
    backgroundImage = 'none';
    if (value?.data?.color === 'custom') {
      backgroundColor = value?.data?.hex;
    } else if (value?.data?.color === 'default') {
      backgroundColor = 'var(--color-surface)';
    } else {
      backgroundColor = `var(--color-${value?.data?.color})`;
    }
  }

  const overlayColor = getOverlay({
    baseColor: value.meta.overlayColor,
    intensity: value.meta.overlayIntensity,
  });
  overlayBackgroundColor = overlayColor;

  return { backgroundColor, backgroundImage, overlayBackgroundColor };
};

export const getTextAlignment = (
  position:
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
): 'left' | 'right' | 'center' => {
  if (['left', 'top-left', 'bottom-left'].includes(position)) {
    return 'left';
  }
  if (['center', 'top-center', 'bottom-center'].includes(position)) {
    return 'center';
  }
  if (['right', 'top-right', 'bottom-right'].includes(position)) {
    return 'right';
  }

  return 'left';
};

export const getTextClass = (
  block: any,
  align?: 'left' | 'right' | 'center'
) => {
  const _align = align || block.meta.align || 'left';
  let res = '';
  res = `elements-fontsize-${block.meta.elementType || 'body'}-${
    block.meta.fontsize || 'medium'
  }`;
  res += ` elements-textalign-${_align}`;
  if (block.meta.italic) {
    res += ' elements-fontstyle-italic';
  }
  res += ` elements-fontfamily-${block.meta.fontfamily || 'body'}`;
  res += ` elements-fontweight-${block.meta.fontweight || 'regular'}`;
  res += ` elements-textcolor-${block.meta.color}`;
  return res;
};

export const getOverlay = (settings: {
  baseColor: string;
  intensity: 'none' | 'ultralow' | 'low' | 'moderate' | 'heavy' | 'intense';
}) => {
  const overlayColor = tinycolor(settings.baseColor);
  switch (settings.intensity) {
    case 'none':
      return null;
    case 'ultralow':
      return overlayColor.setAlpha(0.1).toRgbString();
    case 'low':
      return overlayColor.setAlpha(0.2).toRgbString();
    case 'moderate':
      return overlayColor.setAlpha(0.3).toRgbString();
    case 'heavy':
      return overlayColor.setAlpha(0.5).toRgbString();
    case 'intense':
      return overlayColor.setAlpha(0.7).toRgbString();
    default:
      return null;
  }
};

export const getContentRootClass = (
  position:
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right',
  bleed: 'none' | 'small' | 'medium' | 'large'
) => {
  let res = `elements-site__content-root elements-site__content-root--position-${position} elements-site__content-root--bleed-${bleed}`;
  res += ` elements-site__content-root--align-${getTextAlignment(position)}`;
  return res;
};

export const getContentClass = (
  height: string,
  position:
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
) => {
  return `elements-site__content elements-site__content--height-${height} elements-site__content--position-${position}`;
};

export const getSplitSectionClass = (proportion: number) => {
  let res = 'elements-site__split-section';
  res += ` elements-site__split-section--proportion-${
    proportion > 0 ? `p${proportion}` : `m${0 - proportion}`
  }`;
  return res;
};

export const getBackgroundClass = (parallax: boolean, split: boolean) => {
  let res = 'elements-site__background';
  res += ` ${parallax ? 'elements-site__background--parallax' : ''}`;
  res += ` ${split ? 'elements-site__background--split' : ''}`;
  return res;
};
