const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'mykeyspace',
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'safe',
  },
});

const MyModel = models.loadSchema('Home', {
  fields: {
    _id: 'text',
    address: 'text',
    city: 'text',
    zip: 'int',
    zestimate: { type: 'set', typeDef: '<varint>' },
    beds: 'int',
    baths: 'int',
    sqFt: 'int',
    status: 'text',
    taxAssessment: 'int',
  },
  key: ['_id'],
});

console.log(models.modelInstance.Home === MyModel);

MyModel.syncDB((err, result) => {
  if (err) {
    throw err;
  }
  console.log('schemed was altered', result);
});
