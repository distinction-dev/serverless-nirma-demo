import { OpenAPIV3_1 } from "openapi-types";


export const UpdateProjectsParameters : Record<string, OpenAPIV3_1.SchemaObject> = {
  projectId : {
    type : "string",
    description: "Unique Id of Project"
  },
  name : {
    type : "string",
    description: "Name of the Project"
  },
  content : {
    type : "string",
    description: "description of project"
  },
  attachment : {
    type : "string",
    format : "binary",
    description: "Name of the File"
  }
};