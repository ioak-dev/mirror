import ContentType from './builder/ContentBuilder/ContentType';
import TextType from './builder/ContentBuilder/TextType';
import SectionType from './builder/SectionType';
import {
  ContentFrameMetaType,
  ContentFrameGroupMetaType,
} from './ContentFrameType';

const tinycolor = require('tinycolor2');

export const toHtml = (blocks: any[]) => {
  let res = '';
  blocks.forEach((block) => {
    console.log(block);
    switch (block.type) {
      case SectionType.SINGLE_SECTION:
        res += getHtmlForSingleSectionEditor(block);
        break;
      case SectionType.SPLIT_SECTION:
        res += getHtmlForSplitSection(block);
        break;
      default:
        break;
    }
  });
  return res;
};

const getHtmlForSplitSection = (block: any) => {
  let leftContent = `<div
          class="${getContentContainerClass(
            block.left.height,
            block.left.position
          )}"
        >`;
  leftContent += "<div class='elements-site__content__textblock'>";
  leftContent += getContent(
    block.left.content,
    block.left.position,
    block.left.padding
  );
  leftContent += '</div>';
  leftContent += '</div>';
  const left = getBackgroundView(block.left.background, leftContent, true);

  let rightContent = `<div
          class="${getContentContainerClass(
            block.right.height,
            block.right.position
          )}"
        >`;
  rightContent += "<div class='elements-site__content__textblock'>";
  rightContent += getContent(
    block.right.content,
    block.right.position,
    block.right.padding
  );
  rightContent += '</div>';
  rightContent += '</div>';
  const right = getBackgroundView(block.right.background, rightContent, true);

  let result = `<div class="${getSplitSectionClass(block.proportion)}">`;
  result += '<div>';
  result += left;
  result += '</div>';
  result += '<div>';
  result += right;
  result += '</div>';
  result += '</div>';
  console.log(result);
  return result;
};

const getHtmlForSingleSectionEditor = (block: any) => {
  let content = `<div
          class="${getContentContainerClass(block.height, block.position)}"
        >`;
  content += "<div class='elements-site__content__textblock'>";
  content += getContent(block.content, block.position, block.padding);
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
  padding: 'none' | 'small' | 'medium' | 'large'
) => {
  let res = `<div class="${getContentRootClass(position, padding)}">`;
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
    const backgroundColorHover = backgroundColor.isLight()
      ? backgroundColor.clone().darken(7)
      : backgroundColor.clone().lighten(7);
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

const getBackgroundView = (value: any, children: string, split?: boolean) => {
  const computedStyles = getBackgroundStyle(value);
  let result = `<div class="${getBackgroundClass(
    value.meta.parallax,
    split || false
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
  padding: 'none' | 'small' | 'medium' | 'large'
) => {
  let res = `elements-site__content-root elements-site__content-root--position-${position} elements-site__content-root--padding-${padding}`;
  res += ` elements-site__content-root--align-${getTextAlignment(position)}`;
  return res;
};

export const getContentContainerClass = (
  height: string,
  verticalPosition: 'top' | 'middle' | 'bottom',
  placement?: 'left' | 'right' | 'default'
) => {
  const base = 'elements-site__content-container';
  let res = base;
  res += ` ${base}--height-${height}`;
  res += ` ${base}--align-y-${verticalPosition}`;
  if (placement && placement !== 'default') {
    res += ` ${base}--${placement}`;
  }
  return res;
};

export const getContentFrameGroupClass = (
  meta: ContentFrameGroupMetaType,
  horizontalPosition: 'left' | 'center' | 'right',
  layout: string,
  gap: 'none' | 'small' | 'medium' | 'large',
  gridWidth: 'auto' | 'small' | 'medium' | 'large',
  expandToFill: boolean
) => {
  const base = 'elements-site__content-frame-group';
  let res = base;
  res += ` ${base}--align-x-${horizontalPosition}`;
  res += ` ${base}--gap-${gap}`;
  res += ` ${base}--layout-${layout}`;
  res += ` ${base}--grid-width-${gridWidth}`;
  if (expandToFill) {
    res += ` ${base}--expand-to-fill`;
  } else {
    res += ` ${base}--do-not-expand-to-fill`;
  }
  return res;
};

export const getContentFrameClass = (meta: ContentFrameMetaType) => {
  const base = 'elements-site__content-frame';
  let res = base;
  res += ` ${base}--padding-x-${meta.horizontalPadding}`;
  res += ` ${base}--padding-y-${meta.verticalPadding}`;
  res += ` ${base}--align-x-${meta.horizontalPosition}`;
  res += ` ${base}--align-y-${meta.verticalPosition}`;
  res += ` ${base}--color-${meta.color}`;
  res += ` ${base}--border-thickness-${meta.borderThickness}`;
  if (meta.borderThickness && meta.borderThickness !== 'none') {
    res += ` ${base}--border`;
  }
  return res;
};

export const getContentFrameStyle = (meta: ContentFrameMetaType) => {
  const res: any = { color: null, borderColor: null };
  if (meta.color === 'custom' && meta.hex) {
    if (meta.opacity) {
      const color = tinycolor(meta.hex).setAlpha(meta.opacity);
      res.color = color.toString();
    } else {
      res.color = meta.hex;
    }
  }
  if (meta.borderThickness !== 'none') {
    res.borderColor = meta.borderColorHex;
  }
  return res;
};

export const getContentClass = (meta: ContentFrameMetaType) => {
  const base = 'elements-site__content';
  let res = base;
  res += ` ${base}--gap-${meta.gap}`;
  res += ` ${base}--align-x-${meta.horizontalPosition}`;
  return res;
};

export const getGridSectionClass = () => {
  let res = 'elements-site__grid-section';
  res += '';
  return res;
};

export const getGridSectionItemRootClass = (margin: string) => {
  let res = 'elements-site__grid-section__item__root';
  res += ` elements-site__grid-section__item__root--margin-${margin}`;
  return res;
};

export const getGridSectionItemClass = (
  color: string,
  hex: string,
  padding: string
) => {
  let res = 'elements-site__grid-section__item';
  res += ` elements-site__grid-section__item--color-${color}`;
  res += ` elements-site__grid-section__item--padding-${padding}`;
  return res;
};

export const getGridSectionItemStyle = (color: string, hex: string) => {
  const res: any = {
    color: null,
  };
  if (color === 'custom') {
    res.color = hex;
  }
  return res;
};

export const getImageContainerClass = (
  align: 'left' | 'center' | 'right',
  meta: any
) => {
  let res = 'elements-site__image-container';
  res += ` elements-site__image-container--align-${align}`;
  res += ` elements-site__image-container--height-${meta.height}`;
  return res;
};

export const getImageContainerImgClass = () => {
  let res = `elements-site__image-container__img`;
  res += '';
  return res;
};

export const getGridSectionContainerClass = (
  layout: 'single-column' | 'three-column' | 'four-column'
) => {
  let res = 'elements-site__grid-section__container';
  res += ` elements-site__grid-section__container--layout-${layout}`;
  return res;
};

export const getOverlapSectionClass = (
  backgroundSectionHeight: 'auto' | 'small' | 'medium' | 'large' | 'full',
  width: 'small' | 'medium' | 'large',
  offset: 'small' | 'medium' | 'large'
) => {
  const base = 'elements-site__overlap-section';
  let res = base;
  res += ` ${base}--background-section-height-${backgroundSectionHeight}`;
  res += ` ${base}--width-${width}`;
  res += ` ${base}--offset-${offset}`;
  return res;
};

export const getSplitSectionClass = (proportion: number) => {
  let res = 'elements-site__split-section';
  res += ` elements-site__split-section--proportion-${
    proportion > 0 ? `p${proportion}` : `m${0 - proportion}`
  }`;
  return res;
};

export const getSplitSectionContentClass = (
  proportion: number,
  side?: 'left' | 'right'
) => {
  let res = `elements-site__split-section__content__${side}`;
  res += ` elements-site__split-section__content__${side}--proportion-${
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
