import db from './index';
import OpenAI from 'openai';
const User = require('./models/User');
const Thread = require('./models/Thread');

export const getDb = () => db;

const createUser = async (username: string): Promise<User> => {
    const query = 'INSERT INTO users (username) VALUES (?)';

    return new Promise((resolve, reject) => {
        db.query(query, [username], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(new User(results.insertId, username, new Date()));
        });
    });
};

const findOrCreateUser = async (username: string): Promise<User> => {
    try {
        const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';

        return new Promise((resolve, reject) => {
            db.query(query, [username], async (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.length === 0) {
                    const user: User = await createUser(username);
                    return resolve(user);
                }
                return resolve(new User(results[0].id, results[0].username, results[0].created_at));
            });
        });
    } catch (error) {
        console.error('Error in findOrCreateUser:', error);
        throw error;
    }
}

const getUserIdByUsername = async (username: string): Promise<number> => {
    const query = 'SELECT id FROM users WHERE username = ? LIMIT 1';

    return new Promise((resolve, reject) => {
        db.query(query, [username], (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length === 0) {
                return reject(new Error('User not found'));
            }
            return resolve(results[0].id as number);
        });
    });
};

export const createThread = async (username: string, newMessage?: string): Promise<Thread> => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const gptThread = await openai.beta.threads.create();

    if (newMessage) {
        await openai.beta.threads.messages.create(gptThread.id, {
            role: "user",
            content: newMessage,
        });
    }

    const user: User = await findOrCreateUser(username);
    const userId: number = user.id;

    const query = 'INSERT INTO threads (user_id, thread_id) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [userId, gptThread.id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(new Thread(results.insertId, userId, gptThread.id, new Date()));
        });
    });
};

const saveThread = async (username: string, threadId: string): Promise<Thread> => {
    try {
        const userId = await getUserIdByUsername(username);

        const query = 'INSERT INTO threads (user_id, thread_id) VALUES (?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [userId, threadId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(new Thread(results.insertId, userId, threadId, new Date()));
            });
        });
    } catch (error) {
        console.error('Error in saveThread:', error);
        throw error;
    }
};

export const getAllThreadsByUsername = async (username: string) => {
    const userQuery = 'SELECT id FROM users WHERE username = ?';
    const threadsQuery = 'SELECT * FROM threads WHERE user_id = ?';
    console.log("before promise");
    return new Promise((resolve, reject) => {
        db.query(userQuery, username, (error, userResults) => {
            console.log("before error");
            if (error) {
                console.log("in error");
                return reject(error);
            }
            if (userResults.length === 0) {
                console.log("length = 0");
                return reject(new Error('User not found'));
            }
            console.log(userResults);
            const userId = userResults[0].id;
            db.query(threadsQuery, [userId], (error, threadsResults) => {
                if (error) {
                    return reject(error);
                }

                const threads = threadsResults.map((row: Thread) => new Thread(row.id, row.user_id, row.thread_id, row.created_at));
                return resolve(threads);
            });
        });
    });
};

module.exports = {
    saveThread,
    createThread,
    getAllThreadsByUsername,
    createUser
};