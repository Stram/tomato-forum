import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {observer} from 'mobx-react';

import styles from './styles.scss';

@observer
export default class LoginForm extends Component {
  static propTypes = {
    loginForm: PropTypes.object
  }

  formatErrors(field) {
    return field.dirty ? field.errors.map((error) => `${error}`).join(', ') : '';
  }

  render() {
    const {loginForm} = this.props;

    return (
      <div className={styles.main}>
        <h2>login</h2>
        <form className={styles.form} onSubmit={loginForm.onSubmit}>
          <div className={styles.field}>
            <label id="emailLabel" htmlFor="email">email</label>
            <input id="email"
              aria-labelledby="emailLabel"
              type="text"
              defaultValue={loginForm.email.value}
              onChange={loginForm.email.onChange} />
            <p className={styles.error}>{this.formatErrors(loginForm.email)}</p>
          </div>

          <div className={styles.field}>
            <label id="passwordLabel" htmlFor="password">password</label>
            <input id="password"
              aria-labelledby="passwordLabel"
              type="password"
              defaultValue={loginForm.password.value}
              onChange={loginForm.password.onChange} />
            <p className={styles.error}>{this.formatErrors(loginForm.password)}</p>
          </div>

          <Link tabIndex="0" role="menuitem" to="/forgotten-password">forgotten-password-link</Link>

          <button className={styles.button}>login</button>
        </form>
      </div>
    );
  }
}
