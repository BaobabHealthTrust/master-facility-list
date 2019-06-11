/// <reference types="Cypress" />

describe("Test that User Can Logout using the Menu", () => {
  let firstName;

  before(() => {
    const credentials = {
      username: "mfladminuser",
      password: "admin"
    };
    cy.login(credentials);
    cy.window().then(
      win => (firstName = win.sessionStorage.getItem("firstname"))
    );
    cy.visit("http://localhost:3000/");
  });

  it("shows the username", () => {
    cy.get("li.dropdown-button")
      .first()
      .should("contain", firstName);
  });

  it("allows user to click on the logout button", () => {
    cy.get("li.dropdown-button")
      .first()
      .click()
      .get("ul.dropdown-content li")
      .first()
      .click();
  });

  it("logs the user out and hides their username", () => {
    cy.window().then(
      win => expect(win.sessionStorage.getItem("token")).to.be.null
    );
    cy.get("ul#nav-mobile")
      .first()
      .should("contain", "LOGIN");
  });
});
