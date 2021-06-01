export interface ContentFrameGroupType {
  meta: ContentFrameGroupMetaType;
  items: ContentFrameType[];
}

export interface ContentFrameGroupMetaType {
  verticalPosition: 'top' | 'middle' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right';
}

export interface ContentFrameType {
  id: string;
  meta: ContentFrameMetaType;
  items: ContentFrameItemType[];
}

export interface ContentFrameMetaType {
  verticalPosition: 'top' | 'middle' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right';
  verticalPadding: 'none' | 'small' | 'medium' | 'large';
  horizontalPadding: 'none' | 'small' | 'medium' | 'large';
  color: 'none' | 'default' | 'primary' | 'secondary' | 'custom';
  opacity?: number;
  gap: 'none' | 'small' | 'medium' | 'large';
  hex?: string;
  borderColorHex?: string;
  borderThickness?: 'none' | 'thin' | 'normal' | 'thick';
}

export interface ContentFrameItemType {
  id: string;
  type: ContentFrameItemDataType;
  data: any;
  meta: any;
}

export enum ContentFrameItemDataType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LINKS = 'LINKS',
}
