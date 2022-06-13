const {MongoClient}=require('mongodb');
const url="mongodb://localhost:27017";
const client=new MongoClient(url);

//connect to database
async function dbConnect()
{
    let result=await client.connect();
    let database=result.db('tasks');
    return database.collection('data');
    // console.log(await(collection.find().toArray()));
}

module.exports=dbConnect;