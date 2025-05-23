import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Authentication.css';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                await handleRegister(username, password, name);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const switchForm = () => {
        setFormState(formState === 0 ? 1 : 0);
        setError("");
        setMessage("");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h1>{formState === 0 ? 'Login' : 'Register'}</h1>
                </div>
                <div className="auth-form">
                    {formState === 1 && (
                        <div className="form-group">
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <Button
                        className="auth-button"
                        variant="contained"
                        onClick={handleAuth}
                        fullWidth
                    >
                        {formState === 0 ? 'Login' : 'Register'}
                    </Button>
                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}
                    <div className="switch-form">
                        <Button onClick={switchForm}>
                            {formState === 0 ? 'Need an account? Register' : 'Already have an account? Login'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
