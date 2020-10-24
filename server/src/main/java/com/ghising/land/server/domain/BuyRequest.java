package com.ghising.land.server.domain;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Lands_buy_request")
public class BuyRequest {
    @Id
    @Column(unique = true, nullable = false)
    private String requestId;

    @Column(nullable = false)
    private String landId;

    @Column(nullable = false)
    private String owner;

    @Column(nullable = false)
    private String buyer;

    @Column(nullable = false)
    private Long amount;

    @Column(name = "request_date", nullable = false)
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requestDate;

    @Column(name = "updated_date", nullable = false)
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    boolean buyerOk;
    boolean ownerOk;
    boolean closed;

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getLandId() {
        return landId;
    }

    public void setLandId(String landId) {
        this.landId = landId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public boolean isBuyerOk() {
        return buyerOk;
    }

    public void setBuyerOk(boolean buyerOk) {
        this.buyerOk = buyerOk;
    }

    public boolean isOwnerOk() {
        return ownerOk;
    }

    public void setOwnerOk(boolean ownerOk) {
        this.ownerOk = ownerOk;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }
}

