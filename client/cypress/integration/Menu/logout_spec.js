/// <reference types="Cypress" />

describe("Test that User Can Logout using the Menu", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  before(() => {
    const credentials = {
      username: "mfladminuser",
      password: "admin"
    };
    cy.login(credentials);
    cy.visit(`${FRONTEND_URL}/`);
  });

  it("shows the username", () => {
    cy.get(`[data-test=menuProfile]`);
  });

  it("Allows user to click on the logout button", () => {
    cy.get(`[data-test=menuProfile]`).click();
    cy.get(`[data-test=menuLogout]`).click();
  });

  it("Logs the user out and hides their username", () => {
    cy.window().then(
      win => expect(win.sessionStorage.getItem("token")).to.be.null
    );
  });
});
