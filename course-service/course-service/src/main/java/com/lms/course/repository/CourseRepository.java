package com.lms.course.repository;

import com.lms.course.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    Optional<Course> findByCourseId(int courseId);

    void deleteByCourseId(int courseId);
}
