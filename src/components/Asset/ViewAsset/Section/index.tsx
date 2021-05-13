import React from 'react';
import CategorySection from './CategorySection';
import FeatureSection from './FeatureSection';
import SpotlightSection from './SpotlightSection';

interface Props {
  section: any;
  handleChange: any;
}

const Section = (props: Props) => {
  const handleChange = (value: any) => {
    props.handleChange(value);
  };

  return (
    <div className="section-conf">
      {props.section.type === 'SPOTLIGHT' && (
        <SpotlightSection section={props.section} handleChange={handleChange} />
      )}
      {props.section.type === 'CATEGORY' && (
        <CategorySection section={props.section} handleChange={handleChange} />
      )}
      {props.section.type === 'FEATURE' && (
        <FeatureSection section={props.section} handleChange={handleChange} />
      )}
    </div>
  );
};

export default Section;
