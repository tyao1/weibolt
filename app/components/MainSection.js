import React, { Component, PropTypes } from 'react';
// import TodoItem from './TodoItem';
// import Footer from './Footer';
// import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import { connect } from 'react-redux';
import followInBatch from '../utils/followInBatch';
import runAfterLoad from '../utils/runAfterLoad';
import { wait, needCode } from '../utils/botUtils';
import { toggle } from '../reducers/settings';

function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

const config = [
  {
    name: '不知道什么也',
  },
  {
    name: '搜索页',
    operation: async function opSearch() {
      // likes
      const likes = Array.prototype.slice.call(document.querySelectorAll('a[action-type="feed_list_like"][title="赞"]'));
      shuffle(likes);
      for (let like of likes) {
        like.scrollIntoView(true);
        await wait(Math.random() * 600);
        like.click();
        console.log('[weibolt] like');
        await wait(200 + 2000 * Math.random());
      }

      // follow
      const links = document.querySelectorAll('a[usercard]');
      const userCollection = {};
      Array.prototype.forEach.call(links, (link => {
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

@connect(
  state => ({
    working: state.settings.working,
  }),
  { toggle },
)
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
    this.type = type;
  }

  componentDidMount() {
    // wait for weibo loaded
    if (this.props.working) {
      this.heavyLefting();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.working && nextProps.working) {
      this.heavyLefting();
    }
  }
  onToggleClick = () => {
    this.props.toggle(!this.props.working);
  }
  heavyLefting() {
    const { operation, after } = config[this.type];
    if (!operation) return;
    runAfterLoad(async function runAfterFn() {
      if (needCode()) {
        alert('需要填写验证码');
        return;
      }
      const collection = await operation(); // retrieve users
      followInBatch(collection);
      if (after) after();
    });
  }

  render() {
    const { type } = this;
    const { working } = this.props;
    const current = config[type];
    return (
      <section className={style.main}>
        <h4>当前页面：{maxLength(document.location.pathname.slice(0, 14))}</h4>
        <p>可执行操作: {current.name}</p>
        <button style={{
          marginTop: '14px',
          border: '1px solid #4a4a4a',
          padding: '12px 24px',
          borderRadius: '10px',
          cursor: 'pointer',
        }} onClick={this.onToggleClick}>{working ? '停止' : '开始'}</button>
      </section>
    );
  }
}
