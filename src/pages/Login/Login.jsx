import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            setError('Пользователь не найден. Зарегистрируйтесь!');
            return;
        }
        if (storedUser.email === email && storedUser.password === password) {
            // Авторизуем
            navigate('/report');
        } else {
            setError('Неверные email или пароль.');
        }
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
                    Вход
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
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
                <Button variant="contained" fullWidth onClick={handleLogin}>
                    Войти
                </Button>
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Typography variant="body2">
                        Нет аккаунта? <Link to="/register">Регистрация</Link>
                    </Typography>
                    <Typography variant="body2">
                        <Link to="/reset-password">Забыли пароль?</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}