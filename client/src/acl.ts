export type acActions =
  | "facility:licensing_status"
  | "facility:basic_details:create"
  | "facility:basic_details:update"
  | "facility:contact_location_details:create"
  | "facility:contact_location_details:update"
  | "facility:resources:create"
  | "facility:resources:update"
  | "facility:resources:delete"
  | "facility:utilities:create"
  | "facility:utilities:update"
  | "facility:utilities:delete"
  | "facility:services:create"
  | "facility:services:update"
  | "facility:services:delete"
  | "user:view"
  | "user:create"
  | "user:update"
  | "user:delete";

export const acl = {
  admin: {
    static: [
      "facility:licensing_status",
      "facility:basic_details:create",
      "facility:basic_details:update",
      "facility:contact_location_details:create",
      "facility:contact_location_details:update",
      "facility:resources:create",
      "facility:resources:update",
      "facility:resources:delete",
      "facility:utilities:create",
      "facility:utilities:update",
      "facility:utilities:delete",
      "facility:services:create",
      "facility:services:update",
      "facility:services:delete",
      "user:view",
      "user:create",
      "user:update",
      "user:delete"
    ]
  },
  medical_council: {
    static: ["facility:licensing_status"],
    dynamic: {
      "user:update": ({ currentUserId, userId }: any) => {
        return currentUserId === userId;
      }
    }
  },
  cmed: {
    static: [
      "facility:basic_details:create",
      "facility:basic_details:update",
      "facility:contact_location_details:create",
      "facility:contact_location_details:update",
      "facility:resources:create",
      "facility:resources:update",
      "facility:resources:delete",
      "facility:utilities:create",
      "facility:utilities:update",
      "facility:utilities:delete",
      "facility:services:create",
      "facility:services:update",
      "facility:services:delete"
    ],
    dynamic: {
      "user:update": ({ currentUserId, userId }: any) => {
        return currentUserId === userId;
      }
    }
  },
  dho: {
    static: [
      "facility:basic_details:create",
      "facility:basic_details:update",
      "facility:contact_location_details:create",
      "facility:contact_location_details:update",
      "facility:resources:create",
      "facility:resources:update",
      "facility:resources:delete",
      "facility:utilities:create",
      "facility:utilities:update",
      "facility:utilities:delete",
      "facility:services:create",
      "facility:services:update",
      "facility:services:delete"
    ],
    dynamic: {
      "user:update": ({ currentUserId, userId }: any) => {
        return currentUserId === userId;
      }
    }
  },
  public: {
    static: []
  },
  clinical_department: {
    static: [
      "facility:services:create",
      "facility:services:update",
      "facility:services:delete"
    ],
    dynamic: {
      "user:update": ({ currentUserId, userId }: any) => {
        return currentUserId === userId;
      }
    }
  },
  infrastructure_department: {
    static: [
      "facility:resources:create",
      "facility:resources:update",
      "facility:resources:delete"
    ],
    dynamic: {
      "user:update": ({ currentUserId, userId }: any) => {
        return currentUserId === userId;
      }
    }
  }
};
