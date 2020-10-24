package com.ghising.land.server.service;

import com.ghising.land.server.Repository.BuyRequestRepository;
import com.ghising.land.server.Repository.LandRepository;
import com.ghising.land.server.domain.BuyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyRequestServiceImpl implements BuyRequestService {
    @Autowired
    private BuyRequestRepository buyRequestRepository;

    @Override
    public void save(BuyRequest buyRequest) {
        buyRequestRepository.save(buyRequest);
    }

    @Override
    public void update(BuyRequest buyRequest) {
        buyRequestRepository.save(buyRequest);
    }

       @Override
    public BuyRequest getByRequestId(String requestId) {
        return buyRequestRepository.getByRequestId(requestId);
    }

    @Override
    public List<BuyRequest> getAll() {
        return (List<BuyRequest>) buyRequestRepository.findAll();
    }

    @Override
    public List<BuyRequest> getBuyRequestsByBuyer(String buyerAddress) {
        return buyRequestRepository.getBuyRequestsByBuyer(buyerAddress);
    }

    @Override
    public List<BuyRequest> getBuyRequestsByOwner(String ownerAddress) {
        return buyRequestRepository.getBuyRequestsByOwner(ownerAddress);
    }
}
