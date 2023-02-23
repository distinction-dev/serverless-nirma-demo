export const TaskObject = {
    id :{
      type : "string",
      description: "Unique Id of Task"
  
    },
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
      description: "Name of the File"
    },
    status : {
      type : "string",
      description: "Checks task status if started or not"
    },
    createdAt : {
      type : "string",
      format: "dateTtime",
      description: "Creation date of the task"
    },
    updatedAt : {
      type : "string",
      format: "dateTtime",
      description: "Last updation date of the project"
    }
}