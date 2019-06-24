/// <reference types="Cypress" />
describe("Navigates to the view of the clicked menu", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  const correctCredentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const adminMenu = [
    {
      name: "Home",
      url: `${FRONTEND_URL}/`
    },
    {
      name: "Facilities",
      url: `${FRONTEND_URL}/facilities`
    },
    {
      name: "Users",
      url: `${FRONTEND_URL}/users`
    },
    {
      name: "More",
      options: [
        {
          name: "About",
          url: `${FRONTEND_URL}/about`
        },
        {
          name: "Feedback",
          url: `${FRONTEND_URL}/feedback`
        },
        {
          name: "Help",
          url: `${FRONTEND_URL}/help`
        }
      ]
    }
  ];

  const publicMenu = [
    {
      name: "Home",
      url: `${FRONTEND_URL}/`
    },
    {
      name: "Facilities",
      url: `${FRONTEND_URL}/facilities`
    },
    {
      name: "More",
      options: [
        {
          name: "About",
          url: `${FRONTEND_URL}/about`
        },
        {
          name: "Feedback",
          url: `${FRONTEND_URL}/feedback`
        },
        {
          name: "Help",
          url: `${FRONTEND_URL}/help`
        }
      ]
    }
  ];

  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  //public nav test
  it("Performs public menu navigation", () => {
    cy.visit(FRONTEND_URL);
    publicMenu.map(menuItem => {
      if (menuItem.options && menuItem.options.length > 0) {
        for (let opt of menuItem.options) {
          cy.get(`[data-test=menu${menuItem.name}]`).click();
          cy.get(`[data-test=menu${opt.name}]`).click();
          cy.location().should(loc => {
            expect(loc.href).to.eq(opt.url);
          });
        }
        return;
      }
      cy.get(`[data-test=menu${menuItem.name}]`).click();
      cy.location().should(loc => {
        expect(loc.href).to.eq(menuItem.url);
      });
    });
  });

  //admin nav test
  it("Performs admin menu navigation", () => {
    cy.visit(FRONTEND_URL);
    cy.get(`[data-test=menuLogin]`).click();

    cy.get("input[name=username]").clear();
    cy.get("input[name=password]").clear();

    cy.get("input[name=username]").type(correctCredentials.username);
    cy.get("input[name=password]").type(correctCredentials.password);

    cy.get("button")
      .first()
      .click();

    adminMenu.map(menuItem => {
      if (menuItem.options && menuItem.options.length > 0) {
        for (let opt of menuItem.options) {
          cy.get(`[data-test=menu${menuItem.name}]`).click();
          cy.get(`[data-test=menu${opt.name}]`).click();
          cy.location().should(loc => {
            expect(loc.href).to.eq(opt.url);
          });
        }
        return;
      }
      cy.get(`[data-test=menu${menuItem.name}]`).click();
      cy.location().should(loc => {
        expect(loc.href).to.eq(menuItem.url);
      });
    });
  });
});
