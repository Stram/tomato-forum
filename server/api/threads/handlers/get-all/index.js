import Thread from 'models/thread';
import paginateModel from 'util/pagination/paginate-model';

module.exports = function(req, res) {
  paginateModel(req, res, Thread);
};
