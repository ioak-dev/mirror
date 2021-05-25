import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  label: string;
}
const Sectionlabel = (props: Props) => {
  return <div className="section-label">{props.label}</div>;
};

export default Sectionlabel;
