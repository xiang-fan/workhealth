import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectIsAuth } from '../Login/selectors';

const separateRenderMethods = (Component, render, props) =>
  render ? render(props) : <Component {...props} />;

const PrivateRoute = ({ component, render, isAuth, isLoading, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        separateRenderMethods(component, render, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            redirectPath: props.location.pathname,
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuth: selectIsAuth(state),
});

export default connect(mapStateToProps)(PrivateRoute);
