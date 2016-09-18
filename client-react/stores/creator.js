import storeCreator from 'utils/storeCreator';

import LoginForm from 'stores/ui/LoginForm';

const dataStoreList = {};

const uiStoreList = {
  loginForm: LoginForm
};

export default storeCreator(dataStoreList, uiStoreList);
