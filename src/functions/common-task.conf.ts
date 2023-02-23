import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3_1 } from "openapi-types";
import { TaskObject } from "./task-object"

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

////  SUCCESS ARRAY RESPONSE TASK
export const TaskArraySuccessResponseSchemaTask = {
  type: "array",
  items: {
    type: "object",
    properties: TaskObject
  },
  example: {
    id : '1', 
    projectId : '2',
    name: '2',
    content: '1',
    attchment: '2',
    createdAt: '3',
    updatedAt: '1'
  },
} as const;

export function getTaskArraySuccessResponseTask(
  description: string,
  example?: [{}]
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...TaskArraySuccessResponseSchemaTask,
          example,
        },
      },
    },
  };
}

////  SUCCESS RESPONSE TASK
export const TaskSuccessResponseSchemaTask = {
  type: "object",
  properties: TaskObject,
  example: {
    id : '1', 
    projectId : '2',
    name: '2',
    content: '1',
    attchment: '2',
    createdAt: '3',
    updatedAt: '1'
  },
} as const;

export function getTaskSuccessResponseTask(
  description: string,
  example?: {}
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...TaskSuccessResponseSchemaTask,
          example,
        },
      },
    },
  };
}

////  ERROR RESPONSE TASK
export const ErrorResponseSchemaTask = {
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


export function getErrorResponseTask(
  description: string,
  example?: FromSchema<typeof ErrorResponseSchemaTask>
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...ErrorResponseSchemaTask,
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

