import _ from 'underscore';

export default (enumObject) => {
  return {
    enum: enumObject,

    get(id) {
      return _.find(this.enum, (enum) => enum.id === id);
    },

    getByName(name) {
      return _.find(this.enum, (enum) => enum.name === name);
    }
  };
};
