/// <reference types="Cypress" />

describe("Test that menu items are visible and display the required view on click for public", () => {
  const FRONTEND_URL = "http://localhost:3000";

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it("shows the public menu", () => {
    const publicMenu = ["HOME", "ABOUT", "FACILITIES", "FEEDBACK", "LOGIN"];
    const menuList = [];
    cy.visit(FRONTEND_URL);
    cy.get("#nav-mobile").should("be.visible");
    cy.get("#nav-mobile li a")
      .each((el, index, list) => {
        menuList.push(el.context.innerHTML);
      })
      .then(() => {
        expect(publicMenu).to.be.members(menuList);
      });
  });

  it("shows the admin menu", () => {
    const credentials = {
      username: "mfladminuser",
      password: "admin"
    };
    cy.login(credentials);
    const publicMenu = ["HOME", "ABOUT", "USERS", "FACILITIES", "FEEDBACK"];
    const menuList = [];
    cy.visit(FRONTEND_URL);
    cy.get("#nav-mobile").should("be.visible");
    cy.get("#nav-mobile li a")
      .each((el, index, list) => {
        menuList.push(el.context.innerHTML);
      })
      .then(() => {
        expect(publicMenu).to.be.members(
          menuList.splice(0, menuList.length - 2)
        );
      });
  });
});
