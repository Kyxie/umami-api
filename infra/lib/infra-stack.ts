import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const visitorFunction = new NodejsFunction(this, 'VisitorLambda', {
      entry: path.join(__dirname, '../lambda/handler.ts'),
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        externalModules: ['@vendia/serverless-express'],
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV || 'production',
        UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID || '',
        UMAMI_USER_TOKEN: process.env.UMAMI_USER_TOKEN || '',
      },
    });

    const allowedOrigins = (process.env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim());
    const api = new apigateway.LambdaRestApi(this, 'VisitorApi', {
      handler: visitorFunction,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: allowedOrigins,
         allowMethods: ['GET'],
      },
    });

    new cdk.CfnOutput(this, 'API Endpoint', {
      value: api.url,
    });
  }
}
