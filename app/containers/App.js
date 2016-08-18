import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Dashboard from '../containers/Dashboard';

import style from './App.css';

import WidgetPage from '../components/WidgetPage';

/*
@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
*/
export default class App extends Component {

  static propTypes = {
    // todos: PropTypes.array.isRequired,
    // actions: PropTypes.object.isRequired
  };


  renderSubRoute = () => {
    switch (document.location.hostname) {
      case 'widget.weibo.com':
        return <WidgetPage />;
      case 's.weibo.com':
        return <MainSection />;
      default:
        return <Dashboard />;
    }
  };

  render() {
    // const { todos, actions } = this.props;
    return (
      <div className={style.normal}>
        <Header />
        {this.renderSubRoute()}
      </div>
    );
  }
}
