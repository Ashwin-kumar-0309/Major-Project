import React, { useState, useEffect } from 'react';
import {
    Snackbar,
    Alert,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            title: 'Product Verified',
            message: 'Your product #12345 has been successfully verified',
            time: '5 minutes ago',
            read: false,
        },
        {
            id: 2,
            type: 'warning',
            title: 'Pending Approval',
            message: 'Account approval is pending admin review',
            time: '1 hour ago',
            read: false,
        },
        {
            id: 3,
            type: 'info',
            title: 'New Feature',
            message: 'Check out our new QR scanning feature',
            time: '2 hours ago',
            read: true,
        },
    ]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setSnackbar({ open: true, message: 'All notifications marked as read', severity: 'success' });
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <VerifiedIcon sx={{ color: '#10b981' }} />;
            case 'warning':
                return <WarningIcon sx={{ color: '#f59e0b' }} />;
            case 'info':
            default:
                return <InfoIcon sx={{ color: '#3b82f6' }} />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'success':
                return '#10b98115';
            case 'warning':
                return '#f59e0b15';
            case 'info':
            default:
                return '#3b82f615';
        }
    };

    return (
        <>
            <IconButton onClick={handleClick} sx={{ ml: 2 }}>
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon sx={{ color: 'white' }} />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 480,
                        mt: 1.5,
                        borderRadius: 2,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Notifications
                    </Typography>
                    {unreadCount > 0 && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'primary.main',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Typography>
                    )}
                </Box>
                <Divider />
                <List sx={{ p: 0 }}>
                    {notifications.length === 0 ? (
                        <MenuItem disabled>
                            <Typography variant="body2" color="text.secondary">
                                No notifications
                            </Typography>
                        </MenuItem>
                    ) : (
                        notifications.map((notification) => (
                            <ListItem
                                key={notification.id}
                                onClick={() => markAsRead(notification.id)}
                                sx={{
                                    bgcolor: notification.read ? 'transparent' : getColor(notification.type),
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: notification.read ? 'action.hover' : getColor(notification.type),
                                    },
                                    borderLeft: notification.read ? 'none' : '3px solid',
                                    borderColor: notification.type === 'success' ? '#10b981' : 
                                                 notification.type === 'warning' ? '#f59e0b' : '#3b82f6',
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'transparent' }}>
                                        {getIcon(notification.type)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                                            {notification.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="caption" display="block">
                                                {notification.message}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                                                {notification.time}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Menu>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NotificationSystem;
