/// <reference types="Cypress" />
describe("Login Test", () => {
  const wrongCredentials = {
    username: "someuser",
    password: "somepassword"
  };

  const correctCredentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errorMessage = "Invalid username or password";

  const enterCredentials = (credentials, description, clear = false) => {
    it(description, () => {
      if (clear) {
        cy.get("input[name=username]").clear();
        cy.get("input[name=password]").clear();
      }
      cy.get("input[name=username]").type(credentials.username);
      cy.get("input[name=password]").type(credentials.password);
    });
  };

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit("http://localhost:3000/login");
  });

  it("should show email and password fields", () => {
    cy.get("input[name=username]").should(
      "have.attr",
      "placeholder",
      "Enter Username"
    );
    cy.get("input[name=password]").should(
      "have.attr",
      "placeholder",
      "Enter Password"
    );
  });

  it("should show login buttons", () => {
    cy.get("button")
      .first()
      .should("contain", "Login");
  });

  // //Behaviour
  enterCredentials(
    wrongCredentials,
    "should allow user to type into email and password fields"
  );

  it("should show error when the wrong credentials are input", () => {
    cy.get("button")
      .first()
      .click();
    cy.get("html").should("contain", errorMessage);
  });

  enterCredentials(
    correctCredentials,
    "should allow user to type credentials again",
    true
  );

  it("should navigate to home page when the correct credentials are input", () => {
    cy.get("button")
      .first()
      .click();
    cy.url().should("equal", `${Cypress.env("FRONT_END_URL")}/`);
  });
});
