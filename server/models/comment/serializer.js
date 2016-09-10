export default function(doc, ret) {
  return {
    id: ret._id,
    content: ret.content,
    createdAt: ret.createdAt,
    thread: ret.thread,
    owner: ret.owner
  };
}
