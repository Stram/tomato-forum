import BaseForm from 'stores/base/BaseForm';

export default class LoginForm extends BaseForm {

  storeWillInitialize() {
    this.fields = {
      email: {
        type: 'email',
        defaultValue: '',
        validate: ['required']
      },
      password: {
        type: 'password',
        defaultValue: '',
        validate: ['required']
      },
      rememberMe: {
        type: 'checkbox',
        defaultValue: false
      }
    };
  }
}
