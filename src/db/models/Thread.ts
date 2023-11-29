class Thread {
    id: string;
    user_id: number;
    thread_id: string;
    created_at: Date;
    name?: string;

    constructor(id: string, user_id: number, thread_id: string, created_at: Date, name: string) {
        this.id = id;
        this.user_id = user_id;
        this.thread_id = thread_id;
        this.created_at = created_at;
        this.name = name;
    }
}

module.exports = Thread;
