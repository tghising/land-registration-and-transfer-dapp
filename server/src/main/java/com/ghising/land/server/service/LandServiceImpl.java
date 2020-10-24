package com.ghising.land.server.service;

import com.ghising.land.server.Repository.LandRepository;
import com.ghising.land.server.domain.Land;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LandServiceImpl implements LandService {
    @Autowired
    private LandRepository landRepository;

    @Override
    public void saveLand(Land land) {
        landRepository.save(land);
    }

    @Override
    public void updateLand(Land land) {
        landRepository.save(land);
    }

    @Override
    public void deleteLand(int id) {
        landRepository.deleteById(id);
    }

    @Override
    public Land getLandById(int id) {
        return landRepository.findById(id).get();
    }

    @Override
    public Land getLandByLandId(String landId) {
        return landRepository.findLandByLandId(landId);
    }

    @Override
    public List<Land> getAllLand() {
        return (List<Land>) landRepository.findAll();
    }

    @Override
    public List<Land> findLandsByOwner(String owner) {
        return landRepository.findLandsByOwner(owner);
    }

    @Override
    public List<Land> getLandsByOwnerIsNot(String owner) {
        return landRepository.getLandsByOwnerIsNot(owner);
    }
}
