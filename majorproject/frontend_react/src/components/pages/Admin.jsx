/* eslint-disable react-hooks/exhaustive-deps, no-unused-vars */
import '../../css/Role.css'
import { LinkButton } from '../LinkButton';
import { 
    Box, Button as Btn, Card, CardContent, Typography, Grid, Chip, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, 
    DialogContent, DialogActions, TextField, Avatar, IconButton, Tooltip, 
    Badge, LinearProgress, Alert, Snackbar, Fade, Zoom, useTheme, alpha
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportIcon from '@mui/icons-material/Report';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Admin = () => {
    const theme = useTheme();
    const { clearAuth } = useAuth();
    const [pendingAccounts, setPendingAccounts] = useState([]);
    const [allManufacturers, setAllManufacturers] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [complaintDialogOpen, setComplaintDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [stats, setStats] = useState({
        totalManufacturers: 0,
        pendingApprovals: 0,
        totalComplaints: 0,
        openComplaints: 0
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    // Update stats whenever data changes
    useEffect(() => {
        updateStats();
    }, [pendingAccounts, allManufacturers, complaints]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchPendingAccounts(),
                fetchAllManufacturers(),
                fetchComplaints()
            ]);
        } catch (error) {
            showSnackbar('Error loading dashboard data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingAccounts = async () => {
        try {
            const response = await axios.get('/profileAll');
            const accounts = response.data.filter(profile => 
                (profile.role === 'manufacturer' || profile.role === 'retailer') && !profile.approved
            );
            setPendingAccounts(accounts);
        } catch (error) {
            console.error('Error fetching pending accounts:', error);
        }
    };

    const fetchAllManufacturers = async () => {
        try {
            const response = await axios.get('/profileAll');
            const manufacturers = response.data.filter(profile => 
                profile.role === 'manufacturer'
            );
            setAllManufacturers(manufacturers);
        } catch (error) {
            console.error('Error fetching manufacturers:', error);
        }
    };

    const fetchComplaints = async () => {
        try {
            const response = await axios.get('/complaints');
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
            // Fallback to mock data if endpoint doesn't exist yet
            const mockComplaints = [
                {
                    id: 1,
                    product_id: 'PROD001',
                    complainant: 'retailer_user1',
                    complaint_type: 'Product Quality',
                    description: 'Product received in damaged condition',
                    status: 'Open',
                    created_at: '2024-01-15'
                },
                {
                    id: 2,
                    product_id: 'PROD002',
                    complainant: 'consumer_user2',
                    complaint_type: 'Counterfeit',
                    description: 'Suspected fake product',
                    status: 'Under Review',
                    created_at: '2024-01-14'
                }
            ];
            setComplaints(mockComplaints);
        }
    };

    const updateStats = () => {
        setStats({
            totalManufacturers: allManufacturers.length,
            pendingApprovals: pendingAccounts.length,
            totalComplaints: complaints.length,
            openComplaints: complaints.filter(c => c.status === 'Open').length
        });
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleApproveManufacturer = async (manufacturerId) => {
        try {
            await axios.put(`/approve-manufacturer/${manufacturerId}`, { approved: true });
            await loadDashboardData();
            showSnackbar('Manufacturer approved successfully!', 'success');
        } catch (error) {
            console.error('Error approving manufacturer:', error);
            showSnackbar('Error approving manufacturer', 'error');
        }
    };

    const handleRejectManufacturer = async (manufacturerId) => {
        try {
            await axios.delete(`/reject-manufacturer/${manufacturerId}`);
            await loadDashboardData();
            showSnackbar('Manufacturer rejected and removed!', 'success');
        } catch (error) {
            console.error('Error rejecting manufacturer:', error);
            showSnackbar('Error rejecting manufacturer', 'error');
        }
    };

    const handleRefresh = () => {
        loadDashboardData();
    };

    const handleLogout = () => {
        clearAuth();
        window.location.href = '/login';
    };

    const handleViewManufacturer = (manufacturer) => {
        setSelectedManufacturer(manufacturer);
        setViewDialogOpen(true);
    };

    const handleViewComplaint = (complaint) => {
        setSelectedComplaint(complaint);
        setComplaintDialogOpen(true);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3
        }}>
            {/* Header */}
            <Fade in timeout={800}>
                <Card sx={{ 
                    mb: 3, 
                    background: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <AdminPanelSettingsIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        Admin Dashboard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Manage manufacturers, complaints, and system operations
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Refresh Data">
                                    <IconButton onClick={handleRefresh} disabled={loading}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                                <Btn 
                                    onClick={handleLogout}
                                    variant="outlined" 
                                    startIcon={<LogoutIcon />}
                                    sx={{ borderRadius: 2 }}
                                >
                                    Logout
                                </Btn>
                            </Box>
                        </Box>
                        {loading && <LinearProgress sx={{ mt: 2 }} />}
                    </CardContent>
                </Card>
            </Fade>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Zoom in timeout={1000}>
                        <Card sx={{ 
                            background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                            color: 'white',
                            '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s' }
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            {stats.totalManufacturers}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Total Manufacturers
                                        </Typography>
                                    </Box>
                                    <BusinessIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Zoom>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Zoom in timeout={1200}>
                        <Card sx={{ 
                            background: 'linear-gradient(45deg, #FF9800, #F57C00)',
                            color: 'white',
                            '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s' }
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            {stats.pendingApprovals}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Pending Approvals
                                        </Typography>
                                    </Box>
                                    <WarningIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Zoom>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Zoom in timeout={1400}>
                        <Card sx={{ 
                            background: 'linear-gradient(45deg, #2196F3, #1976D2)',
                            color: 'white',
                            '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s' }
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            {stats.totalComplaints}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Total Complaints
                                        </Typography>
                                    </Box>
                                    <ReportIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Zoom>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Zoom in timeout={1600}>
                        <Card sx={{ 
                            background: 'linear-gradient(45deg, #F44336, #D32F2F)',
                            color: 'white',
                            '&:hover': { transform: 'translateY(-4px)', transition: 'all 0.3s' }
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                            {stats.openComplaints}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                            Open Complaints
                                        </Typography>
                                    </Box>
                                    <SecurityIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Zoom>
                </Grid>
            </Grid>

            {/* Main Content */}
            <Grid container spacing={3}>
                {/* Pending Approvals */}
                <Grid item xs={12} lg={6}>
                    <Fade in timeout={1800}>
                        <Card sx={{ 
                            height: '100%',
                            background: alpha(theme.palette.background.paper, 0.95),
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Badge badgeContent={pendingAccounts.length} color="warning">
                                            <PeopleIcon />
                                        </Badge>
                                        Pending Approvals
                                    </Typography>
                                </Box>
                                {pendingAccounts.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary">
                                            No pending approvals
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            All manufacturer and retailer accounts are approved
                                        </Typography>
                                    </Box>
                                ) : (
                                    <TableContainer sx={{ maxHeight: 400 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Company</TableCell>
                                                    <TableCell>Username</TableCell>
                                                    <TableCell>Role</TableCell>
                                                    <TableCell align="center">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pendingAccounts.map((account) => (
                                                    <TableRow key={account.id} hover>
                                                        <TableCell>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                                {account.name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {account.username}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip label={account.role.charAt(0).toUpperCase() + account.role.slice(1)} color={account.role === 'retailer' ? 'secondary' : 'primary'} size="small" />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                                <Tooltip title="View Details">
                                                                    <IconButton 
                                                                        size="small" 
                                                                        onClick={() => handleViewManufacturer(account)}
                                                                        color="primary"
                                                                    >
                                                                        <VisibilityIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Approve">
                                                                    <IconButton 
                                                                        size="small" 
                                                                        onClick={() => handleApproveManufacturer(account.id)}
                                                                        color="success"
                                                                    >
                                                                        <CheckCircleIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Reject">
                                                                    <IconButton 
                                                                        size="small" 
                                                                        onClick={() => handleRejectManufacturer(account.id)}
                                                                        color="error"
                                                                    >
                                                                        <CancelIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </CardContent>
                        </Card>
                    </Fade>
                </Grid>

                {/* All Manufacturers */}
                <Grid item xs={12} lg={6}>
                    <Fade in timeout={2000}>
                        <Card sx={{ 
                            height: '100%',
                            background: alpha(theme.palette.background.paper, 0.95),
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <BusinessIcon />
                                    All Manufacturers ({allManufacturers.length})
                                </Typography>
                                
                                {allManufacturers.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <BusinessIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary">
                                            No manufacturers registered
                                        </Typography>
                                    </Box>
                                ) : (
                                    <TableContainer sx={{ maxHeight: 400 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Company</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell align="center">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {allManufacturers.map((manufacturer) => (
                                                    <TableRow key={manufacturer.id} hover>
                                                        <TableCell>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                                {manufacturer.name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip 
                                                                label={manufacturer.approved ? "Approved" : "Pending"} 
                                                                color={manufacturer.approved ? "success" : "warning"}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Tooltip title="View Details">
                                                                <IconButton 
                                                                    size="small" 
                                                                    onClick={() => handleViewManufacturer(manufacturer)}
                                                                    color="primary"
                                                                >
                                                                    <VisibilityIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </CardContent>
                        </Card>
                    </Fade>
                </Grid>

                {/* Complaints */}
                <Grid item xs={12}>
                    <Fade in timeout={2200}>
                        <Card sx={{ 
                            background: alpha(theme.palette.background.paper, 0.95),
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <Badge badgeContent={complaints.length} color="error">
                                        <ReportIcon />
                                    </Badge>
                                    Product Complaints
                                </Typography>
                                
                                {complaints.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <ReportIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary">
                                            No complaints reported
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            System is running smoothly
                                        </Typography>
                                    </Box>
                                ) : (
                                    <TableContainer sx={{ maxHeight: 400 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product ID</TableCell>
                                                    <TableCell>Complainant</TableCell>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell align="center">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {complaints.map((complaint) => (
                                                    <TableRow key={complaint.id} hover>
                                                        <TableCell>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                                {complaint.product_id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {complaint.complainant}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {complaint.complaint_type}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip 
                                                                label={complaint.status} 
                                                                color={complaint.status === 'Open' ? 'error' : 'warning'}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {complaint.created_at}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Tooltip title="View Details">
                                                                <IconButton 
                                                                    size="small" 
                                                                    onClick={() => handleViewComplaint(complaint)}
                                                                    color="primary"
                                                                >
                                                                    <VisibilityIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </CardContent>
                        </Card>
                    </Fade>
                </Grid>
            </Grid>

            {/* Legacy Admin Functions */}
            <Fade in timeout={2400}>
                <Card sx={{ 
                    mt: 3,
                    background: alpha(theme.palette.background.paper, 0.95),
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <DashboardIcon />
                            System Management
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <LinkButton 
                                to="/add-account" 
                                className="btns" 
                                buttonStyle='btn--long' 
                                buttonSize='btn--large'
                                sx={{ borderRadius: 2 }}
                            >
                                Add Account
                            </LinkButton>
                            <LinkButton 
                                to="/manage-account" 
                                className="btns" 
                                buttonStyle='btn--long' 
                                buttonSize='btn--large'
                                sx={{ borderRadius: 2 }}
                            >
                                Manage Accounts
                            </LinkButton>
                        </Box>
                    </CardContent>
                </Card>
            </Fade>

            {/* Manufacturer Details Dialog */}
            <Dialog 
                open={viewDialogOpen} 
                onClose={() => setViewDialogOpen(false)} 
                maxWidth="md" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(10px)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    background: 'linear-gradient(45deg, #2196F3, #1976D2)',
                    color: 'white'
                }}>
                    <BusinessIcon />
                    Manufacturer Details
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {selectedManufacturer && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    value={selectedManufacturer.name || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    value={selectedManufacturer.username || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={selectedManufacturer.description || ''}
                                    multiline
                                    rows={3}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Website"
                                    value={selectedManufacturer.website || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Location"
                                    value={selectedManufacturer.location || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Btn 
                        onClick={() => setViewDialogOpen(false)}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        Close
                    </Btn>
                </DialogActions>
            </Dialog>

            {/* Complaint Details Dialog */}
            <Dialog 
                open={complaintDialogOpen} 
                onClose={() => setComplaintDialogOpen(false)} 
                maxWidth="md" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(10px)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    background: 'linear-gradient(45deg, #F44336, #D32F2F)',
                    color: 'white'
                }}>
                    <ReportIcon />
                    Complaint Details
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {selectedComplaint && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Product ID"
                                    value={selectedComplaint.product_id || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Complainant"
                                    value={selectedComplaint.complainant || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Complaint Type"
                                    value={selectedComplaint.complaint_type || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Status"
                                    value={selectedComplaint.status || ''}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={selectedComplaint.description || ''}
                                    multiline
                                    rows={4}
                                    InputProps={{ readOnly: true }}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Btn 
                        onClick={() => setComplaintDialogOpen(false)}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        Close
                    </Btn>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ borderRadius: 2 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Admin;