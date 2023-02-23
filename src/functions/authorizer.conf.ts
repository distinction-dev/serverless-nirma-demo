import { BaseClaims } from "@distinction-dev/lambda-authorizer-utils";
import { AwsHttpLambdaAuthorizer, AwsFunction } from "serverless-schema";
import { APIGatewayProxyEventBase } from "aws-lambda";

export const authConfig: AwsHttpLambdaAuthorizer = {
  name: "authorizer",
  resultTtlInSeconds: 0,
  type: "REQUEST",
};

export const authorizerFunction: AwsFunction = {
  handler: "src/functions/authorizer.handler",
};

export interface LeoClaims extends BaseClaims {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  metadata: {};
  roles: string[];
  permissions: string[];
  tenantId: string;
  tenantIds: string[];
  profilePictureUrl: string;
  sid: string;
  type: string;
  aud: string;
  iss: string;
}

export type LeoAuthorizerContext = Pick<
  LeoClaims,
  "sub" | "email" | "name" | "email_verified" | "profilePictureUrl"
>;

export type LeoUserProtectedEvent =
  APIGatewayProxyEventBase<LeoAuthorizerContext>;