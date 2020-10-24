package com.ghising.land.server.service;

import com.ghising.land.server.domain.BuyRequest;

import java.util.List;

public interface BuyRequestService {
    public void save(BuyRequest buyRequest);
    public void update(BuyRequest buyRequest);
    BuyRequest getByRequestId(String id);
    List<BuyRequest> getAll();
    List<BuyRequest> getBuyRequestsByBuyer(String buyerAddress);
    List<BuyRequest> getBuyRequestsByOwner(String ownerAddress);
}
