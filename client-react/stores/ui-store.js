import {observable, computed} from 'mobx';

class UiState {
    @observable pendingRequestCount = 0;
    @observable isSidebarOpened = false;

    @computed get appIsInSync() {
      return this.pendingRequestCount === 0;
    }
}

export default new UiState();
