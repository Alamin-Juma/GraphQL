//Resolving relations
//where parent is automatically resolved but not for the relations
// resolver needs to be called postedBy because it resolves
// postedBy field from the Link type in schema.graphql. models

// function postedBy(parent, args, context) {
//   //fetch Link from db using prisma
//   //invoke postBy on it
//   return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
// }

// module.exports = {
//   postedBy,
// };

function postedBy(parent, args, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
}

module.exports = {
  postedBy,
};
