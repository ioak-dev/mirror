import OakEditorBlockType from './OakEditorBlockType';

export interface OakEditorBlock {
  id: string;
  type: OakEditorBlockType;
  label?: string;
  supportedTypes?: OakEditorBlockType[];
  data: {
    level?: number;
    position?: 'left' | 'right' | 'center';
    text?: string;
    raw?: any;
    caption?: string;
  };
}
