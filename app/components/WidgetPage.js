import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import runFunc from '../utils/runFunc';
import runAfterLoad from '../utils/runAfterLoad';
import { connect } from 'react-redux';
import { addFollowers } from '../reducers/followers';

@connect(
  null,
  { addFollowers },
)
export default class WidgetPage extends Component {

  static propTypes = {
    addFollowers: PropTypes.func.isRequired,
  };

  /*
  constructor(props, context) {
    super(props, context);
    this.state = {
      clicked: false,
    };
  }
  */

  componentDidMount() {
    runAfterLoad(() => {
      // get following users
      const buddies = document.querySelectorAll('.current');
      const users = Array.prototype.map.call(buddies, (buddy => {
        const user = {};
        user.id = buddy.getAttribute('uid');
        user.name = buddy.children[0].getAttribute('title');
        return user;
      }));
      console.log(users.length);
      const focusButton = document.querySelector('.btngreen_l');
      if (!focusButton) {
        console.warn('no focus button found');
        return;
      }
      /*
      if (!window.$CONFIG) {
        window.$CONFIG = {};
      }
      */
      runFunc(`
        console.log(window.App);
        console.log(window.$CONFIG);
        console.log(window.Utils);
        window.$CONFIG.$confirm = 1;
      `);
      setTimeout(() => {
        focusButton.click();
      }, 100);


      const handler = setInterval(() => {
        if (document.querySelector('.btndisable_l.concern_done')) {
          clearInterval(handler);
          this.props.addFollowers(users);
          window.location = 'weibo.com/sorry';
        } else {
          focusButton.click();
        }
      }, 100);
    });
  }

  render() {
    return (
      <section>
        <h3>自动关注</h3>
        
      </section>
    );
  }
}
