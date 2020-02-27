/// <reference types="Cypress" />

describe("Test Filter Map Charts", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  it("Should Render all districts on map", () => {
    cy.visit(FRONTEND_URL);
    cy.fetch_districts().then(res => {
      res.map((district, index) => {
        district.district_name != "Likoma" &&
          district.district_name != "Kapichira" &&
          cy
            .get("#Map-Filter")
            .find(`path[data-test=${district.district_name.replace(/ /g, "")}]`)
            .should("be.visible");
      });
    });
  });

  describe("Shows valid stats", () => {
    const FacilityTypesDisplay = {
      Hospitals: "District Hospital",
      HealthCenters: "Health Centre",
      HealthPosts: "Health Post",
      Dispensaries: "Dispensary"
    };
    let FacilityTypes = [];
    it("Should get facility types", () => {
      cy.fetch_facility_types().then(res => {
        FacilityTypes = res;
      });
    });

    var selectedDistricts = [];
    it("Should show statistics for selected districts", () => {
      cy.fetch_districts().then(res => {
        res.map((district, index) => {
          district.district_name != "Likoma" &&
            district.district_name != "Kapichira" &&
            cy
              .get("#Map-Filter")
              .find(
                `path[data-test=${district.district_name.replace(/ /g, "")}]`
              )
              .click()
              .then(source => {
                selectedDistricts.push(source.attr("id"));

                cy.fetch_districts("district_name", selectedDistricts).then(
                  districtsData => {
                    if (Math.floor(Math.random() * 20 > 2)) return;
                    //check facility summary statistics
                    cy.fetch_facilieties_for_districts(
                      null,
                      null,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=TotalFacilities]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   district hospitals
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type == FacilityTypesDisplay.Hospitals
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=Hospitals]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   Health Centers
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type ==
                          FacilityTypesDisplay.HealthCenters
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=HealthCenters]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   Dispensary
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type ==
                          FacilityTypesDisplay.Dispensaries
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=Dispensaries]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   Health Post
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type == FacilityTypesDisplay.HealthPosts
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=HealthPosts]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                  }
                );
              });
        });
      });
    });

    it("Should remove deselected district statistics", () => {
      cy.fetch_districts().then(res => {
        res.map((district, index) => {
          district.district_name != "Likoma" &&
            district.district_name != "Kapichira" &&
            cy
              .get("#Map-Filter")
              .find(
                `path[data-test=${district.district_name.replace(/ /g, "")}]`
              )
              .click()
              .then(source => {
                selectedDistricts = selectedDistricts.filter(
                  dis => dis != source.attr("id")
                );

                cy.fetch_districts("district_name", selectedDistricts).then(
                  districtsData => {
                    if (Math.floor(Math.random() * 20 > 2)) return;
                    //check facility summary statistics
                    cy.fetch_facilieties_for_districts(
                      null,
                      null,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=TotalFacilities]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   district hospitals
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type == FacilityTypesDisplay.Hospitals
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=Hospitals]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   Health Centers
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type ==
                          FacilityTypesDisplay.HealthCenters
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=HealthCenters]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   Dispensary
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type ==
                          FacilityTypesDisplay.Dispensaries
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=Dispensaries]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                    //   Health Post
                    cy.fetch_facilieties_for_districts(
                      "facility_type_id",
                      FacilityTypes.find(
                        type =>
                          type.facility_type == FacilityTypesDisplay.HealthPosts
                      ).id,
                      districtsData
                    ).then(res => {
                      cy.get("[data-test=HealthPosts]")
                        .find("p")
                        .first()
                        .should("have.html", `${res.length}`);
                    });
                  }
                );
              });
        });
      });
    });
  });
});
