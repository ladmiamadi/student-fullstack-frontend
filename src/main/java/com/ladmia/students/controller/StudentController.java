package com.ladmia.students.controller;

import com.ladmia.students.Exception.FoundEmailException;
import com.ladmia.students.Exception.NotFoundStudentException;
import com.ladmia.students.model.Student;
import com.ladmia.students.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/students")
class StudentController {
    private final StudentService studentService;
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.findAllStudents();
    }

    @PostMapping
    public void addStudent(@RequestBody Student student) {
        if(studentService.findByEmail(student.getEmail()).isPresent()) {
            throw new FoundEmailException("The email "+ student.getEmail() +" is taken");
        }

        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{id}")
    public void deleteStudent(@PathVariable("id") Long id) {
        studentService.deleteStudent(id);
    }
}
