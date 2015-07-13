import express from 'express';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';
import schema from './schema';

const app = express();

app.use(bodyParser.text({ type: 'application/graphql' }));

app.get('/api', (req, res) => {

  // Imagine different client side components
  // requesting different pieces of data
  let querys = [
    "{ user(id: 1) { name, id } }",
    "{ user(id: 1) { name, email } }",
    "{ user(id: 1) { name, id, email } }",
    "{ user(id: 1) { nickname } }",
    "{ user(id: 1) { name } }"
  ]

  // Pick a random query to use
  let query = querys[Math.floor(Math.random() * querys.length)];

  // Pass the query to GraphQL and return the response
  graphql(schema, query).then((result) => {
    res.send(JSON.stringify(result));
  });
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});
