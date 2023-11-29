import React from 'react';

const LoginModal = ({ onLogin, onGuest }: any) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className="login-modal">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onLogin(username, password);
                    }

                }} />
            <button onClick={() => onLogin(username, password)}>Login/Sign Up</button>
            <button onClick={onGuest}>Guest</button>
        </div>
    );
};

export default LoginModal;