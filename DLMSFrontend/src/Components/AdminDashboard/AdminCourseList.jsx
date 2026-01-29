import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Chip,
    CircularProgress,
    Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create'; // Edit Icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';
import AddCourseModal from './AddCourseModal';
import MediaUpload from './MediaUpload'; // Re-using for specific course media if needed, or just link

export default function AdminCourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null); // New state for editing

    // Delete Dialog State
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    // View Dialog State
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [courseToView, setCourseToView] = useState(null);

    const fetchCourses = () => {
        setLoading(true);
        // Using Gateway URL
        fetch('http://localhost:8080/api/courses', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 401) throw new Error("Unauthorized: Please log in again.");
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching courses:", err);
                setLoading(false);
                // Optional: Redirect to login if 401
                if (err.message.includes("Unauthorized")) {
                    // window.location.href = '/login'; 
                }
            });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (!courseToDelete) return;

        fetch(`http://localhost:8080/api/courses/${courseToDelete.courseId}`, {
            method: 'DELETE',
            // Add Authorization header if needed (e.g. Bearer token from localStorage)
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.ok) {
                    setCourses(courses.filter(c => c.courseId !== courseToDelete.courseId));
                    setOpenDeleteDialog(false);
                    setCourseToDelete(null);
                } else {
                    alert("Failed to delete course. Ensure backend supports DELETE.");
                }
            })
            .catch(err => console.error("Error deleting course:", err));
    };

    const handleViewClick = (course) => {
        setCourseToView(course);
        setOpenViewDialog(true);
    };

    const handleEditClick = (course) => {
        setCourseToEdit(course);
        setOpenAddModal(true);
    };

    return (
        <Box>
            {/* Header Strip with Blue Background */}
            <Box sx={{
                bgcolor: 'rgba(102, 126, 234, 0.15)',
                borderRadius: 2,
                p: 3,
                mb: 4,
                border: '1px solid rgba(102, 126, 234, 0.3)',
                position: 'fixed',
                top: 24,
                left: { md: `calc(260px + 24px)` },
                right: 24,
                zIndex: 10,
                backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                            Course Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create, update, and remove courses
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            startIcon={<RefreshIcon />}
                            onClick={fetchCourses}
                            sx={{
                                bgcolor: 'white',
                                '&:hover': { bgcolor: '#f9fafb' }
                            }}
                        >
                            Refresh
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenAddModal(true)}
                            sx={{
                                bgcolor: '#667eea',
                                '&:hover': { bgcolor: '#5568d3' }
                            }}
                        >
                            Add New Course
                        </Button>
                    </Box>
                </Box>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3} sx={{ pt: '120px' }}>
                    {courses.map(course => (
                        <Grid item xs={12} sm={6} md={6} key={course.courseId}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Chip
                                            label={course.courseId}
                                            size="small"
                                            sx={{ bgcolor: '#f3f4f6', fontWeight: 600, color: '#6b7280' }}
                                        />
                                        {/* Placeholder for difficulty/category if available */}
                                    </Box>
                                    <Typography variant="h6" fontWeight={700} gutterBottom>
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        mb: 2
                                    }}>
                                        {course.description || "No description provided."}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto', color: '#6b7280' }}>
                                        <PersonIcon fontSize="small" />
                                        <Typography variant="caption">{course.instructor || "Unknown Instructor"}</Typography>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ borderTop: '1px solid #f3f4f6', p: 2 }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Button
                                            size="small"
                                            startIcon={<VisibilityIcon />}
                                            onClick={() => handleViewClick(course)}
                                        >
                                            Details
                                        </Button>
                                    </Box>
                                    <Tooltip title="Edit Course">
                                        <IconButton size="small" color="primary" onClick={() => handleEditClick(course)}>
                                            <CreateIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Course">
                                        <IconButton size="small" color="error" onClick={() => handleDeleteClick(course)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Add/Edit Course Modal */}
            <AddCourseModal
                open={openAddModal}
                onClose={() => {
                    setOpenAddModal(false);
                    setCourseToEdit(null); // Reset edit state on close
                }}
                onCourseAdded={fetchCourses}
                courseToEdit={courseToEdit} // Pass the course to edit
            />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Delete Course?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete "{courseToDelete?.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* View Course Details Dialog */}
            <Dialog
                open={openViewDialog}
                onClose={() => setOpenViewDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ borderBottom: '1px solid #eee' }}>Course Details</DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    {courseToView && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Title</Typography>
                                <Typography variant="h6">{courseToView.title}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Instructor</Typography>
                                <Typography variant="body1">{courseToView.instructor || 'N/A'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Description</Typography>
                                <Typography variant="body1" sx={{ bgcolor: '#f9fafb', p: 2, borderRadius: 1 }}>
                                    {courseToView.description || 'N/A'}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Course ID</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{courseToView.courseId}</Typography>
                            </Box>
                            {/* Media Linking Hint */}
                            <Box sx={{ mt: 2, p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
                                <Typography variant="caption" color="primary">Media Integration</Typography>
                                <Typography variant="body2">
                                    To attach video content, go to the "Media Upload" section and link the Media ID to this course ID.
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
