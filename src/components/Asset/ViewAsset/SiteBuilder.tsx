import React from 'react';
import './SiteBuilder.scss';
import { newId } from '../../../events/MessageService';
import HeroSection from './Section/HeroSection';
import AddSectionPrompt from './AddSectionPrompt';
import Section from './Section';
import HeroEditor from '../../../elements/sitebuilder/editor/HeroEditor';

interface Props {
  assetData: any;
  handleChange: any;
}

const SiteBuilder = (props: Props) => {
  const handleHeroChange = (value: any) => {
    console.log('handle sitebuilder', {
      ...props.assetData.hero,
      ...value,
    });
    _handleChange('hero', { ...props.assetData.hero, ...value });
  };

  const handleSectionChange = (value: any) => {
    console.log(value);
    const _sectionData = [...props.assetData.section];
    const index = _sectionData.findIndex((item) => item.id === value.id);
    _sectionData[index] = value;
    _handleChange('section', _sectionData);
  };

  const _handleChange = (field: string, value: any) => {
    const _assetData = { ...props.assetData, [field]: value };
    props.handleChange(_assetData);
  };

  const handleAddSection = (newSection: any, index: number) => {
    const section: any[] = [...props.assetData.section];
    section.splice(index + 1, 0, newSection);
    const _assetData = { ...props.assetData, section };
    props.handleChange(_assetData);
  };

  return (
    <div className="site-builder">
      <div className="site-builder__hero">
        {/* <HeroSection
          section={props.assetData.hero}
          handleChange={handleHeroChange}
        /> */}
        {props.assetData.hero.background && (
          <HeroEditor
            handleChange={handleHeroChange}
            value={props.assetData.hero}
          />
        )}
      </div>
      {props.assetData?.section?.map((section: any) => (
        <div key={section.id} className="site-builder__section">
          <AddSectionPrompt
            addSection={(section: any) => handleAddSection(section, 0)}
          />
          <Section
            section={section}
            handleChange={handleSectionChange}
            key={section.id}
          />
        </div>
      ))}
      <div className="site-builder__control">
        <AddSectionPrompt
          addSection={(section: any) => handleAddSection(section, 0)}
        />
      </div>

      <br />
      <br />
    </div>
  );
};

export default SiteBuilder;
