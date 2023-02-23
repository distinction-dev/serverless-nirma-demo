import { OpenAPIV3_1 } from "openapi-types";
import { TAG_NAMES, getErrorResponseTask, getTaskSuccessResponseTask, getTaskArraySuccessResponseTask } from "./common-task.conf";
import { FromApiGatewayParameters } from "serverless-schema";
import { LeoUserProtectedEvent } from "./authorizer.conf";
import { UpdateProjectsParameters } from "./create-task";


const dummyTaskObj = {
  "id": "1",
  "projectId": "1",
  "name": "Jap Purohit",
  "content": "update",
  "status": "Not started",
  "attachment": "update",
  "createdAt": "2011-10-05T14:48:00.000Z",
  "updatedAt": "2011-10-05T14:48:00.000Z"
}

export const getAllTaskApiDefinition: OpenAPIV3_1.PathItemObject = {
  get: {
    tags: [TAG_NAMES.TASK],
    operationId: "Get All Tasks",
    responses: {
      200: getTaskArraySuccessResponseTask("Get All Tasks Successfully", [dummyTaskObj]),
      400: getErrorResponseTask("Invalid TaskId, Error Generated", { "message" : "Some error occured" }),
    }  
  },
};
  
export const GetTasksParameters = [
  {
    in: "path",
    name: "id",
    required: true,
    schema: {
      type: "string",
    },
    description: "The task to fetch the details",
  
  }
] as const;

export type GetTaskIDEvent = Omit<LeoUserProtectedEvent, "pathParameters" | "queryStringParameters"> &
  FromApiGatewayParameters<
    // @ts-ignore
    typeof GetTasksParameters
  >;
export const getTaskApiDefinition: OpenAPIV3_1.PathItemObject = {
  get: {
    tags: [TAG_NAMES.TASK],
    operationId: "Get Task",
    responses: {
      200: getTaskSuccessResponseTask("Get task successfully",dummyTaskObj ),
      400: getErrorResponseTask("Invalid TaskId, Error Generated", { "message" : "Invalid TaskID" }),
      
    },
    // @ts-ignore
    parameters: GetTasksParameters
  },
};

export const DeleteTasksParameters  = [
  {
    in: "path",
    name: "id",
    required: true,
    schema: {
      type: "string",
    },
    description: "The taskID to delete",
    
  }
] as const;

export const deleteTaskApiDefinition: OpenAPIV3_1.PathItemObject = {
  delete: {
    tags: [TAG_NAMES.TASK],
    operationId: "Delete Task",
    responses: {
      200: getTaskSuccessResponseTask("Deleted Task successfully",dummyTaskObj ),
      400: getErrorResponseTask("Invalid TaskId, Error Generated", { "message" : "Invalid TaskID"}),
    },
    // @ts-ignore
    parameters: DeleteTasksParameters
  },
};
  



/// post function of create
export const postTaskApiDefinition: OpenAPIV3_1.PathItemObject = {
  post: {
    tags: [TAG_NAMES.TASK],
    operationId: "Post Task",
    responses: {
      200: getTaskSuccessResponseTask("Created Task Successfully",dummyTaskObj ),
      400: getErrorResponseTask("Invalid TaskId, Error Generated", { "message" : "Invalid TaskID"}),
    },
    // @ts-ignore
    requestBody: {
      content: {
        "multipart/form-data":{
          // @ts-ignore
          schema: {
            type:"object",
            properties:
              UpdateProjectsParameters
            ,
            required:["file"]
          },
          encoding:{
            attachment: {
              contentType: "image/png, image/jpeg"
            }
          }
        }
      }
    }
  },
};
  


/// post function of Update
export const putTaskApiDefinition: OpenAPIV3_1.PathItemObject = {
  put: {
    tags: [TAG_NAMES.TASK],
    operationId: "Update Task",
    responses: {
      200: getTaskSuccessResponseTask("Created Task Successfully",dummyTaskObj ),
      400: getErrorResponseTask("Invalid TaskId, Error Generated", { "message" : "Invalid TaskID"}),
    },
    // @ts-ignore
    requestBody: {
      content: {
        "multipart/form-data":{
          // @ts-ignore
          schema: {
            type:"object",
            properties:
              UpdateProjectsParameters
            ,
            required:["file"]
          },
          encoding:{
            attachment: {
              contentType: "image/png, image/jpeg"
            }
          }
        }
      }
    }
  },
};
  