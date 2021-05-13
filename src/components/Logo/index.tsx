import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import mirrorWhite from '../../images/mirror_white.svg';
import mirrorBlack from '../../images/mirror_black.svg';

const Logo = () => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      {profile.theme === 'theme_light' && (
        <img className="logo--image" src={mirrorBlack} alt="Mirror logo" />
      )}
      {profile.theme !== 'theme_light' && (
        <img className="logo--image" src={mirrorWhite} alt="Mirror logo" />
      )}
    </div>
  );
};

export default Logo;
