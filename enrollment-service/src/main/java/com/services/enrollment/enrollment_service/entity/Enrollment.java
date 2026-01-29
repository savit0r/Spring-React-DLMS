package com.services.enrollment.enrollment_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private Integer courseId; // Matching Course Service ID type
    private String status; // ENROLLED, COMPLETED, CANCELLED
    private LocalDateTime enrolledAt;

    public Enrollment() {}

    public Enrollment(String userId, Integer courseId, String status, LocalDateTime enrolledAt) {
        this.userId = userId;
        this.courseId = courseId;
        this.status = status;
        this.enrolledAt = enrolledAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Integer getCourseId() { return courseId; }
    public void setCourseId(Integer courseId) { this.courseId = courseId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }
}
