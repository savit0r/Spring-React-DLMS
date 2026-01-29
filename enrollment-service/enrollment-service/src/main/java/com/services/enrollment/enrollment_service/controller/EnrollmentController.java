package com.services.enrollment.enrollment_service.controller;

import com.services.enrollment.enrollment_service.dto.EnrollmentRequest;
import com.services.enrollment.enrollment_service.entity.Enrollment;
import com.services.enrollment.enrollment_service.service.EnrollmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public ResponseEntity<Enrollment> enrollStudent(@RequestBody EnrollmentRequest request) {
        Enrollment enrollment = enrollmentService.enrollStudent(request);
        return new ResponseEntity<>(enrollment, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Enrollment>> getUserEnrollments(@RequestParam String userId) {
        // If courseId is passed, maybe filter? For now, list all.
        // Wait, CourseCard uses "GET /api/enrollments?userId=...&courseId=..." to
        // verify.
        // Let's support that check.
        return ResponseEntity.ok(enrollmentService.getUserEnrollments(userId));
    }

    @PutMapping("/complete")
    public ResponseEntity<String> markCourseComplete(@RequestParam String userId, @RequestParam Integer courseId) {
        boolean success = enrollmentService.markCourseComplete(userId, courseId);
        if (success) {
            return ResponseEntity.ok("Course marked as completed");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
    }
}
