
//resolvers receive 4 arguments - parent, args, context, payload

// The context argument is a plain JavaScript object that every resolver in the resolver chain can read from
//  and write to. Thus, it is basically a means for resolvers to communicate.
//   A really helpful feature is that you can already write to the context 
//   at the moment when the GraphQL server itself is being initialized.

// Prisma Client exposes a CRUD API for the models in your datamodel 
// for you to read and write in your database. These methods are auto-generated 
// based on your model definitions in schema.prisma

//Prisma CRUD operations are asynchronous.

