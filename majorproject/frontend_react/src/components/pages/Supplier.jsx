import '../../css/Role.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Box,
    Button as Btn,
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Chip,
    Stack,
    Paper,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    IconButton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WalletIcon from '@mui/icons-material/Wallet';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TimelineIcon from '@mui/icons-material/Timeline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RefreshIcon from '@mui/icons-material/Refresh';
import useAuth from '../../hooks/useAuth';

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

        if (!ethereum) {
            console.error('Make sure you have Metamask!');
            return null;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            return accounts[0];
        }

        console.error('No authorized account found');
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Supplier = () => {
    const [currentAccount, setCurrentAccount] = useState('');
    const { clearAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });
    }, []);

    const metrics = [
        {
            title: 'Fleet In Transit',
            value: '26 routes',
            changeLabel: 'On-time performance 94%',
            gradient: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)',
            icon: <LocalShippingIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Verified Hand-offs',
            value: '184 tx',
            changeLabel: '+37 this week',
            gradient: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
            icon: <VerifiedIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Carbon Footprint',
            value: '2.4t offset',
            changeLabel: 'Neutralized via green partners',
            gradient: 'linear-gradient(135deg, #10b981 0%, #65a30d 100%)',
            icon: <AssessmentIcon sx={{ fontSize: 34 }} />
        },
        {
            title: 'Exception Alerts',
            value: '3 active',
            changeLabel: 'All teams acknowledged',
            gradient: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)',
            icon: <NotificationsActiveIcon sx={{ fontSize: 34 }} />
        }
    ];

    const logisticsFeed = [
        {
            primary: 'Batch #SP-9932 delivered to Distribution Hub Delta',
            secondary: 'Blockchain event confirmed • 6 minutes ago',
            chip: 'Completed'
        },
        {
            primary: 'Cold chain verification passed for Perishables L-204',
            secondary: 'Sensor network synced • 27 minutes ago',
            chip: 'Verified'
        },
        {
            primary: 'Route optimization suggested for Mumbai > Pune corridor',
            secondary: 'Machine learning model recommendation',
            chip: 'Action'
        }
    ];

    const runwayTasks = [
        {
            title: 'Digitize bills of lading for Partner Orbit Trade',
            progress: 78,
            eta: 'Target end of day'
        },
        {
            title: 'Deploy smart seals for refrigerated fleet',
            progress: 46,
            eta: 'Installation phase'
        },
        {
            title: 'Sync supplier compliance documents',
            progress: 28,
            eta: 'Awaiting signatures'
        }
    ];

    const connectWallet = async () => {
        try {
            const ethereum = getEthereumObject();
            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        clearAuth();
        navigate('/login', { replace: true });
    };

    const menuItems = [
        {
            title: 'Check Profile',
            icon: <AccountCircleIcon sx={{ fontSize: 40 }} />,
            link: '/profile',
            color: '#0284c7',
            description: 'View and curate supplier identity'
        },
        {
            title: 'Scan Product',
            icon: <QrCodeScannerIcon sx={{ fontSize: 40 }} />,
            link: '/scanner',
            color: '#0f172a',
            description: 'Authenticate using QR verification'
        },
        {
            title: 'Track Inventory',
            icon: <InventoryIcon sx={{ fontSize: 40 }} />,
            link: '/retailer-products',
            color: '#059669',
            description: 'Monitor consignments in warehouses'
        },
        {
            title: 'Performance Insights',
            icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
            link: '/view-products',
            color: '#7c3aed',
            description: 'View analytics and SKU breakdowns'
        }
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #075985 35%, #0f766e 100%)',
                p: 4
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: 'white',
                            color: '#075985',
                            fontSize: 28,
                            fontWeight: 'bold'
                        }}
                    >
                        S
                    </Avatar>
                    <Box>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                            Welcome, Supplier
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            Stay ahead with transparent logistics intelligence
                        </Typography>
                    </Box>
                </Box>
                <Btn
                    endIcon={<LogoutIcon />}
                    variant="contained"
                    sx={{
                        bgcolor: 'white',
                        color: '#0f172a',
                        fontWeight: 'bold',
                        px: 3,
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.92)'
                        }
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Btn>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {metrics.map((metric) => (
                    <Grid item xs={12} sm={6} md={3} key={metric.title}>
                        <Paper
                            sx={{
                                background: metric.gradient,
                                borderRadius: 3,
                                color: 'white',
                                p: 3,
                                height: '100%',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    opacity: 0.18,
                                    background: 'radial-gradient(circle at 25% 15%, rgba(255,255,255,0.9), transparent 55%)'
                                }}
                            />
                            <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                                <Avatar
                                    sx={{
                                        width: 54,
                                        height: 54,
                                        bgcolor: 'rgba(255,255,255,0.18)',
                                        border: '2px solid rgba(255,255,255,0.4)',
                                        color: 'white'
                                    }}
                                >
                                    {metric.icon}
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                        {metric.value}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
                                        {metric.title}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={metric.changeLabel}
                                    sx={{
                                        alignSelf: 'flex-start',
                                        bgcolor: 'rgba(255,255,255,0.22)',
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Paper
                sx={{
                    p: 3,
                    mb: 4,
                    background: 'rgba(15,23,42,0.94)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(8,47,73,0.45)',
                    color: 'white'
                }}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <WalletIcon sx={{ fontSize: 40, color: '#38bdf8' }} />
                    {currentAccount ? (
                        <>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#38bdf8' }}>
                                    Wallet Connected
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'rgba(226,232,240,0.9)', fontFamily: 'monospace' }}
                                >
                                    {currentAccount.substring(0, 6)}...{currentAccount.substring(38)}
                                </Typography>
                            </Box>
                            <Chip
                                icon={<VerifiedIcon />}
                                label="Synced"
                                color="success"
                                sx={{ fontWeight: 'bold', color: '#09402a' }}
                            />
                        </>
                    ) : (
                        <>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                                    Connect Your Wallet
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(226,232,240,0.7)' }}>
                                    Link MetaMask to synchronize supply milestones
                                </Typography>
                            </Box>
                            <Btn
                                variant="contained"
                                onClick={connectWallet}
                                sx={{
                                    bgcolor: '#38bdf8',
                                    color: '#0f172a',
                                    fontWeight: 'bold',
                                    '&:hover': { bgcolor: '#0ea5e9', color: 'white' }
                                }}
                            >
                                Connect Wallet
                            </Btn>
                        </>
                    )}
                </Stack>
            </Paper>

            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={3}>
                        {menuItems.map((item) => (
                            <Grid item xs={12} sm={6} key={item.title}>
                                <Card
                                    component={Link}
                                    to={item.link}
                                    sx={{
                                        height: '100%',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255,255,255,0.95)',
                                        borderRadius: 3,
                                        boxShadow: '0 8px 32px rgba(15,23,42,0.35)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: 0,
                                            background: `radial-gradient(circle at top, ${item.color}22, transparent 60%)`
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 48px rgba(15,23,42,0.4)'
                                        }
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            position: 'relative',
                                            zIndex: 1
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: `${item.color}15`,
                                                border: `2px solid ${item.color}55`,
                                                color: item.color,
                                                mb: 2
                                            }}
                                        >
                                            {item.icon}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0f172a' }}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(15,23,42,0.65)', mt: 1 }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Stack spacing={3}>
                        <Paper
                            sx={{
                                p: 3,
                                background: 'rgba(255,255,255,0.95)',
                                borderRadius: 3,
                                boxShadow: '0 12px 40px rgba(15,23,42,0.28)'
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0f172a' }}>
                                    Logistics Feed
                                </Typography>
                                <Tooltip title="Refresh data">
                                    <IconButton size="small" sx={{ color: '#0f172a' }}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Divider sx={{ mb: 2 }} />
                            <List sx={{ py: 0 }}>
                                {logisticsFeed.map((item) => (
                                    <ListItem key={item.primary} sx={{ px: 0, alignItems: 'flex-start' }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#0ea5e9', color: 'white' }}>
                                                <TimelineIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                                    {item.primary}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography variant="body2" sx={{ color: 'rgba(15,23,42,0.7)' }}>
                                                        {item.secondary}
                                                    </Typography>
                                                    <Chip
                                                        label={item.chip}
                                                        size="small"
                                                        sx={{ mt: 1, bgcolor: '#0ea5e922', color: '#0f172a', fontWeight: 600 }}
                                                    />
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <Paper
                            sx={{
                                p: 3,
                                background: 'rgba(15,23,42,0.95)',
                                borderRadius: 3,
                                color: 'white',
                                boxShadow: '0 12px 40px rgba(8,47,73,0.45)'
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Execution Runway
                            </Typography>
                            <Stack spacing={3}>
                                {runwayTasks.map((task) => (
                                    <Box key={task.title}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {task.title}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(226,232,240,0.75)' }}>
                                                {task.eta}
                                            </Typography>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={task.progress}
                                            sx={{
                                                height: 8,
                                                borderRadius: 8,
                                                backgroundColor: 'rgba(148,163,184,0.25)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 8,
                                                    background: 'linear-gradient(90deg, #38bdf8 0%, #22d3ee 100%)'
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        <Paper
                            sx={{
                                p: 3,
                                background: 'rgba(255,255,255,0.95)',
                                borderRadius: 3,
                                boxShadow: '0 12px 40px rgba(15,23,42,0.28)'
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <TaskAltIcon sx={{ fontSize: 36, color: '#10b981' }} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0f172a' }}>
                                        Compliance Status
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(15,23,42,0.7)' }}>
                                        All supplier contracts and audits are up to date
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Supplier;