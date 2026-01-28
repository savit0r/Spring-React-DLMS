package com.lms.course.service;

import com.lms.course.dto.CourseCreateRequest;
import com.lms.course.dto.CourseResponse;
import com.lms.course.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    Course createCourse(CourseCreateRequest request);

    List<CourseResponse> getAllCourses();

    Optional<CourseResponse> getCourseByCourseId(int courseId);

    boolean deleteCourse(int courseId);
}
