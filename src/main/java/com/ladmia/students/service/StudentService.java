package com.ladmia.students.service;

import com.ladmia.students.Exception.NotFoundStudentException;
import com.ladmia.students.model.Student;
import com.ladmia.students.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> findAllStudents() {
        return studentRepository.findAll();
    }

    public void addNewStudent(Student student) {
        studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        if(studentRepository.findById(id).isPresent()) {
            studentRepository.deleteById(id);
        } else {
            throw (new NotFoundStudentException("student with id=" + id +" does not exist"));
        }
    }

    public Optional<Student> findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}
