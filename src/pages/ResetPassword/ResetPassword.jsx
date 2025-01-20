import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleReset = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || storedUser.email !== email) {
            setError('Пользователь с таким email не найден');
            return;
        }
        storedUser.password = newPassword;
        localStorage.setItem('user', JSON.stringify(storedUser));
        alert('Пароль успешно обновлён!');
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
                    Сброс пароля
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
                    label="Новый пароль"
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button variant="contained" fullWidth onClick={handleReset}>
                    Сбросить пароль
                </Button>
                <Box mt={2}>
                    <Typography variant="body2">
                        <Link to="/login">Вернуться к входу</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}