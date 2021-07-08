import { ApolloServer, gql } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs } from './typeDefs';
import { user } from './resolvers';
import Cors from 'micro-cors';
import { log } from './log';
import { applyMiddleware } from 'graphql-middleware';
import getUser from './utils/getUser';


const cors = Cors();
const schema = applyMiddleware(makeExecutableSchema({typeDefs, resolvers: [user]}),log);

export const config = {
    api: {
        bodyParser: false
    }
}
const handler = new ApolloServer({
    schema
}).createHandler({ path: '/api/graphql'});

export default cors((req,res: any) => {
    if(req.method === 'OPTIONS'){
        return res.status(200).send()
    }
    return handler(req,res)
});