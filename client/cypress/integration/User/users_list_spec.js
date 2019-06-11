/// <reference types="Cypress" />
describe("Shows Users", () => {
  const FRONTEND_URL = "http://localhost:3000";

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });
  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  it("Navigates to the users page", () => {
    cy.login(credentials);
    cy.visit(FRONTEND_URL);
    cy.get("#nav-mobile li a[href='/users']").click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(`${FRONTEND_URL}/users`);
    });
  });

  it("Shows users", () => {
    var userIndex;
    cy.fetch_users().then(res => {
      for (let testCount = 1; testCount <= 3; testCount++) {
        // get random facility index
        userIndex =
          res.length >= 10
            ? Math.floor(Math.random() * 9)
            : Math.floor(Math.random() * (res.length - 1));
        //   check users
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(userIndex)
          .find("td")
          .first()
          .should("contain", res[userIndex].username);

        // firstname
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(userIndex)
          .find("td")
          .eq(1)
          .should("contain", res[userIndex].firstname);

        // check lastname
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(userIndex)
          .find("td")
          .eq(2)
          .should("contain", res[userIndex].lastname);

        // check ownership
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(userIndex)
          .find("td")
          .eq(3)
          .should("contain", res[userIndex].email);
      }
    });
  });
});
