import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3_1 } from "openapi-types";
import { ProjectObject } from "./project-object"

export const AccountIdParameter = {
  in: "path",
  name: "accountId",
  required: true,
  schema: {
    type: "string",
    enum: ["leopb", "smartleads"],
  },
  description: "The accountId for which you are connecting to this api",
} as const;


export const TAG_NAMES = {
  PROJECTS: "Project",
  TASK: "Task"
} as const;

////  SUCCESS ARRAY RESPONSE PROJECTS
export const TaskArraySuccessResponseSchemaProjects = {
  type: "array",
  items: {
    type: "object",
    properties: ProjectObject 
  },
  example: {
    id: "1",
    name: "Jap Purohit",
    description: "update",
    createdAt: "2023-02-23",
    updatedAt: "2023-02-23"
  },
} as const;

export function getTaskArraySuccessResponseProjects(
  description: string,
  example?: [{}]
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...TaskArraySuccessResponseSchemaProjects,
          example,
        },
      },
    },
  };
}

////  SUCCESS RESPONSE Projects
export const TaskSuccessResponseSchemaProjects = {
  type: "object",
  properties: ProjectObject,
  example: {
    id: "1",
    name: "Jap Purohit",
    description: "update",
    createdAt: "2023-02-23",
    updatedAt: "2023-02-23"
  },
} as const;

export function getTaskSuccessResponseProjects(
  description: string,
  example?: {}
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...TaskSuccessResponseSchemaProjects,
          example,
        },
      },
    },
  };
}

////  SUCCESS ADD RESPONSE Projects
export const AddSuccessResponseSchemaProjects = {
  type: "object",
  properties: ProjectObject,
  example: {
    id: "1",
    name: "Jap Purohit",
    description: "update",
    createdAt: "2023-02-23",
    updatedAt: "2023-02-23"
  },
} as const;

export function addProjectSuccessResponseProjects(
  description: string,
  example?: {}
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...AddSuccessResponseSchemaProjects,
          example,
        },
      },
    },
  };
}

/// Update
export const UpdateResponseSchemaProjects = {
  type: "object",
  properties: ProjectObject,
  example: {
    id: "1",
    name: "Jap Purohit",
    description: "update",
    createdAt: "2023-02-23",
    updatedAt: "2023-02-23"
  },
} as const;

export function updateResponseSchemaProjects(
  description: string,
  example?: {}
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...UpdateResponseSchemaProjects,
          example,
        },
      },
    },
  };
}

////  ERROR RESPONSE Projects
export const ErrorResponseSchemaProjects = {
  type: "object",
  properties: {
    message: {
      type: "string",

    },
  },
  required: ["message"],
  example: {
    message: "The operation you specified has been performed",
  },
} as const;


export function getErrorResponseProjects(
  description: string,
  example?: FromSchema<typeof ErrorResponseSchemaProjects>
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...ErrorResponseSchemaProjects,
          example,
        },
      },
    },
  };
}

  
export const LeoNotificationsApiSecuritySchema: OpenAPIV3_1.HttpSecurityScheme =
{
  type: "http",
  scheme: "Bearer",
  bearerFormat: "JWT",
  description:
    "The Frontegg token, this will help resolve to the User Object",
};

