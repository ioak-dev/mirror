import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  children: any;
  handleClick: any;
  subtle?: boolean;
  circle?: boolean;
}
const ControlButton = (props: Props) => {
  return (
    <button
      className={`control-button ${
        props.subtle ? 'control-button--subtle' : ''
      } ${props.circle ? 'control-button--circle' : ''}`}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default ControlButton;
