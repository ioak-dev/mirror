import React, { useState } from 'react';
import './style.scss';
import NavigationActionType from '../NavigationActionType';
import ToolButton from '../../common/ToolButton';

interface Props {
  actions: NavigationActionType[];
  handleAction: any;
}
const NavigationToolset = (props: Props) => {
  return (
    <div className="navigation-toolset">
      {props.actions.map((item) => (
        <div className="navigation-toolset__item" key={item}>
          {item === NavigationActionType.UP && (
            <ToolButton handleClick={() => props.handleAction(item)}>
              <svg id="icon-arrow_upward" viewBox="0 0 12 12">
                <path d="M1.992 6l4.008-4.008 4.008 4.008-0.727 0.703-2.789-2.789v6.094h-0.984v-6.094l-2.813 2.789z" />
              </svg>
            </ToolButton>
          )}
          {item === NavigationActionType.DOWN && (
            <ToolButton handleClick={() => props.handleAction(item)}>
              <svg id="icon-arrow_downward" viewBox="0 0 12 12">
                <path d="M10.008 6l-4.008 4.008-4.008-4.008 0.727-0.703 2.789 2.789v-6.094h0.984v6.094l2.813-2.789z" />
              </svg>
            </ToolButton>
          )}
          {item === NavigationActionType.NEW && (
            <ToolButton handleClick={() => props.handleAction(item)}>
              <svg id="icon-add" viewBox="0 0 12 12">
                <path d="M9.492 6.492h-3v3h-0.984v-3h-3v-0.984h3v-3h0.984v3h3v0.984z" />
              </svg>
            </ToolButton>
          )}
          {item === NavigationActionType.DELETE && (
            <ToolButton handleClick={() => props.handleAction(item)}>
              <svg id="icon-delete" viewBox="0 0 12 12">
                <path d="M9.492 1.992v1.008h-6.984v-1.008h1.734l0.516-0.492h2.484l0.516 0.492h1.734zM3 9.492v-6h6v6q0 0.398-0.305 0.703t-0.703 0.305h-3.984q-0.398 0-0.703-0.305t-0.305-0.703z" />
              </svg>
            </ToolButton>
          )}
        </div>
      ))}
      {/* {props.reset && (
        <ToolButton handleClick={props.reset}>
          <svg id="icon-reload" viewBox="0 0 12 12">
            <path d="M9 6.75c0 1.654-1.345 3-3 3s-3-1.346-3-3 1.345-3 3-3l0.885 0.010-0.437 0.436 1.061 1.061 2.255-2.257-2.255-2.25-1.061 1.060 0.442 0.44h-0.891c-2.484 0-4.5 2.014-4.5 4.5s2.016 4.5 4.5 4.5 4.5-2.014 4.5-4.5h-1.5z" />
          </svg>
        </ToolButton>
      )} */}
    </div>
  );
};

export default NavigationToolset;
