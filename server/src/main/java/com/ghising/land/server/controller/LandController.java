package com.ghising.land.server.controller;

import com.ghising.land.server.domain.Land;
import com.ghising.land.server.service.LandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lands")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LandController {
    @Autowired
    private LandService landService;

    @PostMapping
    public void saveInfo(@RequestBody Land land) {
        landService.saveLand(land);
    }

    @PutMapping
    public void updateLandInfo(@RequestBody Land land) {
        landService.updateLand(land);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteLandInfo(@PathVariable int id) {
        landService.deleteLand(id);
    }


    @GetMapping(value = "/{id}")
    public Land getLandInfoById(@PathVariable String id) {
        return landService.getLandByLandId(id);
    }

    @GetMapping
    public List<Land> getAllLand(){
        return landService.getAllLand();
    }


    @GetMapping("/user/{userAddress}")
    public List<Land> findLandsByOwner(@PathVariable String userAddress) {
        return landService.findLandsByOwner(userAddress);
    }

    @GetMapping("/others/{userAddress}")
    public List<Land> getLandsByOwnerIsNot(@PathVariable String userAddress) {
        return landService.getLandsByOwnerIsNot(userAddress);
    }
}
