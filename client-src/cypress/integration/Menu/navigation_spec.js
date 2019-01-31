/// <reference types="Cypress" />
describe("Navigates to the view of the clicked menu", () => {
  const FRONTEND_URL = "http://localhost:3000";

  const adminMenu = [
    {
      name: "HOME",
      url: `${FRONTEND_URL}/`
    },
    {
      name: "ABOUT",
      url: `${FRONTEND_URL}/about`
    },

    {
      name: "FACILITIES",
      url: `${FRONTEND_URL}/facilities`
    },
    {
      name: "USERS",
      url: `${FRONTEND_URL}/users`
    },
    {
      name: "FEEDBACK",
      url: `${FRONTEND_URL}/feedback`
    }
  ];

  const publicMenu = [
    {
      name: "HOME",
      url: `${FRONTEND_URL}/`
    },
    {
      name: "ABOUT",
      url: `${FRONTEND_URL}/about`
    },
    {
      name: "FACILITIES",
      url: `${FRONTEND_URL}/facilities`
    },
    {
      name: "FEEDBACK",
      url: `${FRONTEND_URL}/feedback`
    }
  ];

  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  //public nav test
  it("Performs public menu navigation", () => {
    cy.visit(FRONTEND_URL);
    publicMenu.map(menuItem => {
      cy.get("#nav-mobile li a")
        .contains(menuItem.name)
        .click();
      cy.location().should(loc => {
        expect(loc.href).to.eq(menuItem.url);
      });
      cy.wait(2000);
    });
  });

  //admin nav test
  it("Performs admin menu navigation", () => {
    const credentials = {
      username: "mfladminuser",
      password: "admin"
    };
    cy.login(credentials);
    cy.visit(FRONTEND_URL);
    adminMenu.map(menuItem => {
      cy.get("#nav-mobile li a")
        .contains(menuItem.name)
        .click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(menuItem.url);
      });
      cy.wait(2000);
    });
  });
});
