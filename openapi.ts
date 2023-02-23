import { OpenAPIV3_1 } from "openapi-types";
import { writeFileSync } from "fs";
import * as path from "path";
import { LeoNotificationsApiSecuritySchema, TAG_NAMES } from "./openapi.shared";

const Tags: OpenAPIV3_1.TagObject[] = [
  {
    name: TAG_NAMES.NOTIFICATIONS,
    description: "Collection of endpoints containing notification",
  },
];

const apiSchema: OpenAPIV3_1.Document = {
  openapi: "3.1.0",
  servers: [
    {
      url: "http://y9yle5ib40.execute-api.us-west-2.amazonaws.com/dev",
    },
  ],
  info: {
    title: "Leo Notification Service",
    version: "1.0.0",
    description: "Rest Api for creating and getting user notifications",
  },
  tags: Tags,
  paths: {
    "/{accountId}/notification/": {},
    "/{accountId}/notification/{id}": {},
  },
  components: {
    securitySchemes: {
       Bearer: LeoNotificationsApiSecuritySchema,
    },
  },
};

writeFileSync(
  path.join(__dirname, "docs", "api.spec.json"),
  JSON.stringify(apiSchema, null, 2)
);