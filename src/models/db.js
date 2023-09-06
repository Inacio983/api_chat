const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
if (singleton) return singleton;
//console.log(process.env.DB_HOST)
//usando diretamente o link e nome do banco de dados para evitar problemas no render//
const client = new MongoClient("mongodb+srv://admin:lw6vwrUrr1XfUt68@cluster0.ge4ztbx.mongodb.net/?retryWrites=true&w=majority");
await client.connect();

singleton = client.db("chat");
return singleton;
}

/*
async function findAll(collection) {
const db = await connect();
return db.collection(collection).find().toArray();
}
*/

let deleteOne = async (collection, _id)=>{
	const db = await connect();
	return await db.collection(collection).remove(_id);
}

let findAll = async (collection)=>{
	const db = await connect();
	return await db.collection(collection).find().toArray();
}

async function insertOne(collection, objeto){
	const db = await connect();
	return db.collection(collection).insertOne(objeto);
}

let findOne = async (collection, _id)=>{
	const db = await connect();
	let obj = await db.collection(collection).find({"_id":new ObjectId(_id)}).toArray();
	if(obj)
	return obj[0];
return false;
}

let updateOne= async (collection, object, param)=> {
	const db = await connect();
	let result = await db.collection(collection).updateOne(param, { $set: object});
	return result;
}

module.exports = {findAll, insertOne, findOne, updateOne, deleteOne}