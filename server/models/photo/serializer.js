export default function(doc, ret) {
  return {
    id: ret._id,
    name: ret.name,
    url: ret.url,
    createdAt: ret.createdAt,
    user: ret.user
  };
}
