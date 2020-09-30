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
  ADMIN: "admin",
  CMED: "cmed",
  DHO: "dho",
  MEDICAL_COUNCIL: "medical_council",
  INFRASTRUCTURE_DEPARTMENT: "infrastructure_department",
  CLINICAL_DEPARTMENT: "clinical_department"
};

const rolePermissions = [
  {
    role: roles.ADMIN,
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
