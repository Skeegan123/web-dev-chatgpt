import { QueryOptions } from 'mysql';
import db from './index';
import OpenAI from 'openai';
const User = require('./models/User');
const Thread = require('./models/Thread');

// Helper function to execute a database query
const executeQuery = (query: string | QueryOptions, params: any = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

// Get database instance
export const getDb = () => db;

// Create a new user in the database
const createUser = async (username: any, password: any) => {
    const query = password ? 'INSERT INTO users (username, password) VALUES (?, ?)'
        : 'INSERT INTO users (username) VALUES (?)';
    const params: any = password ? [username, password] : [username];
    const results: any = await executeQuery(query, params);
    return new User(results.insertId, username, new Date(), password);
};

// Find an existing user or create a new one
export const findOrCreateUser = async (username: string, password: string | undefined) => {
    // First, check if the username exists
    const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const results: any = await executeQuery(query, username);

    // If the username does not exist, create a new user
    if (results.length === 0) {
        const user: User = await createUser(username, password);
        return user;
    }

    // If the username exists, check if the password matches
    const user = results[0];
    if (user.password === password) {
        // If the password matches, resolve the promise with the user
        return new User(user.id, user.username, user.created_at, user.password);
    } else {
        // If the password does not match, reject the promise with an error
        throw new Error('Invalid password');
    }
};

// Get user ID by username
const getUserIdByUsername = async (username: any) => {
    const query = 'SELECT id FROM users WHERE username = ? LIMIT 1';
    const results: any = await executeQuery(query, username);
    if (results.length === 0) {
        throw new Error('User not found');
    }
    return results[0].id as number;
};

// Create a new thread
export const createThread = async (username: string, newMessage: string | undefined, name: string | undefined) => {
    // Create a new thread
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const gptThread = await openai.beta.threads.create();

    // Create a new message
    if (newMessage) {
        await openai.beta.threads.messages.create(gptThread.id, {
            role: "user",
            content: newMessage,
        });
    }

    // Save the thread in the database
    const userId = await getUserIdByUsername(username);
    const query = 'INSERT INTO threads (user_id, thread_id) VALUES (?, ?)';
    const results: any = await executeQuery(query, [userId, gptThread.id]);

    // Set the chat name
    if (name) {
        setChatName(name, gptThread.id);
    }

    // Return a Thread object
    return new Thread(results.insertId, userId, gptThread.id, new Date());
};

// Save an existing thread
export const saveThread = async (username: any, threadId: any) => {
    // Get the user ID
    const userId = await getUserIdByUsername(username);

    // Save the thread in the database
    const query = 'INSERT INTO threads (user_id, thread_id) VALUES (?, ?)';
    const results: any = await executeQuery(query, [userId, threadId]);

    // Return a Thread object
    return new Thread(results.insertId, userId, threadId, new Date());
};

// Get all threads by username
export const getAllThreadsByUsername = async (username: string) => {
    // Get the user ID
    const userQuery = 'SELECT id FROM users WHERE username = ?';
    const threadsQuery = 'SELECT * FROM threads WHERE user_id = ?';
    const userResults: any = await executeQuery(userQuery, username);

    // If the user does not exist, throw an error
    if (userResults.length === 0) {
        throw new Error('User not found');
    }

    // Get the user ID
    const userId = userResults[0].id;

    // Get the threads
    const threadsResults: any = await executeQuery(threadsQuery, [userId]);

    // Convert the results to Thread objects
    const threads = threadsResults.map((row: Thread) => new Thread(row.id, row.user_id, row.thread_id, row.created_at, row.name));
    return threads;
};

// Get all threads
export const getAllThreads = async () => {
    const query = 'SELECT * FROM threads';
    const results: any = await executeQuery(query);

    // Convert the results to Thread objects
    const threads = results.map((row: Thread) => new Thread(row.id, row.user_id, row.thread_id, row.created_at));
    return threads;
};

// Set the name of a chat thread
export const setChatName = async (name: any, threadId: any) => {
    const query = 'UPDATE threads SET name = ? WHERE thread_id = ?';
    const results: any = await executeQuery(query, [name, threadId]);
    return results;
};

module.exports = {
    findOrCreateUser,
    saveThread,
    createThread,
    getAllThreadsByUsername,
    createUser,
    getAllThreads,
    setChatName
};