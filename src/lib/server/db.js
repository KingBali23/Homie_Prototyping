import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
	throw new Error(
		'MONGODB_URI ist nicht gesetzt. Bitte .env-Datei (lokal) bzw. Netlify-Environment-Variables prüfen.'
	);
}

const client = new MongoClient(MONGODB_URI);
let connected = false;

async function getClient() {
	if (!connected) {
		await client.connect();
		connected = true;
	}
	return client;
}

export async function getDb() {
	const c = await getClient();
	return c.db('homie');
}

export async function getInserateCollection() {
	const db = await getDb();
	return db.collection('inserate');
}

export async function getProfileCollection() {
	const db = await getDb();
	return db.collection('profile');
}

export { ObjectId };
