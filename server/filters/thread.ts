import ApplicationFilter from 'filters/application';
import Thread from 'models/thread';

export default class ThreadFilter extends ApplicationFilter {
  constructor(params: any) {
    super(params);
  }

  results() {
    return Thread.query({});
  }
}
