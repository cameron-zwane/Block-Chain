import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class DistLedgerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Role
    const lambdaRole = new iam.Role(this, 'lambdaRole', {
      roleName: `distLedger-lambda-role-distLedger`,
      description: `Lambda role for distLedger`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
      iam.ManagedPolicy.fromManagedPolicyArn(
        this,
        'lambdaVPCAccessPolicy',
        'arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole'
      ),],
    });

    // Attach inline policies to Lambda role
    lambdaRole.attachInlinePolicy(
      new iam.Policy(this, 'lambdaExecutionAccess', {
        policyName: 'lambdaExecutionAccess',
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            resources: ['*'],
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:DescribeLogGroups',
              'logs:DescribeLogStreams',
              'logs:PutLogEvents',
            ],
          }),
        ],
      })
    );

    const vpc = new ec2.Vpc(this, 'CDKVpc', {
      cidr: '10.0.0.0/16',
      subnetConfiguration: [
          {
              cidrMask: 24,
              name: 'distLedger-Public-subnet',
              subnetType: ec2.SubnetType.PUBLIC
          },
          {
              cidrMask: 24,
              name: 'distLedger-Private-subnet',
              subnetType: ec2.SubnetType.PRIVATE_ISOLATED
          }
        ]
    }) 
    
    // Lambda Security Group
    const lambdaSG = new ec2.SecurityGroup(this, 'lambdaSG', {
      vpc,
      allowAllOutbound: true,
      securityGroupName: `distLedger-lambda-security-group-distLedgerEnv`,
    });
    lambdaSG.addIngressRule(ec2.Peer.ipv4('10.0.0.0/16'), ec2.Port.allTcp(), 'Allow internal VPC traffic');

    const lambda_handler = new NodejsFunction(this, 'lamda-handler', {
      handler: 'distLedgerHandler',
      entry: './lambda-handler/lambda-handler.ts',
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      securityGroups: [lambdaSG],
      role: lambdaRole,
      vpc: vpc
    }) 
    
    const apiGateway = new cdk.aws_apigateway.LambdaRestApi(this, 'api-gateway', {
      handler: lambda_handler,
      deploy: true,
      proxy: true,
      binaryMediaTypes: ["*/*"],
      deployOptions: {
        stageName: 'api-gateway',

      }
    })
  }
}
