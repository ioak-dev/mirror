import React from 'react';
import Elements from './Elements';
import './style.scss';

interface Props {
  history: any;
}

const ElementsDemo = (props: Props) => {
  return (
    <div className="elements-demo">
      <Elements />
    </div>
  );
};

export default ElementsDemo;
