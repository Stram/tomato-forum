export default function(doc, ret) {
  return {
    id: ret._id,
    username: ret.username,
    email: ret.local.email,
    createdAt: ret.createdAt,
    updatedAt: ret.updatedAt,
    karmaPoints: ret.karma,
    userLevel: ret.userLevel,
    theme: ret.theme
  };
}
