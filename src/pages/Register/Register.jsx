import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        const userData = {
            email,
            password,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        alert('Регистрация успешна!');
        navigate('/login');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }} elevation={3}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Регистрация
                </Typography>
                <TextField
                    label="Email"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" fullWidth onClick={handleRegister}>
                    Зарегистрироваться
                </Button>
                <Box mt={2}>
                    <Typography variant="body2">
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}