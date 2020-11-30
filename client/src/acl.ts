export type acActions =
  | "facility:basic_details:licensing_status"
  | "facility:basic_details:registration_number"
  | "facility:basic_details:facility_type"
  | "facility:basic_details:create"
  | "facility:basic_details:update"
  | "facility:basic_details:delete"
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
      "facility:basic_details:create",
      "facility:basic_details:licensing_status",
      "facility:basic_details:registration_number",
      "facility:basic_details:facility_type",
      "facility:basic_details:update",
      "facility:basic_details:delete",
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
    ] as Array<acActions>
  },
  medical_council: {
    static: [
      "facility:basic_details:update",
      "facility:basic_details:licensing_status",
      "facility:basic_details:facility_type",
      "facility:basic_details:registration_number"
    ] as Array<acActions>,
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
      "facility:basic_details:delete",
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
      "facility:basic_details:facility_type",
      "facility:basic_details:create",
      "facility:basic_details:update",
      "facility:basic_details:delete",
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
    ] as Array<acActions>,
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
  },
  facility_in_charge: {
    static: [
      "facility:basic_details:create",
      "facility:basic_details:update",
      "facility:contact_location_details:create",
      "facility:contact_location_details:update",
      "facility:resources:update",
      "facility:utilities:update",
      "facility:services:update"
    ],
    dynamic: {
      "user:update": ({ currentUserId, userId }: any) => {
        return currentUserId === userId;
      }
    }
  }
};
