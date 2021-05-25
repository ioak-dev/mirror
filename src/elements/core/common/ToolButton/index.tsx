import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  children: any;
  handleClick: any;
}
const ToolButton = (props: Props) => {
  return (
    <button className="tool-button" onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default ToolButton;
