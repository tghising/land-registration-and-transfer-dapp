package com.ghising.land.server.service;

import com.ghising.land.server.domain.Land;

import java.util.List;

public interface LandService {
    public void saveLand(Land land);
    public void updateLand(Land land);
    public void deleteLand(int id);
    Land getLandById(int id);
    Land getLandByLandId(String id);
    List<Land> getAllLand();
    List<Land> findLandsByOwner(String owner);
    List<Land> getLandsByOwnerIsNot(String owner);

}
