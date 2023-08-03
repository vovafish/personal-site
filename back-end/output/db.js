import { MongoClient } from "mongodb";
let db;
async function connectToDb(callback) {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@personal-cluster.rkcohc2.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    db = client.db('my-personal-projects'); // reference to the db
    callback();
}
export { db, connectToDb, };
//# sourceMappingURL=db.js.map