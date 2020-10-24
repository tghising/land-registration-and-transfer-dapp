package com.ghising.land.server.controller;

import com.ghising.land.server.domain.BuyRequest;
import com.ghising.land.server.service.BuyRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buy")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BuyRequestController {
    @Autowired
    private BuyRequestService buyRequestService;

    @PostMapping
    public void saveInfo(@RequestBody BuyRequest buyRequest) {
        buyRequestService.save(buyRequest);
    }

    @PutMapping
    public void update(@RequestBody BuyRequest buyRequest) {
        buyRequestService.update(buyRequest);
    }

    @GetMapping(value = "/{id}")
    public BuyRequest getByRequestId(@PathVariable String id) {
        return buyRequestService.getByRequestId(id);
    }

    @GetMapping
    public List<BuyRequest> getAll(){
        return buyRequestService.getAll();
    }

    @GetMapping("/buyer/{buyerAddress}")
    public List<BuyRequest> getAllBuyerRequest(@PathVariable String buyerAddress) {
        return buyRequestService.getBuyRequestsByBuyer(buyerAddress);
    }

    @GetMapping("/owner/{ownerAddress}")
    public List<BuyRequest> getAllOwnerRequest(@PathVariable String ownerAddress) {
        return buyRequestService.getBuyRequestsByOwner(ownerAddress);
    }
}
