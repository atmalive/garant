import { useState } from 'react';
import {
    TextField,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    MenuItem
} from '@mui/material';
import fakeData from '../../utils/fakeData';
import {Link} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";

export default function Report() {

    const [startDate, setStartDate] = useState('2025-01-01');
    const [endDate, setEndDate] = useState('2025-12-31');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    const filteredData = fakeData.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        if (itemDate < start || itemDate > end) {
            return false;
        }

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            const inName = item.name.toLowerCase().includes(lowerSearch);
            const inDesc = item.description.toLowerCase().includes(lowerSearch);
            if (!inName && !inDesc) {
                return false;
            }
        }

        if (statusFilter && item.status !== statusFilter) {
            return false;
        }

        if (minAmount && item.amount < parseFloat(minAmount)) {
            return false;
        }
        if (maxAmount && item.amount > parseFloat(maxAmount)) {
            return false;
        }

        return true;
    });

    return (
        <div className="flex relative flex-col gap-2 items-center justify-start min-h-screen p-4">
            <NavBar/>
            <Link className='absolute top-3 right-3' to={'/login'}>Выход</Link>

            <Typography variant="h4">
                Отчёт
            </Typography>

            <Paper className="p-6 mb-4 w-full max-w-3xl">
                <Typography variant="h6" >
                    Фильтры
                </Typography>

                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
                    <TextField
                        label="Начальная дата"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Конечная дата"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                    />
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
                    <TextField
                        label="Поиск (название/описание)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Статус"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">Все</MenuItem>
                        <MenuItem value="Новый">Новый</MenuItem>
                        <MenuItem value="На складе">На складе</MenuItem>
                        <MenuItem value="Старый">Старый</MenuItem>
                        <MenuItem value="Продан">Продан</MenuItem>
                        <MenuItem value="В резерве">В резерве</MenuItem>
                        <MenuItem value="Снят с продажи">Снят с продажи</MenuItem>
                    </TextField>
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <TextField
                        label="Мин. количество"
                        type="number"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Макс. количество"
                        type="number"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        fullWidth
                    />
                </div>
            </Paper>

            <Paper className="p-4 w-full max-w-6xl overflow-y-auto max-h-96">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Количество</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Описание</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {filteredData.length === 0 && (
                    <Typography className="mt-4 text-center">
                        Нет данных по выбранным фильтрам
                    </Typography>
                )}
            </Paper>
        </div>
    );
}