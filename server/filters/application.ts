abstract class ApplicationFilter {
  private params: any;

  constructor(params: any) {
    this.params = params;
  }

  abstract results(): any
}

export default ApplicationFilter;
