import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import MediaUpload from './MediaUpload';
import AdminCourseList from './AdminCourseList';

export default function AdminDashboard() {
    // Context provided by AdminLayout
    const { activeSection } = useOutletContext() || { activeSection: 'courses' };

    return (
        <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
            {/* Dynamic Content */}
            {activeSection === 'courses' && (
                <Box>
                    {/* Course List & Actions */}
                    <AdminCourseList />

                    {/* Media Upload Section (Optional: Can be its own tab or part of course management) */}
                    <Box sx={{ mt: 6, pt: 4, borderTop: '1px dashed #e5e7eb' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Quick Media Upload</Typography>
                        <MediaUpload />
                    </Box>
                </Box>
            )}

            {activeSection === 'users' && (
                <Box sx={{ p: 5, textAlign: 'center', bgcolor: 'white', borderRadius: 2, border: '1px dashed #ccc' }}>
                    <Typography variant="h5" color="text.secondary">User Management Module</Typography>
                    <Typography>Coming Soon</Typography>
                </Box>
            )}

            {activeSection === 'settings' && (
                <Box sx={{ p: 5, textAlign: 'center', bgcolor: 'white', borderRadius: 2, border: '1px dashed #ccc' }}>
                    <Typography variant="h5" color="text.secondary">System Settings</Typography>
                    <Typography>Coming Soon</Typography>
                </Box>
            )}
        </Box>
    );
}
