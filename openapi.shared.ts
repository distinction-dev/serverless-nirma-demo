import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3_1 } from "openapi-types";

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
  NOTIFICATIONS: "Notifications",
} as const;

export const SuccessResponseSchema = {
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

export function getSuccessResponse(
  description: string,
  example?: FromSchema<typeof SuccessResponseSchema>
): OpenAPIV3_1.ResponseObject {
  return {
    description,
    content: {
      "application/json": {
        // @ts-ignore
        schema: {
          ...SuccessResponseSchema,
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