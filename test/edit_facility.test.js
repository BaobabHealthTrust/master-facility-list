"use strict";

const should = require("chai").should();
const server = require("../server/server");
const helper = require('./helper');
const userData = require('./data');


const user =  userData.user

describe("Edit Facility Test", () => {


  it(" Allows an Authorized Administrator to Edit Basic Details of a Facility", (done) => {
      server.models.Facility.find( {where: {id: 1}, limit: 1}, async (err, facility) => {
          if(facility){
              await helper.post("/api/Clients/login", user ,200 , (res) => {
                  const url = `/api/Facilities/${facility[0].id}?access_token=`+res.body.id;
                  const data = {facility_name: "Malu"}
                  helper.put(url, data ,200 , (res) => {
                      res.body.should.be.an('object');
                      res.body.facility_name.should.equal("Malu");
                      done();
                  });
              });
          }
      });
  });

  // it(" Display appropriate error message when an Unauthorized Client attempts to Edit Basic Details of a Facility", (done) => {
  //     server.models.Facility.find( {where: {id: 1}, limit: 1}, async (err, facility) => {
  //         if(facility){
  //             const url = `/api/Facilities/${facility[0].id}`;
  //             const data = {
  //               ...facility[0],
  //               facility_name: "Malu"
  //             }
  //             helper.put(url, data ,401 , (res) => {
  //                 res.body.error.message.should.equal('Authorization Required');
  //                 done();
  //             });
  //         }
  //     });
  // });

  it("Allows an Authorized Administrator to Edit Contact Details of a Facility", (done) => {
      server.models.ContactPeople.find( {where: {id: 1}, limit: 1}, async (err, contactPeople) => {
          if(contactPeople){
              await helper.post("/api/Clients/login", user ,200 , (res) => {
                  const url = `/api/ContactPeople/${contactPeople[0].id}?access_token=`+res.body.id;
                  const data = {
                    ...contactPeople[0],
                    contact_person_fullname: 'Malu'
                  }
                  helper.put(url, data ,200 , (res) => {
                      res.body.should.be.an('object');
                      res.body.contact_person_fullname.should.equal("Malu");
                      done();
                  });
              });
          }
      });
  });

  // it(" Display appropriate error message when an Unauthorized Client attempts to Edit Contact Details of a Facility", (done) => {
  //     server.models.ContactPeople.find( {where: {id: 1}, limit: 1}, async (err, contactPeople) => {
  //         if(contactPeople){
  //             const url = `/api/ContactPeople/${contactPeople[0].id}`;
  //             const data = {
  //               ...contactPeople[0],
  //               contact_person_fullname: 'Malu'
  //             }
  //             helper.put(url, data ,401 , (res) => {
  //                 res.body.error.message.should.equal('Authorization Required');
  //                 done();
  //             });
  //         }
  //     });
  // });

  it(" Allows an Authorized Administrator to Re-assign Resources to a Facility", (done) => {
      server.models.FacilityResource.find( {where: {id: 1}, limit: 1}, async (err, facilityResource) => {
          if(facilityResource){
              await helper.post("/api/Clients/login", user ,200 , (res) => {
                  const url = `/api/FacilityResources/${facilityResource[0].id}?access_token=`+res.body.id;
                  const data = {
                    ...facilityResource[0],
                    facility_id: 2
                  }
                  helper.put(url, data ,200 , (res) => {
                      res.body.should.be.an('object');
                      res.body.facility_id.should.equal(2);
                      done();
                  });
              });
          }
      });
  });

  // it("Display appropriate error message when an Unauthorized Client attempts to Re-assign Resources of a Facility", (done) => {
  //     server.models.FacilityResource.find( {where: {id: 1}, limit: 1}, async (err, facilityResource) => {
  //         if(facilityResource){
  //             const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
  //             const url = `/api/FacilityResources/${facilityResource[0].id}?access_token=`+token;
  //             const data = {
  //               ...facilityResource[0],
  //               facility_id: 2
  //             }
  //             helper.put(url, data ,401 , (res) => {
  //                 res.body.error.message.should.equal('Authorization Required');
  //                 done();
  //             });
  //         }
  //     });
  // });

  it(" Allows an Authorized Administrator to Re-assign Utilities of a Facility", (done) => {
      server.models.FacilityUtility.find( {where: {id: 1}, limit: 1}, async (err, facilityUtility) => {
          if(facilityUtility){
              await helper.post("/api/Clients/login", user ,200 , (res) => {
                  const url = `/api/FacilityUtilities/${facilityUtility[0].id}?access_token=`+res.body.id;
                  const data = {
                    ...facilityUtility[0],
                    facility_id: 2
                  }
                  helper.put(url, data ,200 , (res) => {
                      res.body.should.be.an('object');
                      res.body.facility_id.should.equal(2);
                      done();
                  });
              });
          }
      });
  });

  // it(" Display appropriate error message when an Unauthorized Client attempts to Re-assign Utilities of a Facility", (done) => {
  //       server.models.FacilityUtility.find( {where: {id: 1}, limit: 1}, async (err, facilityUtility) => {
  //           if(facilityUtility){
  //               const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
  //               const url = `/api/FacilityUtilities/${facilityUtility[0].id}?access_token=`+token;
  //               const data = {
  //                 ...facilityUtility[0],
  //                 facility_id: 2
  //               }
  //               helper.put(url, data ,401 , (res) => {
  //                   res.body.error.message.should.equal('Authorization Required');
  //                   done();
  //               });
  //           }
  //       });
  // });

  it(" Allows an Authorized Administrator to Re-assign Services of a Facility", (done) => {
      server.models.FacilityService.find( {where: {id: 1}, limit: 1}, async (err, facilityService) => {
          if(facilityService){
              await helper.post("/api/Clients/login", user ,200 , (res) => {
                  const url = `/api/FacilityServices/${facilityService[0].id}?access_token=`+res.body.id;
                  const data = {
                    ...facilityService[0],
                    facility_id: 2
                  }
                  helper.put(url, data ,200 , (res) => {
                      res.body.should.be.an('object');
                      res.body.facility_id.should.equal(2);
                      done();
                  });
              });
          }
      });
  });

  // it(" Display appropriate error message when an Unauthorized Client attempts to Re-assign Services of a Facility", (done) => {
  //   server.models.FacilityService.find( {where: {id: 1}, limit: 1}, async (err, facilityService) => {
  //       if(facilityService){
  //           const token = "8xqdmBzlXWRbOxUMofXVj4mnEPjJJ6s7k5CbLaIVDTtxqw1aHDclMB4KSP7biqHr";
  //           const url = `/api/FacilityServices/${facilityService[0].id}?access_token=`+token;
  //           const data = {
  //             ...facilityService[0],
  //             facility_id: 2
  //           }
  //           helper.put(url, data ,401 , (res) => {
  //               res.body.error.message.should.equal('Authorization Required');
  //               done();
  //           });
  //       }
  //   });
  // });

});
