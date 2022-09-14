import { error, json } from '@sveltejs/kit';
import { parse } from 'cookie';

import * as database from '$lib/database.js';


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const req = await request.json();
 
    const client = await database.connect();
    const db = client.db("test");
    if (req.username && req.password) {
        const result = await db.collection("users").findOne({username:req.username})

        if (result) {
            throw new Error("Username already exists!")
        }
        else { 
            db.collection("users").insertOne(req);
            console.log("Successfully created " + req.username)
        }
    }   

    const body = { "register - post": "123" }

    const cookies = parse(request.headers.get('cookie') || '');

    console.log(cookies)


    return json(body);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {

    const cookies = parse(request.headers.get('cookie') || '');
    console.log(cookies)


    const client = await database.connect();
    const db = client.db("test");
    const collection = db.collection("users")

    collection.deleteOne({_id})

    const body = { "register - delete": "123" }

    


    return json(body);
}
