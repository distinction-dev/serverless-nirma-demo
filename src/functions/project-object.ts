export const ProjectObject = {
    id :{
      type : "string",
      description: "Unique Id of Project"
    },
    name : {
      type : "string",
      description: "Name of the Project"
    },
    description : {
      type : "string",
      description: "description of project"
    },
    createdAt : {
      type : "string",
      format: "dateTtime",
      description: "Creation date of the project"
      
    },
    updatedAt : {
      type : "string",
      format: "dateTtime",
      description: "Last updation date of the project"
    }  
}