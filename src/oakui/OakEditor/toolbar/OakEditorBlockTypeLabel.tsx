import React, { useEffect, useState } from 'react';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';
import './OakEditorBlockTypeLabel.scss';

interface Props {
  block: any;
}
const OakEditorBlockTypeLabel = (props: Props) => {
  return (
    <div
      className={typographyCompose({
        baseClass: 'oak-editor-block-type-label',
        variant: 'subtitle1',
      })}
    >
      {props.block.label || props.block.type}
    </div>
  );
};

export default OakEditorBlockTypeLabel;
