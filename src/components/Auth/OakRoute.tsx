import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';
import { httpGet } from '../Lib/RestTemplate';

interface Props {
  path?: string;
  render?: any;
  component: any;
  match: any;
  history: any;
  middleware?: string[];
  cookies: any;
}

const OakRoute = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const middlewares = () => {
    props.middleware?.forEach((middlewareName) => {
      if (!runMidleware(middlewareName)) {
        return false;
      }
    });
    return true;
  };

  const runMidleware = (middlewareName: string) => {
    sendMessage('spaceChange', true, '');
    switch (middlewareName) {
      case 'readAuthentication':
        return readAuthenticationSpace();
      case 'authenticate':
        return authenticateSpace();
      case 'isAdmin':
        return isAdmin();
      default:
        return true;
    }
  };

  const authenticateSpace = () => {
    return authenticate('space');
  };
  const readAuthenticationSpace = () => {
    return authenticate('space', false);
  };

  const authenticate = async (type: string, redirect = true) => {
    sendMessage('spaceChange', true, props.match.params.space);
    if (authorization.isAuth) {
      return true;
    }
    const cookieKey = `mirror_${props.match.params.space}`;
    const authKey = props.cookies.get(cookieKey);
    const baseAuthUrl = `/auth/${props.match.params.space}`;
    if (authKey) {
      httpGet(`${baseAuthUrl}/session/${authKey}`, null)
        .then((sessionResponse) => {
          if (sessionResponse.status === 200) {
            console.log('@@@@@@@@@');
            dispatch(
              addAuth({
                isAuth: true,
                token: sessionResponse.data.data.token,
                secret: '',
                firstName: sessionResponse.data.data.firstName,
                lastName: sessionResponse.data.data.lastName,
                email: sessionResponse.data.data.email,
                type: sessionResponse.data.data.type,
                userId: sessionResponse.data.data.userId,
              })
            );
          }
        })
        .catch((error: any) => {
          props.cookies.remove(cookieKey);
          if (redirect && error.response.status === 404) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Invalid session token',
              duration: 3000,
            });
            redirectToLogin(props.match.params.space);
          } else if (redirect && error.response.status === 401) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Session expired',
              duration: 3000,
            });
            redirectToLogin(props.match.params.space);
          }
        });
    } else if (redirect) {
      redirectToLogin(props.match.params.space);
    } else {
      return true;
    }
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToLogin = (space: string) => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/space/${props.match.params.space}/login?type=signin&appId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
    // props.history.push(`/${space}/login/home`);
  };

  const redirectToUnauthorized = () => {
    props.history.push(`/${profile.space}/unauthorized`);
  };

  return (
    <>
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          space={props.match.params.space}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRoute;
