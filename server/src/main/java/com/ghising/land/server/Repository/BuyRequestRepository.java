package com.ghising.land.server.Repository;

import com.ghising.land.server.domain.BuyRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRequestRepository extends CrudRepository<BuyRequest, String> {
    BuyRequest getByRequestId(String requestId);
    List<BuyRequest> getBuyRequestsByBuyer(String buyerAddress);
    List<BuyRequest> getBuyRequestsByOwner(String ownerAddress);
}
