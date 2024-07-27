import * as path from "node:path";

import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "slnchn-sketches-bucket", {
      bucketName: "slnchn-sketches-bucket",
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "slnchn-sketches-bucket-oai",
      {
        comment: bucket.bucketName,
      }
    );

    bucket.grantRead(originAccessIdentity);

    const distribution = new cloudfront.Distribution(
      this,
      "slnchn-sketches-distribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(bucket, {
            originAccessIdentity,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },

        defaultRootObject: "index.html",

        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          },
        ],
      }
    );

    new s3deploy.BucketDeployment(this, "slnchn-sketches-deployment", {
      destinationBucket: bucket,
      sources: [s3deploy.Source.asset(path.join(__dirname, "../../dist"))],
      distribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
    });
  }
}
