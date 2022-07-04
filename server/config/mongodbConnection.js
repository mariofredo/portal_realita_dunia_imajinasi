const { MongoClient, ServerApiVersion } = require("mongodb");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const uri = `mongodb+srv://mariofredo:${process.env.MONGO_PASS}@cluster0.t3lhq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let database;
async function connection() {
  try {
    await client.connect();
    database = client.db("portalrealita");
    // console.log(database);
  } catch (err) {
    console.log(err);
  }
}

function getDB() {
  return database;
}

module.exports = { connection, getDB };
