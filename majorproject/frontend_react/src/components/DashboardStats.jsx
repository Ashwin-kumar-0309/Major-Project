import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    LinearProgress,
    Chip,
    Stack,
    IconButton,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InventoryIcon from '@mui/icons-material/Inventory';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';

const DashboardStats = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        verifiedProducts: 0,
        pendingProducts: 0,
        fakeReports: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            // Simulate API call - replace with actual API endpoint
            setTimeout(() => {
                setStats({
                    totalProducts: 1247,
                    verifiedProducts: 1189,
                    pendingProducts: 45,
                    fakeReports: 13,
                });
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: <InventoryIcon sx={{ fontSize: 40 }} />,
            color: '#667eea',
            bgColor: '#667eea15',
            change: '+12.5%',
            changePositive: true,
        },
        {
            title: 'Verified Products',
            value: stats.verifiedProducts,
            icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
            color: '#10b981',
            bgColor: '#10b98115',
            change: '+8.2%',
            changePositive: true,
        },
        {
            title: 'Pending Verification',
            value: stats.pendingProducts,
            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
            color: '#f59e0b',
            bgColor: '#f59e0b15',
            change: '-3.1%',
            changePositive: false,
        },
        {
            title: 'Fake Reports',
            value: stats.fakeReports,
            icon: <WarningIcon sx={{ fontSize: 40 }} />,
            color: '#ef4444',
            bgColor: '#ef444415',
            change: '-15.3%',
            changePositive: true,
        },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Dashboard Overview
                </Typography>
                <IconButton onClick={fetchStats} disabled={loading}>
                    <RefreshIcon />
                </IconButton>
            </Box>

            <Grid container spacing={3}>
                {statCards.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                background: 'rgba(255,255,255,0.95)',
                                borderRadius: 3,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {loading ? '...' : stat.value.toLocaleString()}
                                        </Typography>
                                        <Chip
                                            label={stat.change}
                                            size="small"
                                            sx={{
                                                bgcolor: stat.changePositive ? '#10b98115' : '#ef444415',
                                                color: stat.changePositive ? '#10b981' : '#ef4444',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </Box>
                                    <Avatar
                                        sx={{
                                            bgcolor: stat.bgColor,
                                            color: stat.color,
                                            width: 56,
                                            height: 56,
                                        }}
                                    >
                                        {stat.icon}
                                    </Avatar>
                                </Stack>
                                {loading && (
                                    <LinearProgress sx={{ mt: 2, borderRadius: 1 }} />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DashboardStats;
