import React, { useEffect, useState } from 'react';
import './style.scss';
import mirrorWhite from '../../images/mirror_white.svg';
import mirrorWhiteSmall from '../../images/mirror_white_small.svg';
import mirrorBlack from '../../images/mirror_black.svg';
import Links from './Links';
import { Authorization, Profile } from '../Types/GeneralTypes';
import SearchBar from '../../oakui/SearchBar';
import { receiveMessage } from '../../events/MessageService';
import OakButton from '../../oakui/OakButton';
// import SearchBar from '../Ux/SearchBar';

interface Props {
  sendEvent: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  authorization: Authorization;
  getProfile: Function;
  profile: Profile;
  login: Function;
  transparent: boolean;
  logout: Function;
  toggleSettings: any;
}

const Mobile = (props: Props) => {
  const [data, setData] = useState({
    showSearchBar: false,
    menu: false,
  });

  useEffect(() => {
    props.getProfile();
  }, []);

  useEffect(() => {
    receiveMessage().subscribe(message => {
      if (message.name === 'show-navbar-element') {
        setData({ ...data, showSearchBar: message.signal });
      }
    });
  }, []);

  const toggleMenu = () => {
    setData({ ...data, menu: !data.menu });
  };

  const signin = type => {
    props.login(type);
  };

  return (
    <>
      <div
        className={
          props.transparent ? 'navbar mobile transparent' : 'navbar mobile'
        }
      >
        <div className="left">
          {!data.showSearchBar &&
            !props.transparent &&
            props.profile.theme === 'theme_light' && (
              <img className="logo" src={mirrorWhite} alt="Mirror logo" />
            )}
          {!data.showSearchBar &&
            (props.transparent || props.profile.theme === 'theme_dark') && (
              <img className="logo" src={mirrorWhite} alt="Mirror logo" />
            )}
          {data.showSearchBar &&
            !props.transparent &&
            props.profile.theme === 'theme_light' && (
              <img className="logo" src={mirrorWhiteSmall} alt="Mirror logo" />
            )}
          {data.showSearchBar &&
            (props.transparent || props.profile.theme === 'theme_dark') && (
              <img className="logo" src={mirrorWhiteSmall} alt="Mirror logo" />
            )}
          {data.showSearchBar && <SearchBar alt />}
          {/* links */}
        </div>
        <div className="right">
          {/* <div className="settings-icon" onClick={props.toggleSettings}><i className="material-icons">settings</i></div> */}
          <div
            className={data.menu ? 'menu active' : 'menu'}
            onClick={toggleMenu}
          >
            <div />
          </div>
          {/* action login */}
        </div>
      </div>
      <div
        className={data.menu ? 'slider show' : 'slider hide'}
        onClick={toggleMenu}
      >
        <div
          className={data.menu ? 'container' : 'container hidetext'}
          onClick={toggleMenu}
        >
          <div className="action">
            {/* <div className="settings-icon" onClick={props.toggleSettings}>
                        {props.authorization.isAuth && <OakButton invert variant="animate in" small action={props.toggleSettings}><i className="material-icons">brush</i>Action 1</OakButton>}
                    </div> */}
            <div className="buttons">
              {props.authorization.isAuth && (
                <OakButton
                  invert
                  variant="animate in"
                  small
                  action={props.logout()}
                >
                  <i className="material-icons">power_settings_new</i>Logout
                </OakButton>
              )}
              {!props.authorization.isAuth && (
                <OakButton
                  invert
                  variant="animate in"
                  small
                  action={() => signin('signin')}
                >
                  <i className="material-icons">person</i>Login
                </OakButton>
              )}
              {!props.authorization.isAuth && (
                <OakButton
                  invert
                  variant="animate in"
                  small
                  action={() => signin('signup')}
                >
                  <i className="material-icons">person_add</i>Signup
                </OakButton>
              )}
            </div>
          </div>
          <Links authorization={props.authorization} profile={props.profile} />
        </div>
      </div>
    </>
  );
};

export default Mobile;
