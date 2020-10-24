package com.ghising.land.server.Repository;

import com.ghising.land.server.domain.Land;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandRepository extends CrudRepository<Land, Integer> {
    Land findLandByLandId(String landId);
    List<Land> findLandsByOwner(String owner);
    List<Land> getLandsByOwnerIsNot(String owner);
}
