import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    My App
                </Typography>
                <div>
                    <Button color="inherit" component={Link} to="/report">
                        Отчёт
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Выйти
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}