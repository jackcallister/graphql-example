import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} from 'graphql/lib/type';

// A data object for fetching a user from a DB. This isn't anything to do with GraphQL
const User = {

  findById(id) {
    // Just return a fake value
    return {
      id: id,
      name: 'Jack is everywhere',
      email: 'jarsbe@gmail.com',
      nickname: 'Jack-O-Lantern'
    }
  }
}

// Type definitions for GraphQL
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user.',
    },
    nickname: {
      type: GraphQLString,
      description: 'The nickname of the user.',
    }
  })
});

// Type definitions for the GraphQL endpoint. You can ask for a user but you
// must send an Id as specified in the args field. The resolve function fetches
// the user and is returned is the requested shape.
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: function(root, {id}) {
          return User.findById(id);
        }
      }
    }
  })
});

export default schema;
