import React from 'react';
import Sidebar from 'components/Sidebar';

export default class SidebarLayout extends React.Component {

  render() {
    return (
      <div>
        <Sidebar />
        <div>{this.props.children}</div>
      </div>
    );
  }
}
