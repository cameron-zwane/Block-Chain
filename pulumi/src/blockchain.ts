import * as aws from '@pulumi/aws'

import { vpc } from './shared'

// const vpcEndpoint = new aws.ec2.VpcEndpoint('ws-main-vpc-endpoint', {
//   vpcId: vpc.id,
//   serviceName: 'com.amazonaws.eu-west-1.managedblockchain.n-e6kqya3ve5hmdf2bnv4bfcnkga',
//   subnetIds: [subnet.id],
//   securityGroupIds: [sg.id],
//   vpcEndpointType: 'Interface',


//   tags: {
//     Name: 'ws-main-vpc-endpoint',
//     Project: 'ws',
//   }
// })