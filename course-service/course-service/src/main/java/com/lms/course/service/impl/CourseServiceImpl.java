package com.lms.course.service.impl;

import com.lms.course.dto.CourseCreateRequest;
import com.lms.course.dto.CourseResponse;
import com.lms.course.entity.Course;
import com.lms.course.mapper.CourseMapper;
import com.lms.course.repository.CourseRepository;
import com.lms.course.service.CourseService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course createCourse(CourseCreateRequest request) {
        Course course = CourseMapper.toEntity(request);
        return courseRepository.save(course);
    }

    @Override
    public List<CourseResponse> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream()
                .map(CourseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CourseResponse> getCourseByCourseId(int courseId) {
        return courseRepository.findByCourseId(courseId)
                .map(CourseMapper::toResponse);
    }

    @Override
    public boolean deleteCourse(int courseId) {
        if (courseRepository.findByCourseId(courseId).isPresent()) {
            courseRepository.deleteByCourseId(courseId);
            return true;
        }
        return false;
    }
}
