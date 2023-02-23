import { OpenAPIV3_1 } from "openapi-types";

export const ProjectObject: Record<string, OpenAPIV3_1.SchemaObject> = {    
    name : {
      type : "string",
      description: "Name of the Project"
    },
    description : {
      type : "string",
      description: "description of project"
    }
}