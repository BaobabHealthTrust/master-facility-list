export default function testAllFacilities(districts) {
  cy.fetch_facilieties().then(res => {
    cy.get(".card")
      .first()
      .should("be.visible");
    cy.get(".card")
      .first()
      .find(".sc-htoDjs")
      .should("have.html", `${res.length}`);
  });
}
export function testDistrictHospitals(districts) {
  cy.fetch_facilieties("facility_type_id", 5).then(res => {
    cy.get(".card")
      .eq(1)
      .should("be.visible");
    cy.get(".card")
      .eq(1)
      .find(".sc-htoDjs")
      .should("have.html", `${res.length}`);
  });
}
export function testHealthCenters(districts) {
  cy.fetch_facilieties("facility_type_id", 1).then(res => {
    cy.get(".card")
      .eq(2)
      .should("be.visible");
    cy.get(".card")
      .eq(2)
      .find(".sc-htoDjs")
      .should("have.html", `${res.length}`);
  });
}

export function testDispensary(districts) {
  cy.fetch_facilieties("facility_type_id", 2).then(res => {
    cy.get(".card")
      .eq(3)
      .should("be.visible");
    cy.get(".card")
      .eq(3)
      .find(".sc-htoDjs")
      .should("have.html", `${res.length}`);
  });
}
export function testHealthPost(districts) {
  cy.fetch_facilieties("facility_type_id", 4).then(res => {
    cy.get(".card")
      .eq(4)
      .should("be.visible");
    cy.get(".card")
      .eq(4)
      .find(".sc-htoDjs")
      .should("have.html", `${res.length}`);
  });
}
