/// <reference types="Cypress" />

describe("Test Filter Map Charts", () => {
  const FRONTEND_URL = "http://localhost:3000";

  it("Should Render all districts on map", () => {
    cy.visit(FRONTEND_URL);
    cy.fetch_districts().then(res => {
      res.map((district, index) => {
        district.district_name != "Likoma" &&
          district.district_name != "Kapichira" &&
          cy
            .get("#Map-Filter")
            .find(`path[test-id=${district.district_name.replace(" ", "-")}]`)
            .should("be.visible");
      });
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
            .find(`path[test-id=${district.district_name.replace(" ", "-")}]`)
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
                    cy.get(".card")
                      .first()
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   district hospitals
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    5,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(1)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   Health Centers
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    1,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(2)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   Dispensary
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    2,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(3)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   Health Post
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    4,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(4)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });

                  //   validate graphs
                  cy.fetch_facilieties_aggre_by_reg_status(
                    selectedDistricts
                  ).then(res => {
                    res.map((graphData, index) => {
                      cy.get("#regulatoryStatusContainer")
                        .find(".recharts-bar-rectangle")
                        .eq(index)
                        .trigger("mouseover");
                      cy.get(".recharts-tooltip-wrapper")
                        .first()
                        .get(".recharts-tooltip-item-list")
                        .get(".recharts-tooltip-item-value")
                        .first()
                        .should("have.html", `${graphData.count}`);
                    });
                  });

                  cy.fetch_facilieties_aggre_by_owner(selectedDistricts).then(
                    res => {
                      res.map((graphData, index) => {
                        cy.get("#typeOwnershipContainer")
                          .find(".recharts-bar-rectangle")
                          .eq(index)
                          .trigger("mouseover");
                        cy.get(".recharts-tooltip-wrapper")
                          .eq(1)
                          .get(".recharts-tooltip-item-list")
                          .get(".recharts-tooltip-item-value")
                          .eq(1)
                          .should("have.html", `${graphData.count}`);
                      });
                    }
                  );
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
            .find(`path[test-id=${district.district_name.replace(" ", "-")}]`)
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
                    cy.get(".card")
                      .first()
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   district hospitals
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    5,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(1)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   Health Centers
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    1,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(2)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   Dispensary
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    2,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(3)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });
                  //   Health Post
                  cy.fetch_facilieties_for_districts(
                    "facility_type_id",
                    4,
                    districtsData
                  ).then(res => {
                    cy.get(".card")
                      .eq(4)
                      .find("p")
                      .first()
                      .should("have.html", `${res.length}`);
                  });

                  //   validate graphs
                  cy.fetch_facilieties_aggre_by_reg_status(
                    selectedDistricts
                  ).then(res => {
                    res.map((graphData, index) => {
                      cy.get("#regulatoryStatusContainer")
                        .find(".recharts-bar-rectangle")
                        .eq(index)
                        .trigger("mouseover");
                      cy.get(".recharts-tooltip-wrapper")
                        .first()
                        .get(".recharts-tooltip-item-list")
                        .get(".recharts-tooltip-item-value")
                        .first()
                        .should("have.html", `${graphData.count}`);
                    });
                  });

                  cy.fetch_facilieties_aggre_by_owner(selectedDistricts).then(
                    res => {
                      res.map((graphData, index) => {
                        cy.get("#typeOwnershipContainer")
                          .find(".recharts-bar-rectangle")
                          .eq(index)
                          .trigger("mouseover");
                        cy.get(".recharts-tooltip-wrapper")
                          .eq(1)
                          .get(".recharts-tooltip-item-list")
                          .get(".recharts-tooltip-item-value")
                          .eq(1)
                          .should("have.html", `${graphData.count}`);
                      });
                    }
                  );
                }
              );
            });
      });
    });
  });
});
