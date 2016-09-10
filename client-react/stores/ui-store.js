import {observable, computed} from 'mobx';

class UiState {
    @observable pendingRequestCount = 0;
    @observable isSidebarOpened = false;

    @computed get appIsInSync() {
      return this.pendingRequestCount === 0;
    }
}

const singleton = new UiState();
export default singleton;
