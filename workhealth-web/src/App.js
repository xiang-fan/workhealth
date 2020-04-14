import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { selectUserRole } from './redux/pages/Login/selectors';
import { Switch } from 'react-router';
import 'antd/dist/antd.css';

import { browserHistory } from './browserHistory';
import { initializeApp } from './redux/pages/Login/actions';
import {
  About,
  AdminMain,
  Login,
  PrivateRoute,
  Main
} from './redux/pages';
import './App.css';

const ADMIN = 'admin';

const App = ({ roles }) => (
  <Router history={browserHistory}>
    {roles === ADMIN ?
      <Switch>
        <PrivateRoute exact path={'/admin'} component={AdminMain} />
        <Redirect to="/admin" />
      </Switch> :
      <Switch>
        <PrivateRoute exact path={['/']} component={Main} />
        <Route exact path={['/about']} component={About} />
        <Route exact path={'/login'} component={Login} />
        <Redirect to="/" />
      </Switch>
    }
  </Router>
);

const mapStateToProps = state => ({
  roles: selectUserRole(state),
});

export default compose(
  connect(
    mapStateToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(initializeApp());
    },
  }),
)(App);
