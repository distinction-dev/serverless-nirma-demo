import { response } from "@lib/api-gateway";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  return response(200, {
    message:
      // eslint-disable-next-line max-len
      "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
    input: event,
  });
};
