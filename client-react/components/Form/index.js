import React, {Component, PropTypes} from 'react';

export default class Form extends Component {
  static propTypes = {
    form: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func
  }

  constructor(...args) {
    super(...args);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const {form, onSuccess, onFailure} = this.props;
    form.submit().then(onSuccess, onFailure);
  }

  render() {
    const {form, children, className} = this.props;

    return <form className={className} onSubmit={this.onSubmit}>
      {children}
    </form>;
  }
}
