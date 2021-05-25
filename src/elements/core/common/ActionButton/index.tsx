import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  children: any;
  handleClick: any;
}
const ActionButton = (props: Props) => {
  return (
    <button className="action-button" onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default ActionButton;
