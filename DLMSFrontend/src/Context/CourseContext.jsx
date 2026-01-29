import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../Service/api';

const CourseContext = createContext();

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const savedCourses = localStorage.getItem('enrolledCourses');
        if (savedCourses) {
            setEnrolledCourses(JSON.parse(savedCourses));
        }
    }, []);

    // Save to local storage whenever enrolledCourses changes
    useEffect(() => {
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    }, [enrolledCourses]);

    const enrollInCourse = (course) => {
        if (!enrolledCourses.find(c => c.courseId === course.courseId)) {
            setEnrolledCourses([...enrolledCourses, course]);
            return true; // Enrolled successfully
        }
        return false; // Already enrolled
    };

    const isEnrolled = (courseId) => {
        return enrolledCourses.some(c => c.courseId === courseId);
    };

    const fetchUserEnrollments = async (userId) => {
        try {
            const response = await api.get(`/api/enrollments/user/${userId}`);
            if (response.status === 200) {
                setEnrolledCourses(response.data);
                localStorage.setItem('enrolledCourses', JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Failed to fetch enrollments:", error);
        }
    };

    return (
        <CourseContext.Provider value={{ enrolledCourses, enrollInCourse, isEnrolled, fetchUserEnrollments }}>
            {children}
        </CourseContext.Provider>
    );
};
