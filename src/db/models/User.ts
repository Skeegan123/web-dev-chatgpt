class User {
    id: number;
    username: string;
    created_at: Date;
    password?: string;

    constructor(id: number, username: string, created_at: Date, password?: string) {
        this.id = id;
        this.username = username;
        this.created_at = created_at;
        this.password = password;
    }
}

module.exports = User;
