import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import './style.scss';
import './metric.scss';
import Content from './Content';
import HealthCheckFailed from '../AppFallback/HealthCheckFailed';
import HealthCheckProgress from '../AppFallback/HealthCheckProgress';
import { httpGet } from '../Lib/RestTemplate';
import constants from '../Constants';

const App = props => {
  const [healthCheck, setHealthCheck] = useState({
    isVerified: false,
    allowAccess: false,
  });

  useEffect(() => {
    httpGet(
      constants.API_MIRROR_HEALTHCHECK_HELLO,
      null,
      process.env.REACT_APP_GRAPHQL_URL
    ).then(response => {
      if (response.status === 200) {
        httpGet(
          constants.API_HEALTHCHECK_HELLO,
          null,
          process.env.REACT_APP_ONEAUTH_API_URL
        )
          .then(response => {
            if (response.status === 200) {
              setHealthCheck({
                ...healthCheck,
                isVerified: true,
                allowAccess: true,
              });
            } else {
              setHealthCheck({
                ...healthCheck,
                isVerified: true,
                allowAccess: false,
              });
            }
          })
          .catch(error => {
            setHealthCheck({
              ...healthCheck,
              isVerified: true,
              allowAccess: false,
            });
          });
      }
    });
  }, []);

  return (
    <Provider store={store}>
      {healthCheck.isVerified && healthCheck.allowAccess && (
        <Content {...props} />
      )}
      {healthCheck.isVerified && !healthCheck.allowAccess && (
        <HealthCheckFailed />
      )}
      {!healthCheck.isVerified && <HealthCheckProgress />}
    </Provider>
  );
};

export default App;
