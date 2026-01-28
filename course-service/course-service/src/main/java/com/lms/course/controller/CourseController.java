package com.lms.course.controller;

import com.lms.course.dto.CourseCreateRequest;
import com.lms.course.dto.CourseResponse;
import com.lms.course.entity.Course;
import com.lms.course.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody CourseCreateRequest request) {
        Course course = courseService.createCourse(request);
        return new ResponseEntity<>(course, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        List<CourseResponse> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponse> getCourseByCourseId(@PathVariable int courseId) {
        return courseService.getCourseByCourseId(courseId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable int courseId) {
        if (courseService.deleteCourse(courseId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
