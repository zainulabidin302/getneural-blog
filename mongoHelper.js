const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://admin:zain@cluster0-shard-00-00-ilbat.mongodb.net:27017,cluster0-shard-00-01-ilbat.mongodb.net:27017,cluster0-shard-00-02-ilbat.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const projectName = 'articles';

function getDb(callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) callback(err);
    const projectDb = db.db(projectName);
    callback(null, projectDb);
  });
}

function getCollection(colName, callback) {
  getDb((error, db) => {
    if (error) return callback(error);
    callback(null, db.collection(colName));
  });
}

module.exports = {
  getDb,
  getCollection,
};
