// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import settings from "../../src/App/settings";
const END_POINT = `${settings.API}/`;

Cypress.Commands.add("login", credentials => {
  const RESOURCE = `Clients/login/`;
  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("POST", URL, credentials).then(resp => {
    const token = resp.body.id;
    const userId = resp.body.userId;

    const USER_RESOURCE = `Clients/${userId}`;

    const header = {
      Authorization: `${token}`
    };

    const USER_URL = `${END_POINT}${USER_RESOURCE}`;
    cy.request({ url: USER_URL, headers: header }).then(resp => {
      const firstName = resp.body.firstname;
      cy.window().then(win => {
        win.sessionStorage.setItem("token", token);
        win.sessionStorage.setItem("firstname", firstName);
      });
    });
  });
});
Cypress.Commands.add("fetch_current_facility", id => {
  const RESOURCE = `Facilities/${id}`;
  const FILTER = {
    include: [
      "owner",
      "facilityType",
      "operationalStatus",
      "regulatoryStatus",
      "contactPeople",
      "addresses",
      "locations",
      "geolocations",
      { district: "zone" }
    ]
  };
  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;
  cy.request("GET", URL).then(res => {
    res.body;
  });
});

Cypress.Commands.add("fetch_current_resources", id => {
  const RESOURCE = `FacilityResources/latest?id=${id}`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    res.body;
  });
});

Cypress.Commands.add("fetch_current_utilities", id => {
  const RESOURCE = `FacilityUtilities/latest?id=${id}`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    res.body;
  });
});

Cypress.Commands.add("fetch_utilities", () => {
  const RESOURCE = `Utilities`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_resources", () => {
  const RESOURCE = `Resources`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_current_services", id => {
  const RESOURCE = `FacilityServices/hierarchy?facility_id=${id}`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body.hierarchy;
  });
});

Cypress.Commands.add("fetch_service_types", () => {
  const RESOURCE = `ServiceTypes`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_facilieties", (filterBy, filterText) => {
  const RESOURCE = `Facilities`;
  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return filterBy
      ? res.body.filter(facility => {
          return facility[filterBy] == filterText;
        })
      : res.body;
  });
});

Cypress.Commands.add("fetch_facility_details", id => {
  const RESOURCE = `Facilities/`;
  const URL = `${END_POINT}${RESOURCE}${id}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("download_facility_list", fileFormat => {
  const RESOURCE = `Facilities/download`;
  const URL = `${END_POINT}${RESOURCE}`;
  const data = JSON.stringify({ where: {}, format: fileFormat });
  cy.request("GET", `${URL}?data=${data}`).then(res => {
    return res;
  });
});

Cypress.Commands.add("fetch_facilieties_list", (filterBy, filterText) => {
  const RESOURCE = `Facilities/list`;
  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body.data.sort((a, b) => (a.name > b.name ? 1 : -1));
  });
});

Cypress.Commands.add(
  "fetch_facilieties_for_districts",
  (filterBy, filterText, dist = []) => {
    const RESOURCE = `Facilities`;
    var districts = dist.map(dist => {
      return dist.id;
    });
    const URL = `${END_POINT}${RESOURCE}`;
    cy.request("GET", URL).then(res => {
      return filterBy
        ? res.body.filter(facility => {
            return (
              facility[filterBy] == filterText &&
              districts.includes(facility.district_id)
            );
          })
        : res.body.filter(facility => {
            return districts.length > 0
              ? districts.includes(facility.district_id)
              : true;
          });
    });
  }
);

Cypress.Commands.add("fetch_facilieties_aggre_by_op_status", districts => {
  const RESOURCE = `Facilities/aggregates/operationalstatuses?districts=${JSON.stringify(
    districts
  )}`;
  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body.response;
  });
});

Cypress.Commands.add("fetch_facilieties_aggre_by_reg_status", districts => {
  const RESOURCE = `Facilities/aggregates/regulatorystatuses?districts=${JSON.stringify(
    districts
  )}`;
  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body.response;
  });
});

Cypress.Commands.add("fetch_facilieties_aggre_by_owner", districts => {
  const RESOURCE = `Facilities/aggregates/typeandownership?districts=${JSON.stringify(
    districts
  )}`;
  const URL = `${END_POINT}${RESOURCE}`;
  const typeFilter = [
    "Christian Health Association of Malawi (CHAM)",
    "Government/public",
    "Private for profit"
  ];
  cy.request("GET", URL).then(res => {
    var groupedByOwners = res.body.response.map(data => {
      const total =
        data["Health Centre"] +
        data["Dispensary"] +
        data["Rural/Community Hospital"] +
        data["Health Post"] +
        data["District Hospital"] +
        data["Hospital"] +
        data["Central Hospital"] +
        data["Other Hospital"] +
        data["Maternity"] +
        data["Govt/Public"];
      return {
        name: data.name,
        count: total
      };
    });
    var mainOwn = groupedByOwners.filter(body => {
      return typeFilter.includes(body.name);
    });
    var other = groupedByOwners
      .filter(d => !typeFilter.includes(d.name))
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
      }, 0);
    return [...mainOwn, { name: "Other", count: other }];
  });
});
Cypress.Commands.add("fetch_districts", (filterBy, filterColl = []) => {
  const RESOURCE = `Districts`;
  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return filterBy
      ? res.body.filter(district => {
          return filterColl.includes(district[filterBy]);
        })
      : res.body;
  });
});

Cypress.Commands.add("quick_search", searchTerm => {
  const RESOURCE = `Facilities/list`;
  const URL = `${END_POINT}${RESOURCE}?regex=${searchTerm}`;
  cy.request("GET", URL).then(res => {
    return res.body.data.slice(0, 5);
  });
});

Cypress.Commands.add("fetch_users", () => {
  const RESOURCE = `Clients`;
  const FILTER = {
    where: {
      archived_date: null
    },
    order: "created_at DESC"
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;

  const headers = {
    Authorization: `${sessionStorage.getItem("token")}`
  };
  cy.request({ method: "GET", url: URL, headers: headers }).then(res => {
    return res.body.sort((a, b) => (a.firstname > b.firstname ? 1 : -1));
  });
});
Cypress.Commands.add("fetch_add_facility", async () => {
  return JSON.parse(await localStorage.getItem("new_facility"));
});
Cypress.Commands.add("clear_local_storage", async () => {
  return await localStorage.clear();
});
Cypress.Commands.add("set_active_tab", async () => {
  return await localStorage.setItem("new_facility_active_tab");
});

Cypress.Commands.add("basic_filter", (type, value) => {
  const RESOURCE = `Facilities`;

  const FILTER = {
    where: {
      [type]: value
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;

  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("resources_filter", (id, value) => {
  const RESOURCE = `FacilityResources`;
  const RESOURCE2 = `Facilities/list`;

  const FILTER = {
    where: {
      and: [
        {
          resource_id: id
        },
        { quantity: { gte: value[0] } },
        { quantity: { lte: value[1] } }
      ]
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;

  cy.request("GET", URL).then(res => {
    let URL = `${END_POINT}${RESOURCE2}?filter=${JSON.stringify({
      where: { id: { inq: res.body.map(result => result.facility_id) } },
      order: "facility_name"
    })}`;
    return cy.request("GET", URL).then(res => {
      return res.body.data;
    });
  });
});

Cypress.Commands.add("utilities_filter", id => {
  const RESOURCE = `FacilityUtilities`;
  const RESOURCE2 = `Facilities/list`;

  const FILTER = {
    where: {
      utility_id: id
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;

  cy.request("GET", URL).then(res => {
    let URL = `${END_POINT}${RESOURCE2}?filter=${JSON.stringify({
      where: { id: { inq: res.body.map(result => result.facility_id) } },
      order: "facility_name"
    })}`;
    return cy.request("GET", URL).then(res => {
      return res.body.data;
    });
  });
});

Cypress.Commands.add("services_filter", id => {
  const RESOURCE = `FacilityServices`;
  const RESOURCE2 = `Facilities/list`;

  const FILTER = {
    where: {
      service_id: id
    }
  };

  const URL = `${END_POINT}${RESOURCE}?filter=${JSON.stringify(FILTER)}`;

  cy.request("GET", URL).then(res => {
    let URL = `${END_POINT}${RESOURCE2}?filter=${JSON.stringify({
      where: { id: { inq: res.body.map(result => result.facility_id) } },
      order: "facility_name"
    })}`;
    return cy.request("GET", URL).then(res => {
      return res.body.data;
    });
  });
});

Cypress.Commands.add("fetch_facility_types", () => {
  const RESOURCE = `FacilityTypes`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_regulatory_statuses", () => {
  const RESOURCE = `RegulatoryStatuses `;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_operational_statuses", () => {
  const RESOURCE = `OperationalStatuses `;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_owners", () => {
  const RESOURCE = `Owners`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_resources", () => {
  const RESOURCE = `Resources`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});

Cypress.Commands.add("fetch_services", () => {
  const RESOURCE = `Services`;

  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("GET", URL).then(res => {
    return res.body;
  });
});
