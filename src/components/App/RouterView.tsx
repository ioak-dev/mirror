import React from 'react';

import { Route } from 'react-router-dom';
import './RouterView.scss';
import OaLogin from '../Auth/OaLogin';
import OakRoute from '../Auth/OakRoute';
import Unauthorized from '../Auth/Unauthorized';
import OakRouteGraph from '../Auth/OakRouteGraph';
import Login from '../Login';
import ExternLogin from '../Auth/ExternLogin';
import OneAuth from '../Login/OneAuth';
import Email from '../Login/Email';
import ArticleHome from '../Article/ArticleHome';
import ListArticle from '../Article/ArticleHome/ListArticle';
import ArticlesByTag from '../Article/ArticleHome/ArticlesByTag';
import ViewArticle from '../Article/ViewArticle';
import CreateArticle from '../Article/CreateArticle';
import EditArticle from '../Article/EditArticle';
import ViewAsset from '../Asset/ViewAsset';
import Home from '../Home';
import Landing from '../Landing';
import ElementsDemo from '../ElementsDemo';

interface Props {
  cookies: any;
}

const RouterView = (props: Props) => {
  return (
    <div className="router-view">
      <Route
        path="/login"
        render={(propsLocal) => (
          <OakRoute {...propsLocal} {...props} component={OaLogin} />
        )}
      />
      <Route
        path="/:space/unauthorized"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={Unauthorized}
            middleware={['isAuthenticated']}
          />
        )}
      />
      <Route
        path="/"
        exact
        render={(propsLocal) => (
          <OakRouteGraph {...propsLocal} {...props} component={Home} />
        )}
      />
      <Route
        path="/:asset/login/home"
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={Login}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        path="/:asset/login/extern"
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={ExternLogin}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        path="/:asset/login/oa"
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={OneAuth}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        path="/:asset/login/email"
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={Email}
            middleware={['readAuthentication']}
          />
        )}
      />

      <Route
        path="/:asset/asset"
        exact
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={Landing}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        path="/:asset/asset/view"
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={ViewAsset}
            middleware={['readAuthentication']}
          />
        )}
      />

      {/* Article URLs */}
      <Route
        path="/:asset/article"
        exact
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={ArticleHome}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:asset/article/search"
        exact
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={ListArticle}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:asset/article/tag"
        exact
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={ArticlesByTag}
            middleware={['authenticate']}
          />
        )}
      />

      <Route
        path="/:asset/article/view"
        exact
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={ViewArticle}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:asset/article/create"
        exact
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={CreateArticle}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:asset/article/edit"
        exact
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={EditArticle}
            middleware={['authenticate']}
          />
        )}
      />

      <Route
        path="/:asset/elements"
        render={(propsLocal) => (
          <OakRouteGraph
            {...propsLocal}
            {...props}
            component={ElementsDemo}
            middleware={['readAuthentication']}
          />
        )}
      />
    </div>
  );
};

export default RouterView;
