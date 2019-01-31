/// <reference types="Cypress" />

describe("Tests Facility List", () => {
  const FRONTEND_URL = "http://localhost:3000";

  it("navigates to facility list page", () => {
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

  it("Shows valid facility data", () => {
    cy.fetch_facilieties_list().then(res => {
      var facilityIndex = 0;

      for (let testCount = 1; testCount <= 3; testCount++) {
        // get random facility index
        facilityIndex = Math.floor(Math.random() * 9);
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

  it("Shows Download", () => {
    cy.get(".fixed-action-btn.horizontal.mfl-download")
      .first()
      .should("be.visible");
  });
  it("Reveals Download buttons for all formats on hover", () => {
    cy.get(".fixed-action-btn.horizontal.mfl-download")
      .first()
      .trigger("mouseover");
    cy.get(".fixed-action-btn.horizontal.mfl-download ul li a")
      .first()
      .should("be.visible");
    cy.get(".fixed-action-btn.horizontal.mfl-download ul li a")
      .eq(1)
      .should("be.visible");
    cy.get(".fixed-action-btn.horizontal.mfl-download ul li a")
      .eq(2)
      .should("be.visible");
  });
  it("Downloads CSV", () => {
    cy.download_facility_list("csv").then(res => {
      expect(res.headers["content-type"]).to.contain("text/csv");
    });
  });
  it("Downloads EXCEL", () => {
    cy.download_facility_list("excel").then(res => {
      expect(res.headers["content-type"]).to.contain(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    });
  });
  it("Downloads PDF", () => {
    cy.download_facility_list("pdf").then(res => {
      expect(res.headers["content-type"]).to.contain("application/pdf");
    });
  });
  it("Navigates to the facility details page", () => {
    // get random facility index
    var facilityIndex = Math.floor(Math.random() * 9);
    cy.fetch_facilieties_list().then(res => {
      cy.get("table tbody .MuiTableRow-root-32")
        .eq(facilityIndex)
        .click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${res[facilityIndex].id}/summary`
        );
      });
      cy.get(".container.mfl-titles")
        .first()
        .should("contain", res[facilityIndex].code);
      console.log(res);
    });
  });
});
