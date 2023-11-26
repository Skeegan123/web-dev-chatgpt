class User {
    id: number;
    username: string;
    created_at: Date;

    constructor(id: number, username: string, created_at: Date) {
        this.id = id;
        this.username = username;
        this.created_at = created_at;
    }
}

module.exports = User;
