import React, { Component, PropTypes } from 'react';
// import TodoItem from './TodoItem';
// import Footer from './Footer';
// import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import { connect } from 'react-redux';
import followInBatch from '../utils/followInBatch';
import runAfterLoad from '../utils/runAfterLoad';

/*
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};
*/

const config = [
  {
    name: '不知道什么也',
  },
  {
    name: '搜索页',
    operation: () => {
      const links = document.querySelectorAll('a[usercard]');
      const userCollection = {};
      const users = Array.prototype.forEach.call(links, (link => {
        const user = {};
        const userString = link.getAttribute('usercard');
        if (!userString) return;
        const matches = userString.match(/id=([^&]*)/);
        if (!matches || !matches[1]) {
          return;
        }
        user.id = matches[1];
        user.name = link.innerText;
        userCollection[matches[1]] = user;
      }));
      return userCollection;
    },
    after: () => {
      setTimeout(() => {
        const location = window.location.href;
        if (!/page=([^&]*)/.test(location)) {
          const newLoc = location + '&page=2';
          window.location = newLoc;
          return;
        }
        try {
          const newLoc = location.replace(/page=([^&]*)/, (...args) => 'page=' + (parseInt(args[1]) + 1));
          window.location = newLoc;
        } catch (ex) {
          console.error('no location found');
        }
      }, 1000);
    },
  }, {

  }
];

// object
function startFollow (userCollection) {
  // buid url
  // open tabpage
  const url = 'http://widget.weibo.com/relationship/bulkfollow.php?language=zh_cn&uids='
    + Object.keys(userCollection).join(',');
  console.log(url);
  console.log(Object.keys(userCollection).length);
}

function maxLength(str) {
  if (str.length < 16) {
    return str;
  }
  return str.slice(0, 13) + '...';
}

export default class MainSection extends Component {

  static propTypes = {
    // todos: PropTypes.array.isRequired,
    // actions: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);
    let type;
    const path = document.location.host;
    if (path === 's.weibo.com') {
      type = 1;
    } else {
      type = 0;
    }
    this.state = {
      type
    };
  }

  componentDidMount() {
    // wait for weibo loaded
    const { operation, after } = config[this.state.type];
    if (!operation) return;
    runAfterLoad(() => {
      const collection = operation();
      followInBatch(collection);
      if (after) after();
    });
  }

  render() {
    const { type } = this.state;
    const current = config[type];
    return (
      <section className={style.main}>
        <h4>当前页面：{maxLength(document.location.pathname.slice(0, 14))}</h4>
        <p>可执行操作: {current.name}</p>
      </section>
    );
  }
}
