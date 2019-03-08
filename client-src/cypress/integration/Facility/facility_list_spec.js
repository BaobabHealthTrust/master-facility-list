/// <reference types="Cypress" />
describe("Facility List Spec", () => {
  const FRONTEND_URL = "http://localhost:3000";

  it("Navigates to facility list page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);
    cy.get("#nav-mobile > li[class=active]")
      .first()
      .should("contain", "FACILITIES");
  });
  it("Shows Facilities Table", () => {
    cy.get("table.MuiTable-root-30.Table-table-28")
      .first()
      .should("be.visible");
  });
  it("Shows Correct table headers", () => {
    const expectedTableHeaders = [
      "CODE",
      "NAME",
      "COMMON NAME",
      "OWNERSHIP",
      "TYPE",
      "STATUS",
      "DISTRICT",
      "DATE OPENED"
    ];
    var tableHeaders = [];
    cy.get("table .MuiTableHead-root-31 tr th .SortingControl-sortLabelText-62")
      .each((el, index, lis) => {
        tableHeaders.push(el.context.innerHTML);
      })
      .then(() => {
        expect(expectedTableHeaders).to.be.members(tableHeaders);
      });
  });
  var facilityIndex;

  it("Shows valid facility data", () => {
    cy.fetch_facilieties_list().then(res => {
      for (let testCount = 1; testCount <= 3; testCount++) {
        // get random facility index
        facilityIndex =
          res.length >= 10
            ? Math.floor(Math.random() * 9)
            : Math.floor(Math.random() * (res.length - 1));
        //   check code
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .first()
          .should("contain", res[facilityIndex].code);

        // check name
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .eq(1)
          .should("contain", res[facilityIndex].name);

        // check common name
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .eq(2)
          .should("contain", res[facilityIndex].common);

        // check ownership
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .eq(3)
          .should("contain", res[facilityIndex].ownership);

        // check type
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .eq(4)
          .should("contain", res[facilityIndex].type);

        // check status
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .eq(5)
          .should("contain", res[facilityIndex].status);

        // check district
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .eq(6)
          .should("contain", res[facilityIndex].district);

        // check date opened
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .find("td")
          .eq(7)
          .should("contain", res[facilityIndex].dateOpened);
      }
    });
  });
});
