import { OpenAPIV3_1 } from "openapi-types";
import { TAG_NAMES } from "./common-task.conf";
import { FromApiGatewayParameters } from "serverless-schema";
import { LeoUserProtectedEvent } from "./authorizer.conf";
import { getErrorResponseProjects, addProjectSuccessResponseProjects, updateResponseSchemaProjects, getTaskArraySuccessResponseProjects, getTaskSuccessResponseProjects } from "./common-projects.conf";
import { ProjectObject } from "./create-project"
const dummyObject = {
  "id": "1",        
  "name": "Jap Purohit",
  "description": "update",
  "createdAt": "2011-10-05T14:48:00.000Z",
  "updatedAt": "2011-10-05T14:48:00.000Z"
}
export const getAllProjectApiDefinition: OpenAPIV3_1.PathItemObject = {
  get: {
    tags: [TAG_NAMES.PROJECTS],
    operationId: "List Projects",
    responses: {
      200: getTaskArraySuccessResponseProjects("Get All Projects Successfully", [dummyObject]),
      400: getErrorResponseProjects("Invalid ProjectID, Error Generated", { "message" : "Invalid ProjectID"}),
    }  
  },
};
  
export const GetProjectsParameters = [
  {
    in: "path",
    name: "id",
    required: true,
    schema: {
      type: "string",
    },
    description: "The projectID to fetch the details",
  
  }
] as const;

export type GetProjectIDEvent = 
  Omit<LeoUserProtectedEvent, "pathParameters" | "queryStringParameters"> & FromApiGatewayParameters<
    // @ts-ignore
    typeof GetProjectsParameters
  >;
export const getProjectApiDefinition: OpenAPIV3_1.PathItemObject = {
  get: {
    tags: [TAG_NAMES.PROJECTS],
    operationId: "Get Project",
    responses: {
      200: getTaskSuccessResponseProjects("Get Project successfully", dummyObject),
      400: getErrorResponseProjects("Invalid ProjectID, Error Generated", { "message" : "Invalid ProjectID"}),},
    // @ts-ignore
    parameters: GetProjectsParameters
    // requestBody: GetProjectsParameters

  },
};

export const DeleteProjectsParameters = [
  {
    in: "path",
    name: "id",
    required: true,
    schema: {
      type: "string",
    },
    description: "The projectID to delete",
  
  }
] as const;

export const deleteProjectApiDefinition: OpenAPIV3_1.PathItemObject = {
  delete: {
    tags: [TAG_NAMES.PROJECTS],
    operationId: "Delete Project",
    responses: {
      200: getTaskSuccessResponseProjects("Deleted Task successfully", dummyObject),
      400: getErrorResponseProjects("Invalid ProjectID, Error Generated", { "message" : "Invalid ProjectID"}),
    },
    // @ts-ignore
    parameters: DeleteProjectsParameters
  },
};

export const addProjectApiDefinition: OpenAPIV3_1.PathItemObject = {
  post: {
    tags: [TAG_NAMES.PROJECTS],
    operationId: "Add Project",
    responses: {
      200: addProjectSuccessResponseProjects("Added Project successfully", dummyObject),
      400: getErrorResponseProjects("Some error occured", { "message" : "Some error occured"}),
    },
    requestBody: {
      content: {
        'application/json' : {     
          // @ts-ignore     
          schema: {
            type: 'object',
            properties: ProjectObject
        }
      }
    }
  },
}
}

export const updateProjectApiDefinition: OpenAPIV3_1.PathItemObject = {
  put: {
    tags: [TAG_NAMES.PROJECTS],
    operationId: "Update Project",
    responses: {
      200: updateResponseSchemaProjects("Updated Project successfully", dummyObject),
      400: getErrorResponseProjects("Some error occured", { "message" : "Some error occured"}),
    },
    requestBody: {
      content: {
        'application/json' : {     
          // @ts-ignore     
          schema: {
            type: 'object',
            properties: {
              id: {
                type: "string",
                description: "Project ID"
              },
              name : {
                type : "string",
                description: "Name of the Project"
              },
              description : {
                type : "string",
                description: "description of project"
              }
            }
        }
      }
    },
}}};
