import React from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

export default class Sidebar extends React.Component {

  render() {
    return (
      <div className={styles.sidebar}>
        <section className={styles.header}>
          <div className={styles.user}>
            {/* {#if owner.profilePhoto.url}
              <img className={styles.profilePhoto} src={currentUser.profilePhoto.url} alt="Profile photo"/>
            {else}
              <img className={styles.profilePhoto} src="/public/images/no-photo.svg" alt="Profile photo"/>
            {/if}
            <a href="/user/{currentUser.id} className={styles.username}>{currentUser.username}</a> */}
          </div>
        </section>
        <section className={styles.mainNavigation}>
          <Link to="/dashboard" className={styles.navigationLink}>Dashboard</Link>
          <Link to="/forum" className={styles.navigationLink}>Forum</Link>
          <Link to="/objave" className={styles.navigationLink}>Objave</Link>
          <Link to="/profili" className={styles.navigationLink}>Profili</Link>
        </section>
        <section className={styles.secondaryNavigation}>
          <Link to="/logout" className={styles.navigationLink}>Logout</Link>
          <Link to="/settings" className={styles.navigationLink}>Settings</Link>
          <Link to="/help" className={styles.navigationLink}>Help</Link>
        </section>
      </div>
    );
  }
}
