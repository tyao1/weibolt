import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    users: state.followers
  }),
  // { addFollowers },
)
export default class Dashboard extends Component {

  static propTypes = {
    users: PropTypes.object.isRequired
  };

  renderList = () => {
    const { users } = this.props;
    let keys = Object.keys(users).reverse();
    const length = keys.length;
    if (keys.length > 20) {
      keys = keys.slice(0, 20);
    }
    const elems = keys.map(key => {
      const user = users[key];
      return <li key={key}>{user.name}</li>;
    });
    return (<div>
      <ul
        style={{ padding: 0, listStyle: 'none' }}
      >
        {elems}
      </ul>
      <p>等{length}位用户</p>
    </div>);
  }

  render() {
    return (
      <div
        style={{
          padding: 14, textAlign: 'left',

        }}
      >
        <h2>最近关注了</h2>
        {this.renderList()}
      </div>
    );
  }
}
