import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Service/api';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Button,
    AppBar,
    Toolbar,
    Checkbox,
    LinearProgress,
    Tooltip,
    Dialog,
    DialogContent,
    Fade
} from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import FileDownloadIcon from '@mui/icons-material/FileDownload';

const sidebarWidth = 320;

// Helper to get consistent ID
const getLessonId = (lesson) => lesson.id || lesson._id || lesson.lessonId;

export default function CoursePlayer() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showCongrats, setShowCongrats] = useState(false);
    const [completionSent, setCompletionSent] = useState(false);
    const [videoSource, setVideoSource] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch Course Details
    useEffect(() => {
        setLoading(true);
        api.get(`/api/courses/${courseId}`)
            .then(res => {
                console.log("Fetched Course Content:", res.data);
                setCourse(res.data);
                // Initialize active lesson
                if (res.data.modules && res.data.modules.length > 0) {
                    const firstModule = res.data.modules[0];
                    if (firstModule.lessons && firstModule.lessons.length > 0) {
                        setActiveLesson(firstModule.lessons[0]);
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load course content:", err);
                setLoading(false);
            });
    }, [courseId]);

    const allLessons = course?.modules?.flatMap(m => m.lessons) || [];

    // Fetch Video/Media
    useEffect(() => {
        if (activeLesson?.mediaId) {
            if (activeLesson.mediaId.startsWith('http')) {
                setVideoSource(activeLesson.mediaId);
            } else {
                api.get(`/api/media/${activeLesson.mediaId}`)
                    .then(res => {
                        console.log("Fetched Media URL:", res.data);
                        setVideoSource(res.data);
                    })
                    .catch(err => {
                        console.error("Failed to fetch media:", err);
                    });
            }
        } else {
            setVideoSource('');
        }
    }, [activeLesson]);

    const handleDownload = (mediaId, title, lessonId) => {
        if (!mediaId) return;

        // Mark as complete immediately when opening PDF/Download
        if (lessonId && !completedLessons.includes(lessonId)) {
            toggleComplete(lessonId);
        }

        // Use api.get to fetch as blob (authenticated)
        api.get(`/api/media/${mediaId}`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', title || `download-${mediaId}`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(err => console.error("Download failed:", err));
    };

    // Check for completion
    useEffect(() => {
        if (allLessons.length > 0 && completedLessons.length === allLessons.length && !completionSent) {
            handleCourseCompletion();
        }
    }, [completedLessons, allLessons, completionSent]);

    const handleCourseCompletion = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const url = `http://localhost:8080/api/enrollments/complete?userId=${userId}&courseId=${courseId}`;

        api.put(url, {})
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    setCompletionSent(true);
                    setShowCongrats(true);
                }
            })
            .catch(error => {
                console.error("Completion Request Failed:", error);
            });
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLessonChange = (lesson) => {
        setActiveLesson(lesson);
    };

    const toggleComplete = (lessonId) => {
        if (completedLessons.includes(lessonId)) {
            setCompletedLessons(completedLessons.filter(id => id !== lessonId));
        } else {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    const currentIndex = allLessons.findIndex(l => getLessonId(l) === getLessonId(activeLesson || {}));

    // Helper to Move Next
    const handleNext = () => {
        if (currentIndex < allLessons.length - 1) {
            setActiveLesson(allLessons[currentIndex + 1]);
        }
    };
    const handlePrev = () => {
        if (currentIndex > 0) {
            setActiveLesson(allLessons[currentIndex - 1]);
        }
    };

    const progress = allLessons.length > 0 ? Math.round((completedLessons.length / allLessons.length) * 100) : 0;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#0f172a' }}>

            {/* Top Bar */}
            <AppBar position="static" sx={{ bgcolor: '#1e293b', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Toolbar variant="dense">
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/student')}
                        sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white' }, mr: 2 }}
                    >
                        Dashboard
                    </Button>
                    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        {course?.title}
                    </Typography>

                    <Tooltip title={isSidebarOpen ? "Focus Mode (Hide Sidebar)" : "Show Sidebar"}>
                        <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
                            {isSidebarOpen ? <AspectRatioIcon /> : <MenuIcon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            {/* Main Layout Area */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

                {/* Left: Video Area (Grows) */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: 'black', position: 'relative' }}>
                    {/* Fixed: Absolute positioning for iframe to fill container */}
                    <Box sx={{ flexGrow: 1, position: 'relative', width: '100%', height: '100%' }}>
                        {activeLesson ? (
                            <iframe
                                src={videoSource}
                                title={activeLesson.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                            ></iframe>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <Typography color="white">Select a lesson to start</Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Bottom Controls */}
                    <Box sx={{ p: 2, bgcolor: '#1e293b', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>{activeLesson?.title}</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>Lesson {currentIndex + 1} of {allLessons.length}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<KeyboardArrowLeftIcon />}
                                disabled={currentIndex <= 0}
                                onClick={handlePrev}
                                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                            >
                                Prev
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                endIcon={<KeyboardArrowRightIcon />}
                                disabled={currentIndex === allLessons.length - 1}
                                onClick={handleNext}
                                sx={{ bgcolor: '#667eea', '&:hover': { bgcolor: '#5568d3' } }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Right: Sidebar / Playlist */}
                {isSidebarOpen && (
                    <Box sx={{
                        width: sidebarWidth,
                        bgcolor: '#1e293b',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        flexShrink: 0
                    }}>
                        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <Typography variant="subtitle2" sx={{ color: '#94a3b8', mb: 1 }}>YOUR PROGRESS</Typography>
                            <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#10b981' } }} />
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5, display: 'block', textAlign: 'right' }}>
                                {progress}% Completed
                            </Typography>
                        </Box>

                        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                            {course?.modules.map((module, index) => (
                                <Box key={index}>
                                    <Typography sx={{
                                        p: 2,
                                        bgcolor: 'rgba(255,255,255,0.03)',
                                        fontWeight: 700,
                                        fontSize: '0.8rem',
                                        color: '#cbd5e1',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {module.title}
                                    </Typography>
                                    <List disablePadding>
                                        {module.lessons.map((lesson) => {
                                            const lId = getLessonId(lesson);
                                            const isActive = getLessonId(activeLesson || {}) === lId;

                                            return (
                                                <ListItem key={lId} disablePadding>
                                                    <ListItemButton
                                                        selected={isActive}
                                                        onClick={() => handleLessonChange(lesson)}
                                                        sx={{
                                                            pl: 3,
                                                            borderLeft: isActive ? '3px solid #667eea' : '3px solid transparent',
                                                            bgcolor: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                                                            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                                                            '&.Mui-selected': { bgcolor: 'rgba(102, 126, 234, 0.15)' }
                                                        }}
                                                    >
                                                        <Checkbox
                                                            edge="start"
                                                            checked={completedLessons.includes(lId)}
                                                            onChange={(e) => {
                                                                e.stopPropagation();
                                                                toggleComplete(lId);
                                                            }}
                                                            icon={<CheckCircleIcon sx={{ color: 'rgba(255,255,255,0.1)' }} />}
                                                            checkedIcon={<CheckCircleIcon sx={{ color: '#10b981' }} />}
                                                            size="small"
                                                        />
                                                        <ListItemText
                                                            primary={lesson.title}
                                                            secondary={lesson.duration}
                                                            primaryTypographyProps={{
                                                                color: isActive ? '#fff' : '#cbd5e1',
                                                                fontWeight: isActive ? 600 : 400,
                                                                fontSize: '0.9rem'
                                                            }}
                                                            secondaryTypographyProps={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}
                                                        />
                                                        {lesson.mediaId && (
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDownload(lesson.mediaId, lesson.title, lId);
                                                                }}
                                                                size="small"
                                                                sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#667eea' }, mr: 1 }}
                                                            >
                                                                <FileDownloadIcon fontSize="small" />
                                                            </IconButton>
                                                        )}
                                                        {isActive && <PlayCircleFilledIcon fontSize="small" sx={{ color: '#667eea' }} />}
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Congratulations Modal */}
            <Dialog
                open={showCongrats}
                onClose={() => setShowCongrats(false)}
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        borderRadius: '24px',
                        padding: '1rem',
                        textAlign: 'center',
                        maxWidth: '400px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
                    <IconButton onClick={() => setShowCongrats(false)} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 4, pb: 4 }}>
                    <Box sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        mb: 1
                    }}>
                        <EmojiEventsIcon sx={{ fontSize: 48, color: '#059669' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        Congratulations!
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                        You've completed <b>{course?.title}</b>. <br />Keep up the amazing work!
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setShowCongrats(false)}
                        sx={{
                            bgcolor: 'white',
                            color: '#059669',
                            fontWeight: 700,
                            borderRadius: '50px',
                            px: 4,
                            py: 1,
                            mt: 2,
                            '&:hover': { bgcolor: '#f0fdf4' }
                        }}
                    >
                        Continue Learning
                    </Button>
                </DialogContent>
            </Dialog>

        </Box>
    );
}
