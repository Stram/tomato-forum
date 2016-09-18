import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';

import LoginForm from 'components/LoginForm';

@observer(['ui'])
export default class Login extends Component {
  static propTypes = {
    ui: PropTypes.object
  }

  render() {
    const {ui: {loginForm}} = this.props;

    return (
      <div>
        <LoginForm loginForm={loginForm} />
      </div>
    );
  }
}
