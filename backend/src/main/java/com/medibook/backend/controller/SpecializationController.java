package com.medibook.backend.controller;

import com.medibook.backend.entity.Specialization;
import com.medibook.backend.repository.SpecializationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specializations")
public class SpecializationController {

    @Autowired
    private SpecializationRepository specializationRepository;

    @GetMapping
    public List<Specialization> getAllSpecializations() {
        return specializationRepository.findAll();
    }

    @PostMapping
    public Specialization createSpecialization(@RequestBody Specialization specialization) {
        return specializationRepository.save(specialization);
    }
}