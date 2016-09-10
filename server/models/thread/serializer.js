export default function(doc, ret) {
  return {
    id: ret._id,
    title: ret.title,
    content: ret.content,
    createdAt: ret.createdAt,
    category: ret.category
  };
}
