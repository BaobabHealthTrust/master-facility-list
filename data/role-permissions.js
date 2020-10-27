"use strict";

// corresponds to request methods
const operations = {
  WRITE: "POST",
  UPDATE: "PUT",
  READ: "GET",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH"
};

const permissions = {
  DENY: false,
  ALLOW: true
};

// user roles
const roles = {
  ALL: "all",
  ADMIN: "admin",
  CMED: "cmed",
  DHO: "dho",
  PUBLIC: "public",
  MEDICAL_COUNCIL: "medical_council",
  INFRASTRUCTURE_DEPARTMENT: "infrastructure_department",
  CLINICAL_DEPARTMENT: "clinical_department",
  FACILITY_IN_CHARGE: "facility_in_charge"
};

const facility = {
  ALL_FIELDS: "all",
  REGULATORY_STATUS: "facility_regulatory_status_id",
  REGISTRATION_NUMBER: "registration_number",
  FACILITY_TYPE: "facility_type_id"
};

const customCheck = (loggedUserId, userUrlId, role) => {
  if (role === roles.ADMIN) {
    return true;
  }

  return loggedUserId === userUrlId;
};

const rolePermissions = [
  {
    role: roles.ALL,
    acls: [
      {
        model: "facilities",
        methods: [
          { method: "*", permissions: [operations.READ] },
          { method: "services", permissions: [operations.READ] },
          { method: "utilities", permissions: [operations.READ] },
          { method: "resources", permissions: [operations.READ] },
          { method: "list", permissions: [operations.READ] },
          { method: "filter", permissions: [operations.READ] }
        ]
      },
      {
        model: "facilityutilities",
        methods: [
          { method: "*", permissions: [operations.READ] },
          { method: "latest", permissions: [operations.READ] }
        ]
      },
      {
        model: "clients",
        methods: [
          {
            method: "login",
            permissions: [operations.WRITE, operations.OPTIONS]
          },
          {
            method: "requestPasswordReset",
            permissions: [operations.WRITE]
          },

          {
            method: "*",
            permissions: [operations.READ, operations.OPTIONS],
            customCheck
          }
        ]
      },
      {
        model: "facilityresources",
        methods: [
          { method: "*", permissions: [operations.READ] },
          { method: "latest", permissions: [operations.READ] }
        ]
      },
      {
        model: "facilityservices",
        methods: [
          { method: "*", permissions: [operations.READ] },
          { method: "latest", permissions: [operations.READ] }
        ]
      },
      {
        model: "facilitytypes",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "districts",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "addresses",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "contactpeople",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "feedbacks",
        methods: [
          { method: "*", permissions: [operations.READ] },
          { method: "feedback", permissions: [operations.WRITE] }
        ]
      },
      {
        model: "feedbacktypes",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "geolocations",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "locations",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "operationalstatuses",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "owners",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "regulatorystatuses",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "resources",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "resourcetypes",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "services",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "utilities",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "utilitytypes",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "zones",
        methods: [{ method: "*", permissions: [operations.READ] }]
      },
      {
        model: "servicetypes",
        methods: [{ method: "*", permissions: [operations.READ] }]
      }
    ]
  },
  {
    role: roles.ADMIN,

    acls: [
      {
        model: "facilities",
        methods: [
          {
            method: "*",
            permittedUpdateFields: [facility.FACILITY_TYPE],
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "services",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "publish",
            permissions: [operations.WRITE]
          },
          {
            method: "utilities",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "resources",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          }
        ]
      },
      {
        model: "facilityResources",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },

      {
        model: "facilityServices",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },

      {
        model: "clients",
        methods: [
          {
            method: "*",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "createUser",
            permissions: [operations.WRITE]
          },
          {
            method: "updateUser",
            permittedUpdateFields: ["all"],
            permissions: [operations.PATCH, operations.UPDATE]
          }
        ]
      },
      {
        model: "roles",
        methods: [
          {
            method: "*",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          }
        ]
      }
    ]
  },
  {
    role: roles.MEDICAL_COUNCIL,
    acls: [
      {
        model: "users",
        methods: [
          {
            method: "*",
            permissions: [operations.UPDATE]
          }
        ]
      },
      {
        model: "facilities",
        permittedUpdateFields: [
          facility.REGULATORY_STATUS,
          facility.REGISTRATION_NUMBER,
          facility.FACILITY_TYPE
        ],
        methods: [
          {
            method: "*",
            permissions: [operations.UPDATE]
          }
        ]
      }
    ]
  },
  {
    role: roles.CMED,
    acls: [
      {
        model: "facilities",
        methods: [
          {
            method: "*",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },

          {
            method: "services",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "utilities",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "resources",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          }
        ]
      },
      {
        model: "users",
        methods: [
          {
            method: "*",
            permissions: [operations.UPDATE]
          }
        ]
      },
      {
        model: "facilityServices",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },
      {
        model: "facilityResources",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },
      {
        model: "facilityUtilities",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      }
    ]
  },
  {
    role: roles.CLINICAL_DEPARTMENT,
    acls: [
      {
        model: "facilities",
        methods: [
          {
            method: "services",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          }
        ]
      },
      {
        model: "facilityServices",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },
      {
        model: "users",
        methods: [
          {
            method: "*",
            permissions: [operations.UPDATE]
          }
        ]
      }
    ]
  },
  {
    role: roles.INFRASTRUCTURE_DEPARTMENT,
    acls: [
      {
        model: "facilities",
        methods: [
          {
            method: "resources",
            permittedUpdateFields: [facility.FACILITY_TYPE],
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          }
        ]
      },
      {
        model: "facilityUtilities",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },
      {
        model: "users",
        methods: [
          {
            method: "*",
            permissions: [operations.UPDATE]
          }
        ]
      }
    ]
  },
  {
    role: roles.FACILITY_IN_CHARGE,
    acls: [
      {
        model: "facilities",
        methods: [
          {
            method: "*",
            permittedUpdateFields: [facility.ALL_FIELDS],
            permissions: [operations.UPDATE, operations.PATCH]
          }
        ]
      }
    ]
  },
  {
    role: roles.DHO,
    acls: [
      {
        model: "facilities",
        methods: [
          {
            method: "*",
            permittedUpdateFields: [facility.FACILITY_TYPE],
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "services",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "utilities",
            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          },
          {
            method: "resources",

            permissions: [
              operations.DELETE,
              operations.READ,
              operations.UPDATE,
              operations.WRITE
            ]
          }
        ]
      },
      {
        model: "facilityResources",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },
      {
        model: "facilityServices",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },

      {
        model: "facilityUtilities",
        methods: [
          {
            method: "*",
            permissions: [operations.READ, operations.UPDATE, operations.WRITE]
          },
          {
            method: "replaceOrCreate",
            permission: [operations.WRITE]
          }
        ]
      },
      {
        model: "users",
        methods: [
          {
            method: "*",
            permissions: [operations.UPDATE]
          }
        ]
      }
    ]
  }
];

module.exports = rolePermissions;
