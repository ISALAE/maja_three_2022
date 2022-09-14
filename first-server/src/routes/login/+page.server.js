import { error, json } from '@sveltejs/kit';
import { serialize } from 'cookie';

import * as database from '$lib/database.js';
import { findAncestor } from 'typescript';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, setHeaders }) {
    const req = await request.json();
    console.log(req);

    const client = await database.connect();
    const db = client.db("test");
    if (req.username && req.password) {
        const result = await db.collection("users").findOne({username:req.username})

        if (result) {
            if (result.password == req.password) {
                console.log("Successfully logged in!")
            } else {
                throw new Error("Login failed!")
            }    
        }
       else {
         throw new Error("Invalid username!")
       }
    }


    // check if a user exists in db where username and password matches

    const body = { "login - post": "123" }

    if (false) {    
        throw error(400, "user does not exist")
    }

    let user = {
        id: "secret"
    };


    setHeaders({
        'set-cookie': serialize('token', user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 120 // two minutes
        })
    });

    return json(body);
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function DELETE({ setHeaders }) {

    const body = { "login - delete": "123" }

    setHeaders({
        'set-cookie': serialize('token', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0 // one minute
        })
    });

    return json(body);
}
