import React from 'react';
import styles from './styles.scss';

export default class BasicLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={styles.main}>
        {this.props.children}
      </div>
    );
  }
}
