import { OpenAPIV3_1 } from "openapi-types";
import { writeFileSync } from "fs";
import * as path from "path";
import { TAG_NAMES } from "./openapi.shared";
import { getAllProjectApiDefinition, getProjectApiDefinition, deleteProjectApiDefinition, addProjectApiDefinition, updateProjectApiDefinition } from "./src/functions/projects.conf"
import { deleteTaskApiDefinition, getAllTaskApiDefinition, getTaskApiDefinition, postTaskApiDefinition } from "./src/functions/tasks.conf"
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
      url: "https://fsms7kbkw9.execute-api.ap-south-1.amazonaws.com/preprod",
    },
  ],
  info: {
    title: "Nirma Serverless",
    version: "1.0.0",
    description: "Rest API for creating and getting Project and Tasks",
  },
  tags: Tags,
  paths: {
    "/projects":{...getAllProjectApiDefinition, ...addProjectApiDefinition, ...updateProjectApiDefinition},
    "/projects/{id}":{
      ...getProjectApiDefinition,
      ...deleteProjectApiDefinition
    },
    "/tasks":{
      ...getAllTaskApiDefinition,
      ...postTaskApiDefinition
    },
    "/tasks/{id}":{
      ...getTaskApiDefinition,
      ...deleteTaskApiDefinition
    },
  }
};

writeFileSync(
  path.join(__dirname, "docs", "api.spec.json"),
  JSON.stringify(apiSchema, null, 2)
);