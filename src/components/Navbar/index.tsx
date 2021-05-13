import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './style.scss';

import OakButton from '../../oakui/wc/OakButton';
import Logo from '../Logo';
import RightNav from '../Topbar/RightNav';

interface Props {
  asset: string;
  cookies: any;
  //   location: any;
  //   match: any;
  hideSidebarOnDesktop?: boolean;
}

const Navbar = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  const goToHome = () => {
    history.push(`/${props.asset}/asset`);
  };

  const goToArticles = () => {
    history.push(`/${props.asset}/article`);
  };

  const manageAsset = () => {
    history.push(`/${props.asset}/asset/view`);
  };

  const newArticle = () => {
    history.push(`/${props.asset}/article/create`);
  };

  return (
    <div className="navbar">
      <div className="navbar--left">
        <div>
          <Logo />
        </div>
        <OakButton
          theme="default"
          shape="sharp"
          variant="outline"
          handleClick={goToHome}
        >
          Home
        </OakButton>
        <OakButton
          theme="default"
          shape="sharp"
          variant="outline"
          handleClick={goToArticles}
        >
          Articles
        </OakButton>
        <OakButton
          theme="default"
          shape="sharp"
          variant="outline"
          handleClick={manageAsset}
        >
          Asset
        </OakButton>
        <OakButton
          theme="default"
          shape="sharp"
          variant="outline"
          handleClick={newArticle}
        >
          User
        </OakButton>
      </div>
      <div className="navbar--right">
        <OakButton
          theme="default"
          shape="sharp"
          variant="outline"
          handleClick={newArticle}
        >
          New Article
        </OakButton>
        <RightNav cookies={props.cookies} />
      </div>
    </div>
  );
};

export default Navbar;
