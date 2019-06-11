/// <reference types="Cypress" />
describe("Shows User Details", () => {
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

  it("Shows user details on click", () => {
    var userIndex;
    cy.fetch_users().then(res => {
      // get random user index
      userIndex =
        res.length >= 10
          ? Math.floor(Math.random() * 9)
          : Math.floor(Math.random() * (res.length - 1));

      cy.get("table tbody .MuiTableRow-root-32")
        .eq(userIndex)
        .click();

      cy.get("table[test-id='viewuser'] tbody tr td")
        .eq(1)
        .contains(res[userIndex].firstname);

      cy.get("table[test-id='viewuser'] tbody tr td")
        .eq(3)
        .contains(res[userIndex].lastname);

      cy.get("table[test-id='viewuser'] tbody tr td")
        .eq(5)
        .contains(res[userIndex].email);
    });
  });
});
