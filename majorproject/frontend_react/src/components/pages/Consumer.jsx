import { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    CircularProgress,
    Chip,
    Stack,
    Avatar,
    Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ShieldIcon from '@mui/icons-material/Shield';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import apiClient from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';

const statusChipProps = (status) => {
    switch ((status || '').toLowerCase()) {
        case 'resolved':
            return { color: 'success', label: 'Resolved' };
        case 'in progress':
            return { color: 'warning', label: 'In Progress' };
        case 'rejected':
            return { color: 'default', label: 'Rejected' };
        default:
            return { color: 'error', label: status || 'Open' };
    }
};

const Consumer = () => {
    const { auth, clearAuth } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const username = useMemo(() => (auth?.user || '').toLowerCase(), [auth?.user]);

    useEffect(() => {
        const fetchData = async () => {
            if (!username) {
                setError('Missing user information. Please log in again.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await apiClient.get(`/consumer/products/${username}`);
                setProducts(response.data || []);
            } catch (err) {
                console.error('Failed to load consumer dashboard', err);
                if (err?.response?.status === 404) {
                    setProducts([]);
                    setError(null);
                } else if (err?.code === 'ERR_NETWORK') {
                    setError('Cannot reach the server. Please ensure the backend is running on port 5000.');
                } else {
                    setError('Failed to load your dashboard. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    const stats = useMemo(() => {
        if (!products?.length) {
            return {
                total: 0,
                verified: 0,
                alerts: 0,
                recent: 0
            };
        }

        const verified = products.filter((item) => (item.latest_status || '').toLowerCase() === 'resolved').length;
        const alerts = products.filter((item) => {
            const status = (item.latest_status || '').toLowerCase();
            return status && status !== 'resolved';
        }).length;
        const recent = products.filter((item) => dayjs(item.added_at).isAfter(dayjs().subtract(7, 'day'))).length;

        return {
            total: products.length,
            verified,
            alerts,
            recent
        };
    }, [products]);

    const experienceCards = [
        {
            title: 'Verify instantly',
            description: 'Scan blockchain-backed QR identities to confirm authenticity everywhere you shop.',
            icon: <QrCodeScannerIcon sx={{ fontSize: 36 }} />,
            actionLabel: 'Scan now',
            action: () => navigate('/scanner'),
            color: '#0ea5e9'
        },
        {
            title: 'Trusted protection',
            description: 'Monitor recall alerts and manufacturer updates without the guesswork.',
            icon: <ShieldIcon sx={{ fontSize: 36 }} />,
            actionLabel: 'View alerts',
            action: () => navigate('/consumer'),
            color: '#6366f1'
        },
        {
            title: 'Product history',
            description: 'See every handoff, certification, and complaint in a single data-rich timeline.',
            icon: <HistoryIcon sx={{ fontSize: 36 }} />,
            actionLabel: 'Review timeline',
            action: () => navigate('/consumer'),
            color: '#22c55e'
        }
    ];

    const handleViewProduct = (serialNumber) => {
        if (!serialNumber) return;
        navigate(`/consumer/products/${serialNumber}`, { state: { cameFromDashboard: true } });
    };

    const handleLogout = () => {
        clearAuth();
        navigate('/login', { replace: true });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #172554 45%, #1d4ed8 100%)',
                py: { xs: 4, md: 6 },
                px: { xs: 2, md: 6 }
            }}
        >
            <Box
                sx={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.9) 0%, rgba(14,165,233,0.85) 100%)',
                    borderRadius: 4,
                    p: { xs: 3, md: 5 },
                    mb: 5,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(15,23,42,0.35)'
                }}
            >
                <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,255,255,0.3), transparent 55%)', pointerEvents: 'none' }} />
                <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                    <Box>
                        <Chip
                            icon={<VerifiedIcon />}
                            label="Consumer Command Center"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.18)',
                                color: 'white',
                                fontWeight: 600,
                                mb: 2
                            }}
                        />
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 1 }}>
                            Welcome back{subtitleSuffix(username)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 520 }}>
                            Stay in control of everything you’ve verified—alerts, warranties, and trust signals all live here.
                        </Typography>
                    </Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                        <Button
                            variant="contained"
                            onClick={() => navigate('/scanner')}
                            startIcon={<QrCodeScannerIcon />}
                            sx={{
                                minWidth: 170,
                                background: 'rgba(15,23,42,0.85)',
                                color: 'white',
                                fontWeight: 700,
                                '&:hover': {
                                    background: 'rgba(15,23,42,1)'
                                }
                            }}
                        >
                            Scan a product
                        </Button>
                        <Tooltip title="Sign out">
                            <Button
                                variant="text"
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                                sx={{
                                    color: 'rgba(255,255,255,0.8)',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                Logout
                            </Button>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[{
                    label: 'Products secured',
                    value: stats.total,
                    helper: 'Blockchain-backed assets in your vault',
                    color: '#bfdbfe'
                }, {
                    label: 'Resolved issues',
                    value: stats.verified,
                    helper: 'Complaints with manufacturer confirmation',
                    color: '#bbf7d0'
                }, {
                    label: 'Attention needed',
                    value: stats.alerts,
                    helper: 'Open complaints or pending follow-ups',
                    color: '#fecdd3'
                }, {
                    label: 'Added this week',
                    value: stats.recent,
                    helper: 'New identities stored in the last 7 days',
                    color: '#c7d2fe'
                }].map((metric) => (
                    <Grid item xs={12} sm={6} md={3} key={metric.label}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background: 'rgba(15,23,42,0.78)',
                                backdropFilter: 'blur(12px)',
                                boxShadow: '0 14px 28px rgba(15,23,42,0.4)',
                                border: `1px solid ${metric.color}`,
                                color: 'white'
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                {metric.value}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {metric.label}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                                {metric.helper}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {experienceCards.map((card) => (
                    <Grid item xs={12} md={4} key={card.title}>
                        <Paper
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                p: 3,
                                background: 'rgba(255,255,255,0.9)',
                                boxShadow: '0 18px 36px rgba(15,23,42,0.18)'
                            }}
                        >
                            <Avatar sx={{ bgcolor: `${card.color}25`, color: card.color, mb: 2 }}>
                                {card.icon}
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {card.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#4b5563', mb: 2 }}>
                                {card.description}
                            </Typography>
                            <Button variant="text" sx={{ fontWeight: 600, color: card.color }} onClick={card.action}>
                                {card.actionLabel}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Paper sx={{ p: 3, maxWidth: 480, mx: 'auto', textAlign: 'center', borderRadius: 3, bgcolor: 'rgba(15,23,42,0.85)', color: 'white' }}>
                    <Typography sx={{ mb: 2 }}>{error}</Typography>
                    <Button variant="contained" onClick={() => window.location.reload()} sx={{ bgcolor: 'white', color: '#0f172a', fontWeight: 600 }}>Try Again</Button>
                </Paper>
            ) : products.length === 0 ? (
                <Paper sx={{ p: 3, maxWidth: 520, mx: 'auto', textAlign: 'center', borderRadius: 3, background: 'rgba(255,255,255,0.92)', boxShadow: '0 16px 32px rgba(15,23,42,0.2)' }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Your vault is waiting</Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Scan a product’s QR identity, then choose “Save to My Products” to track it here with live authenticity updates.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/scanner')}>
                        Scan a Product
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {products.map((product) => {
                        const chip = statusChipProps(product.latest_status);
                        const expiryStatus = getExpiryStatus(product.expiry_date);
                        return (
                            <Grid item xs={12} sm={6} md={4} key={`${product.serial_number}-${product.added_at}`}> 
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 18px 36px rgba(15,23,42,0.18)' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Chip
                                            size="small"
                                            label={product.brand || 'Tracked asset'}
                                            sx={{ mb: 2, bgcolor: 'rgba(59,130,246,0.12)', color: '#1d4ed8', fontWeight: 600 }}
                                        />
                                        <Typography variant="caption" sx={{ color: '#6b7280', letterSpacing: 0.5 }}>
                                            Serial #{product.serial_number || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                                            {product.name || 'Product'}
                                        </Typography>
                                        {product.manufacturer && (
                                            <Typography variant="body2" sx={{ mb: 1, color: '#475569' }}>
                                                Manufacturer: {product.manufacturer}
                                            </Typography>
                                        )}
                                        {product.expiry_date && (
                                            <Typography variant="body2" sx={{ mb: 1, color: '#475569' }}>
                                                Expires on {dayjs(product.expiry_date).format('MMM D, YYYY')}
                                            </Typography>
                                        )}
                                        {expiryStatus && (
                                            <Typography variant="caption" sx={{ color: expiryStatus.color }}>
                                                {expiryStatus.message}
                                            </Typography>
                                        )}

                                        {product.latest_status && (
                                            <Box sx={{ mt: 2 }}>
                                                <Chip size="small" color={chip.color} label={chip.label} />
                                            </Box>
                                        )}

                                        {product.latest_complaint && (
                                            <Typography variant="body2" sx={{ mt: 1, color: '#4b5563' }}>
                                                Last note: {product.latest_complaint}
                                            </Typography>
                                        )}
                                    </CardContent>
                                    <CardActions sx={{ px: 3, pb: 3 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleViewProduct(product.serial_number)}
                                        >
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
};

const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null;
    const expiry = dayjs(expiryDate);
    if (!expiry.isValid()) return null;

    const today = dayjs();
    const diff = expiry.startOf('day').diff(today.startOf('day'), 'day');

    if (diff < 0) {
        return { color: 'error.main', message: `Expired ${expiry.fromNow()}` };
    }
    if (diff === 0) {
        return { color: 'warning.main', message: 'Expires today' };
    }
    if (diff <= 2) {
        return { color: 'warning.main', message: `Expires in ${diff} day${diff === 1 ? '' : 's'}` };
    }
    return { color: '#475569', message: `Expires on ${expiry.format('MMM D, YYYY')}` };
};

const subtitleSuffix = (username) => {
    if (!username) return '!';
    return `, ${username}!`;
};

export default Consumer;
