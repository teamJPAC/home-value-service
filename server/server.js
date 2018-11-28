require('newrelic');

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const schema = require('./schema.js');

// const url = 'mongodb://localhost/houses';
const url = 'postgres://localhost/housingdb';

const port = 8081;

const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(
//   url,
//   { useNewUrlParser: true },
// );

app.use(cors());
app.use(express.static(`${__dirname}/../public`));

app.get('/:urlId', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

app.post('/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  }),
);


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(port, () => console.log(
  `Express GraphQL Server Now Running On localhost:${port}/graphql`,
));
