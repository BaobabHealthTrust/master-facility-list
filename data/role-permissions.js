"use strict";

// corresponds to request methods
const operations = {
  WRITE: "POST",
  UPDATE: "PUT",
  READ: "GET",
  DELETE: "DELETE"
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
  CLINICAL_DEPARTMENT: "clinical_department"
};

const facility = {
  REGULATORY_STATUS: "facility_regulatory_status_id",
  REGISTRATION_NUMBER: "registration_number",
  FACILITY_TYPE: "facility_type_id"
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
          { method: "resources", permissions: [operations.READ] }
        ]
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
