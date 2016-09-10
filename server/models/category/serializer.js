export default function(doc, ret) {
  return {
    id: ret._id,
    name: ret.name,
    createdAt: ret.createdAt,
    allowNewThreads: ret.allowNewThreads,
    threads: ret.threads
  };
}
