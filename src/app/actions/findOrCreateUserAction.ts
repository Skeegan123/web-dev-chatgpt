'use server';

import { findOrCreateUser } from "@/db/utils";
const Thread = require('@/db/models/Thread');

async function findOrCreateUserAction(username: string, password?: string) {
    try {
        const user = await findOrCreateUser(username, password);

        return user.username;
    } catch (error) {
        console.error('Error in createNewThreadAction:', error);
        throw error;
    }
}

export { findOrCreateUserAction };
