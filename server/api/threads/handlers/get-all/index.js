import Thread from '~/models/thread';
import metaInfo from '~/middlewares/pagination/meta-info';

module.exports = function(req, res) {
  const paginationOptions = req.pagination || {};
  const filterOptions = req.filters || {};

  Thread.paginate(filterOptions, paginationOptions).then((result) => {

    const threads = result.docs;
    const response = metaInfo({
      threads: threads.map((thread) => thread.toObject())
    }, result);

    res.json(response);
  });
};
