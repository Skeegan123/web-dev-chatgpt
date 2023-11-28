export class Thread {
    id: string;
    user_id: number;
    thread_id: string;
    created_at: Date;

    constructor(id: string, user_id: number, thread_id: string, created_at: Date) {
        this.id = id;
        this.user_id = user_id;
        this.thread_id = thread_id;
        this.created_at = created_at;
    }
}

module.exports = Thread;
