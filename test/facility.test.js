"use strict";

const should = require("chai").should();
const server = require("../server/server");
const request = require("supertest")(server);

const FacilityType = server.models.FacilityType;
const FacilityOwner = server.models.Owner;
const OperationalStatus = server.models.OperationalStatus;
const RegulatoryStatus = server.models.RegulatoryStatus;
const Geolocation = server.models.Geolocation;
const Location = server.models.Location;
const ContactPeople = server.models.ContactPeople;
const Resource = server.models.Resource;
const FacilityResource = server.models.FacilityResource;
const Utility = server.models.Utility;
const FacilityUtility = server.models.FacilityUtility;
const Service = server.models.Service;
const FacilityService = server.models.FacilityService;
const FacilityAddress = server.models.Address;

const facilityType = FacilityType.create({
    facility_type: "District Hospital",
});

const faciltyOwner = FacilityOwner.create({
    facility_owner: "Malawi Government",
});

const operationalStatus = OperationalStatus.create({
    facility_operational_status: "Functional",
});

const regulatoryStatus = RegulatoryStatus.create({
    facility_regulatory_status: "Registered",
});

Promise.all([facilityType, faciltyOwner, operationalStatus, regulatoryStatus])
    .then(values => {
        const testData = {
            facility_name: "Nkhatabay",
            facility_code: "NB01002",
            facility_date_opened: "2017-10-25T13:27:53.703Z",
            facility_type_id: values[0].id,
            facility_owner_id: values[1].id,
            facility_operational_status_id: values[2].id,
            facility_regulatory_status_id: values[3].id,
            facility_address_id: 0,
            facility_contact_person_id: 0,
            facility_location_id: 0,
        };

        const facilityEdit = Object.assign({}, testData, {
            facility_name: "Chitipa",
            facility_code: "CP01002",
        });

        describe("Facility", () => {
            describe("POST /Facilities", () => {
                it("should return a success code 200 when a new\
                 facility is added", () => {
                    return request
                        .post("/api/Facilities")
                        .set("Accept", "application/json")
                        .send(testData)
                        .expect(200)
                        .then(response => {
                            console.log(response.status);
                        })
                        .catch(err => console.error(err));
                });
            });

            describe("GET /Facilities", () => {
                it("should return a successfully return one facility\
                 that was added", done => {
                    request
                        .get("/api/Facilities")
                        .set("Accept", "application/json")
                        .expect(200)
                        .end((err, res) => {
                            res.body.length.should.equal(2);
                            const facilityId = res.body[0].id;

                            describe("PUT /Facilities", () => {
                                it("should edit successfully a facility\
                 that was added", done => {
                                    request
                                        .put("/api/Facilities/" + facilityId)
                                        .set("Accept", "application/json")
                                        .send(facilityEdit)
                                        .expect(200)
                                        .end((err, res) => {
                                            res.body.facility_name.should.equal(
                                                "Chitipa"
                                            );
                                            done();
                                        });
                                });
                            });

                            describe("GET /Facilities/{id}/faci\
                                lityType", () => {
                                it("should fetch the correct \
                                    facility type", done => {
                                    request
                                        .get(
                                            "/api/Facilities/" +
                                                facilityId +
                                                "/facilityType"
                                        )
                                        .set("Accept", "application/json")
                                        .expect(200)
                                        .end((err, res) => {
                                            res.body.facility_type.should.equal(
                                                "District Hospital"
                                            );
                                            done();
                                        });
                                });
                            });

                            describe("GET /Facilities/{id}/owner", () => {
                                it("should fetch the correct \
                                    facility owner", done => {
                                    request
                                        .get(
                                            "/api/Facilities/" +
                                                facilityId +
                                                "/owner"
                                        )
                                        .set("Accept", "application/json")
                                        .expect(200)
                                        .end((err, res) => {
                                            res.body
                                            .facility_owner
                                            .should.equal(
                                                "Malawi Government"
                                            );
                                            done();
                                        });
                                });
                            });

                            describe("GET /Facilities/{id}/\
                                operationalStatus", () => {
                                it("should fetch the operational \
                                    status of a facility", done => {
                                    request
                                        .get(
                                            "/api/Facilities/" +
                                                facilityId +
                                                "/operationalStatus"
                                        )
                                        .set("Accept", "application/json")
                                        .expect(200)
                                        .end((err, res) => {
                                            res
                                            .body
                                            .facility_operational_status
                                            .should
                                            .equal(
                                                "Functional"
                                            );
                                            done();
                                        });
                                });
                            });

                            describe("GET /Facilities/{id}/\
                                regulatoryStatus", () => {
                                it("should fetch the regulatory \
                                    status of a facility", done => {
                                    request
                                        .get(
                                            "/api/Facilities/" +
                                                facilityId +
                                                "/regulatoryStatus"
                                        )
                                        .set("Accept", "application/json")
                                        .expect(200)
                                        .end((err, res) => {
                                            res.body
                                            .facility_regulatory_status
                                            .should.equal(
                                                "Registered"
                                            );
                                            done();
                                        });
                                });
                            });

                            const geolocate = {
                                datum: 10,
                                facility_id: facilityId,
                            };

                            Geolocation.create(geolocate).then(resp => {
                                describe("GET /Facilities/{id}/\
                                    geolocations", () => {
                                    it("should fetch the \
                                        geolocation of a facility", done => {
                                        request
                                            .get(
                                                "/api/Facilities/" +
                                                    facilityId +
                                                    "/geolocations"
                                            )
                                            .set("Accept", "application/json")
                                            .expect(200)
                                            .end((err, res) => {
                                                res.body.datum.should.equal(10);
                                                done();
                                            });
                                    });
                                });
                            });

                            const locationData = {
                                catchment_area: "Area 3",
                                catchment_population: 5000,
                                district_id: 34,
                                facility_id: facilityId,
                            };

                            Location.create(locationData).then(resp => {
                                describe("GET /Facilities/{id}/\
                                    locations", () => {
                                    it("should fetch the location \
                                        of a facility", done => {
                                        request
                                            .get(
                                                "/api/Facilities/" +
                                                    facilityId +
                                                    "/locations"
                                            )
                                            .set("Accept", "application/json")
                                            .expect(200)
                                            .end((err, res) => {
                                                res.body
                                                .catchment_area
                                                .should.equal(
                                                    "Area 3"
                                                );
                                                done();
                                            });
                                    });
                                });
                            });

                            const contactData = {
                                contact_person_fullname: "Lyton Nyemba",
                                contact_person_phone: "+265 884 21 37 81",
                                contact_person_email: "lytonnyemba@gmail.com",
                                facility_id: facilityId,
                            };

                            ContactPeople.create(contactData).then(resp => {
                                describe("GET /Facilities/{id}/\
                                    contactPeople", () => {
                                    it("should fetch the contact \
                                        person of a facility", done => {
                                        request
                                            .get(
                                                "/api/Facilities/" +
                                                    facilityId +
                                                    "/contactPeople"
                                            )
                                            .set("Accept", "application/json")
                                            .expect(200)
                                            .end((err, res) => {
                                                res.body
                                                .contact_person_fullname
                                                .should.equal(
                                                    "Lyton Nyemba"
                                                );
                                                done();
                                            });
                                    });
                                });
                            });

                            const resource = Resource.create({
                                resource_name: "Computer",
                                resource_type_id: "1",
                            });

                            const utility = Utility.create({
                                utility_name: "ESCOM",
                                utility_type_id: "1",
                            });

                            const service = Service.create({
                                service_name: "Surgery",
                                service_type_id: 1,
                                service_category_id: 1,
                            });

                            Promise.all([
                                resource,
                                utility,
                                service,
                            ]).then(res => {
                                const resource_id = res[0].id;
                                const utility_id = res[1].id;
                                const service_id = res[2].id;

                                const facilityResource = {
                                    facility_id: facilityId,
                                    resource_id: resource_id,
                                    quantity: 50,
                                };

                                const facilityUtility = {
                                    facility_id: facilityId,
                                    utility_id: utility_id,
                                };

                                const facilityService = {
                                    service_id: service_id,
                                    facility_id: facilityId,
                                };

                                const facilityAddress = {
                                    physical_address:
                                     'Area 3 near minbus depot',
                                    facility_id: facilityId,
                                };

                                FacilityResource.create(
                                    facilityResource
                                ).then(resp => {
                                    describe("GET /Facilities/{id}/\
                                        resources", () => {
                                        it("should fetch the resources \
                                            of a facility", done => {
                                            request
                                                .get(
                                                    "/api/Facilities/" +
                                                        facilityId +
                                                        "/resources"
                                                )
                                                .set(
                                                    "Accept",
                                                    "application/json"
                                                )
                                                .expect(200)
                                                .end((err, res) => {
                                                    res.body[0]
                                                    .resource_name
                                                    .should.equal(
                                                        "Computer"
                                                    );
                                                    done();
                                                });
                                        });
                                    });
                                });

                                FacilityUtility.create(
                                    facilityUtility
                                ).then(resp => {
                                    describe("GET /Facilities/{id}/\
                                        utilities", () => {
                                        it("should fetch the utilities of\
                                         a facility", done => {
                                            request
                                                .get(
                                                    "/api/Facilities/" +
                                                        facilityId +
                                                        "/utilities"
                                                )
                                                .set(
                                                    "Accept",
                                                    "application/json"
                                                )
                                                .expect(200)
                                                .end((err, res) => {
                                                    res.body[0]
                                                    .utility_name
                                                    .should.equal(
                                                        "ESCOM"
                                                    );
                                                    done();
                                                });
                                        });
                                    });
                                });

                                FacilityService.create(
                                    facilityService
                                ).then(resp => {
                                    describe("GET /Facilities/{id}/\
                                        services", () => {
                                        it("should fetch the services of\
                                         a facility", done => {
                                            request
                                                .get(
                                                    "/api/Facilities/" +
                                                        facilityId +
                                                        "/services"
                                                )
                                                .set(
                                                    "Accept",
                                                    "application/json"
                                                )
                                                .expect(200)
                                                .end((err, res) => {
                                                    res.body[0]
                                                    .service_name
                                                    .should.equal(
                                                        "Surgery"
                                                    );
                                                    done();
                                                });
                                        });
                                    });
                                });

                                FacilityAddress.create(
                                    facilityAddress
                                ).then(resp => {
                                    describe("GET /Facilities/{id}/\
                                        addresses", () => {
                                        it("should fetch the addresses of\
                                         a facility", done => {
                                            request
                                                .get(
                                                    "/api/Facilities/" +
                                                        facilityId +
                                                        "/addresses"
                                                )
                                                .set(
                                                    "Accept",
                                                    "application/json"
                                                )
                                                .expect(200)
                                                .end((err, res) => {
                                                    res
                                                    .body
                                                    .physical_address
                                                    .should
                                                    .equal(
                                            "Area 3 near minbus depot"
                                                    );
                                                    done();
                                                });
                                        });
                                    });
                                });
                            });

                            done();
                        });
                });
            });
        });
    })
    .catch(err => console.error(err));
