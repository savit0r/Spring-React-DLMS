package com.services.enrollment.enrollment_service.service;

import com.services.enrollment.enrollment_service.dto.EnrollmentRequest;
import com.services.enrollment.enrollment_service.entity.Enrollment;
import java.util.List;

public interface EnrollmentService {
    Enrollment enrollStudent(EnrollmentRequest request);

    List<Enrollment> getUserEnrollments(String userId);

    boolean markCourseComplete(String userId, Integer courseId);
}
