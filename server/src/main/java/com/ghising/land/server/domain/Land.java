package com.ghising.land.server.domain;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "lands")
public class Land {
    @Id
    @Column(unique = true, nullable = false)
    private String landId;

    @Column(nullable = false)
    private String owner;

    @Column(name = "updated_date")
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

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

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
}

