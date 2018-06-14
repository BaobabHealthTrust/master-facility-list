"use strict";

const should = require("chai").should();
const server = require("../server/server");
const helper = require('./helper');
const data = require('./data');


const user =  data.user;
const facilityData = {
    ...data.facility,
    facility_code: "NB01050",
    facility_name: "Bolero Clinic",
};

server.models.Facility.create(data.facility);

describe("Create Facility", () => {

    it("Should Allow Authorized Administrator to Create Basic Details of a Facility", (done) => {
        helper.post("/api/Clients/login", user ,200 , (res) => {
            const url = "/api/Facilities?access_token="+res.body.id;
            helper.post(url, facilityData ,200 , (res) => {
                res.body.should.be.an('object');
                res.body.facility_name.should.equal(facilityData.facility_name);
                done();
            });
        });
    });

    it("Should  Automatically generates a Facility Code upon creation of Basic Details", (done) => {
          server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
            if(facility){
              facility[0].facility_code.should.equal(facilityData.facility_code);
              done();
            }
          });
    });


    // it("Should Display appropriate error message when an Unauthorized Client attempts to create Facility Basic Details", (done) => {
    //       helper.post("/api/Facilities", facilityData ,401 , (res) => {
    //           res.body.error.message.should.equal('Authorization Required');
    //           done();
    //       });
    // });

    it("Should Allow the same Authorized Administrator Who Created the Basic Details to Create Location Details of a Facility", (done) => {
        server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
            if(facility){
                await helper.post("/api/Clients/login", user ,200 , (res) => {
                    const url = `/api/Facilities/${facility[0].id}/locations?access_token=`+res.body.id;
                    const locationData = {
                        catchment_area: "Area 3",
                        catchment_population: 5000,
                        facility_id: facility[0].id,
                    };
                    helper.post(url, locationData ,200 , (res) => {
                        res.body.should.be.an('object');
                        res.body.catchment_area.should.equal(locationData.catchment_area);
                        done();
                    });
                });
            }
        });
    });

    // it("Should Display appropriate error message when an Unauthorized Client attempts to Create Location Details of a Facility", (done) => {
    //   server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
    //       if(facility){
    //           const url = `/api/Facilities/${facility[0].id}/locations`;
    //           const locationData = {
    //               catchment_area: "Area 3",
    //               catchment_population: 5000,
    //               facility_id: facility[0].id,
    //           };
    //           helper.post(url, locationData ,401 , (res) => {
    //               res.body.error.message.should.equal('Authorization Required');
    //               done();
    //           });
    //       }
    //   });
    // });

    it("Should Allow the same Authorized Administrator Who Created the Basic Details to Assign Resources to the Facility", (done) => {
        server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
                if(facility){
                    await helper.post("/api/Clients/login", user ,200 , (res) => {

                        const url = `/api/FacilityResources?access_token`+res.body.id;

                        const facilityResource = {
                            "facility_id": facility[0].id,
                            "resource_id": 1,
                            "quantity": 20,
                            "description": "string",
                        }

                        helper.post(url, facilityResource ,200 , (res) => {
                            res.body.should.be.an('object');
                            res.body.facility_id.should.equal(facilityResource.facility_id);
                            done();
                        });
                    });
                }
        });
    });

    // it("Should Display appropriate error message when a Different Authorized Administrator attempts to Assign Resources to a Facility", (done) => {
    //     const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
    //     server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
    //         if(facility){
    //             await helper.post("/api/Clients/login", user ,200 , (res) => {
    //                 const url = `/api/FacilityResources?access_token`+token;

    //                 const facilityResource = {
    //                     "facility_id": facility[0].id,
    //                     "resource_id": 2,
    //                     "quantity": 400,
    //                     "description": "string",
    //                 }

    //                 helper.post(url, facilityResource , 401 , (res) => {
    //                     res.body.error.message.should.equal('Authorization Required');
    //                     done();
    //                 });
    //             });
    //         }
    //     });
    // });


    // it("Should Display appropriate error message when an Unauthorized Client attempts to Assign Resources to a Facility", (done) => {
    //     const url = `/api/FacilityResources`;
    //     server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
    //         if(facility){
    //             const facilityResource = {
    //                 "facility_id": facility[0].id,
    //                 "resource_id": 2,
    //                 "quantity": 400,
    //                 "description": "string",
    //             }
    //             helper.post(url, facilityResource ,401 , (res) => {
    //                 res.body.error.message.should.equal('Authorization Required');
    //                 done();
    //             });
    //         }
    //     });
    // });

    it("Should Allow the same Authorized Administrator Who Created the Basic Details to Assign Utilities to the Facility", (done) => {
        server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
            if(facility){
                await helper.post("/api/Clients/login", user ,200 , (res) => {

                    const url = `/api/FacilityUtilities?access_token`+res.body.id;

                    const facilityUtility = {
                        "facility_id": facility[0].id,
                        "utility_id": 1
                    }

                    helper.post(url, facilityUtility ,200 , (res) => {
                        res.body.should.be.an('object');
                        res.body.facility_id.should.equal(facilityUtility.facility_id);
                        done();
                    });
                });
            }
        });
    });

    // it("Should Display appropriate error message when a Different Authorized Administrator attempts to Assign Utilities to a Facility", (done) => {
    //     const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
    //     server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
    //         if(facility){
    //             await helper.post("/api/Clients/login", user ,200 , (res) => {
    //                 const url = `/api/FacilityUtilities?access_token`+token;

    //                 const facilityUtility = {
    //                     "facility_id": facility[0].id,
    //                     "utility_id": 1
    //                 }

    //                 helper.post(url, facilityUtility , 401 , (res) => {
    //                     res.body.error.message.should.equal('Authorization Required');
    //                     done();
    //                 });
    //             });
    //         }
    //     });
    // });

    // it("Should Display appropriate error message when an Unauthorized Client attempts to Assign Utilities to a Facility", (done) => {
    //     const url = `/api/FacilityUtilities`;
    //     server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
    //         if(facility){
    //             const facilityUtility = {
    //                 "facility_id": facility[0].id,
    //                 "utility_id": 1
    //             }
    //             helper.post(url, facilityUtility ,401 , (res) => {
    //                 res.body.error.message.should.equal('Authorization Required');
    //                 done();
    //             });
    //         }
    //     });
    // });

    it("Should Allow the same Authorized Administrator Who Created the Basic Details to Assign services to the Facility", (done) => {
        server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
            if(facility){
                await helper.post("/api/Clients/login", user ,200 , (res) => {

                    const url = `/api/FacilityServices?access_token`+res.body.id;

                    const facilityService = {
                        "facility_id": facility[0].id,
                        "service_id": 1
                    }

                    helper.post(url, facilityService ,200 , (res) => {
                        res.body.should.be.an('object');
                        res.body.facility_id.should.equal(facilityService.facility_id);
                        done();
                    });
                });
            }
        });
    });

    // it("Should Display appropriate error message when a Different Authorized Administrator attempts to Assign Services to a Facility", (done) => {
    //     const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
    //     server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
    //         if(facility){
    //             await helper.post("/api/Clients/login", user ,200 , (res) => {
    //                 const url = `/api/FacilityServices?access_token`+token;

    //                 const facilityService = {
    //                     "facility_id": facility[0].id,
    //                     "service_id": 1
    //                 }

    //                 helper.post(url, facilityService , 401 , (res) => {
    //                     res.body.error.message.should.equal('Authorization Required');
    //                     done();
    //                 });
    //             });
    //         }
    //     });
    // });

    // it("Should  Display appropriate error message when an Unauthorized Client attempts to Assign Services to a Facility", (done) => {
    //   const url = `/api/FacilityServices`;
    //     server.models.Facility.find( {where: {facility_code: facilityData.facility_code}, limit: 1}, async (err, facility) => {
    //         if(facility){
    //             const facilityService = {
    //                 "facility_id": facility[0].id,
    //                 "service_id": 1
    //             }
    //             helper.post(url, facilityService ,401 , (res) => {
    //                 res.body.error.message.should.equal('Authorization Required');
    //                 done();
    //             });
    //         }
    //     });
    // });


});