import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import './style.scss';
import Home from '../Home';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Auth/Login';
import Landing from '../Landing';
import PrivateRoute from '../Auth/PrivateRoute';
import AuthInit from '../Auth/AuthInit';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { getUser, addUser } from '../../actions/UserActions';
import { getProfile, setProfile } from '../../actions/ProfileActions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Backdrop from './Backdrop';
import Notification from '../Notification';
import Navigation from '../Navigation';
import { httpGet } from '../Lib/RestTemplate';
import { Authorization } from '../Types/GeneralTypes';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import Tenant from '../Tenant';
import Settings from './../Settings';
import Faq from '../Faq';
import ServiceRequests from '../ServiceRequests'
import UserAdministration from '../UserAdministration';
import { constants } from '../Constants';

const themes = {
    'themecolor_1': getTheme('#69A7BF'),
    'themecolor_2': getTheme('#99587B'),
    'themecolor_3': getTheme('#A66C26'),
    'themecolor_4': getTheme('#37AE82')
}

function getTheme(color: string) {
    return createMuiTheme({
        palette: {
          primary: {
              main: color         
          },
          secondary: {
              main: color
          }
        }
      });
}



interface Props {
    getProfile: Function,
    setProfile: Function,
    getAuth: Function,
    addAuth: Function,
    removeAuth: Function,
    getUser: Function,
    addUser: Function,
    cookies: any,

    // event: PropTypes.object,
    profile: any,
    authorization: Authorization
}

interface State {
    authorization: Authorization,
    profile: any,
    event: any
}

const Content = (props: Props) => {
    useEffect(() => {
        props.getProfile();
        props.getAuth();
        props.getAuth();
    }, []);

    useEffect(() => {
        const eventBus = receiveMessage().subscribe(message => {
            if (message.name === 'session expired') {
                logout(null, 'failure', 'Session expired. Login again');
            }
        });
        return () => eventBus.unsubscribe();
    });

    useEffect(() => {
        if (props.authorization && props.authorization.token && props.profile.tenant) {
            httpGet(constants.API_URL_USER + '/' + 
            props.profile.tenant + '/',
            {
                headers:{
                Authorization: props.authorization.token
                }
            })
            .then((response) => {
                console.log(response.data.data[0]);
                props.addUser(response.data.data[0]);
            })
            
        }
    }, [props.authorization]);
    
    const logout = (event: any, type = 'success', message = 'You have been logged out') => {
        props.removeAuth();
        props.cookies.remove('isAuth');
        props.cookies.remove('token');
        props.cookies.remove('secret');
        props.cookies.remove('name');
        sendMessage('notification', true, {type: type, message: message, duration: 3000});
    }

    return (
        <div className={"App"}>

            <HashRouter>
                <AuthInit />
                <Backdrop />
                <div className="body">
                    <div className="body-content">
                        <Notification />
                        <MuiThemeProvider theme={themes['themecolor_1']}>
                            <Navigation {...props} logout={() => logout} />
                            <Route path="/:tenant/home" render={(propsLocal: any) => <Home {...propsLocal} {...props} logout={() => logout} />} />
                            <Route path="/:tenant/login" render={(propsLocal: any) => <Login {...propsLocal} {...props} logout={() => logout} />} />
                            <Route path="/" exact render={(propsLocal: any) => <Landing {...propsLocal} {...props} logout={() => logout} />} />
                            <Route path="/home" exact render={(propsLocal: any) => <Landing {...propsLocal} {...props} logout={() => logout} />} />
                            <Route path="/tenant" exact render={(propsLocal: any) => <Tenant {...propsLocal} {...props} logout={() => logout} />} />
                            <PrivateRoute path="/:tenant/settings" render={(propsLocal: any) => <Settings {...propsLocal} {...props} logout={() => logout} />} />
                            <PrivateRoute path="/:tenant/faq" render={(propsLocal: any) => <Faq {...propsLocal} {...props} logout={() => logout} />} />
                            <PrivateRoute path="/:tenant/servicerequests" render={(propsLocal: any) => <ServiceRequests {...propsLocal} {...props} logout={() => logout} />} />
                            <PrivateRoute path="/:tenant/useradministration" render={(propsLocal: any) => <UserAdministration {...propsLocal} {...props} logout={() => logout} />} />
                        </MuiThemeProvider>
                    </div>
                </div>
            </HashRouter>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
  authorization: state.authorization,
  user: state.user,
  profile: state.profile//,
//   event: state.event
})

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth, getProfile, setProfile, getUser, addUser })(withCookies(Content));
