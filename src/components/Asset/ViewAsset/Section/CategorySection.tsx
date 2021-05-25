import React, { useState } from 'react';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import './CategorySection.scss';
import OakInput from '../../../../oakui/wc/OakInput';
import OakSelect from '../../../../oakui/wc/OakSelect';
import OakRadioGroup from '../../../../oakui/wc/OakRadioGroup';
import OakCheckbox from '../../../../oakui/wc/OakCheckbox';
import OakRadio from '../../../../oakui/wc/OakRadio';
import { newId } from '../../../../events/MessageService';

interface Props {
  section: any;
  handleChange: any;
}

const CategorySection = (props: Props) => {
  const handleMetaChange = (detail: any) => {
    _handleChange(detail.name, detail.value);
  };

  const _handleChange = (field: string, value: any) => {
    const _section = { ...props.section, [field]: value };
    props.handleChange(_section);
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div className=".category-section-builder">
      <div className=".category-section-builder__banner">
        <div
          className={sectionCompose({
            baseClass: '',
            fillColor: 'container',
            paddingHorizontal: 2,
            paddingVertical: 2,
          })}
        >
          <OakInput
            name="heading"
            value={props.section.heading}
            label="Heading"
            handleInput={handleMetaChange}
            shape="underline"
            gutterBottom
          />
          <OakInput
            type="number"
            name="categoryCount"
            value={props.section.categoryCount}
            label="Number of categories"
            handleInput={handleMetaChange}
            shape="underline"
            gutterBottom
          />
          <OakInput
            type="number"
            name="articleCount"
            value={props.section.articleCount}
            label="Number of articles"
            handleInput={handleMetaChange}
            shape="underline"
            gutterBottom
          />
          <OakRadioGroup
            radioGroupName={`font-size-${groupId}`}
            name="fontSize"
            value={props.section.fontSize}
            label="Heading font size"
            handleChange={handleMetaChange}
            gutterBottom
          >
            <OakRadio radioGroupName={`font-size-${groupId}`} name="small">
              Small
            </OakRadio>
            <OakRadio radioGroupName={`font-size-${groupId}`} name="regular">
              Regular
            </OakRadio>
            <OakRadio radioGroupName={`font-size-${groupId}`} name="large">
              Large
            </OakRadio>
          </OakRadioGroup>
          <OakSelect
            name="color"
            value={props.section.color}
            label="Color"
            handleInput={handleMetaChange}
            shape="underline"
            optionsAsKeyValue={[
              { id: 'default', value: 'Default color' },
              { id: 'primary', value: 'Primary color' },
              { id: 'secondary', value: 'Secondary color' },
            ]}
            gutterBottom
          />
          <OakCheckbox
            name="rounded"
            value={props.section.rounded}
            handleChange={handleMetaChange}
            gutterBottom
          >
            Rounded sections
          </OakCheckbox>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
