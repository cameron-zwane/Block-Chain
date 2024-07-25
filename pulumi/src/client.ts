import * as aws from "@pulumi/aws";

import { adminRole } from './permissions'
import { clientSubnet, sg } from './shared'


const initializeDependencies = `#!/bin/bash
  sudo yum update -y
  sudo yum install jq telnet emacs docker libtool libtool-ltdl-devel git -y
  sudo service docker start
  wget https://dl.google.com/go/go1.14.4.linux-amd64.tar.gz
  tar -xzf go1.14.4.linux-amd64.tar.gz
  sudo mv go /usr/local
  sudo yum install git -y
`

const launchTemplate = new aws.ec2.LaunchTemplate('ws-client-ec2-launchTemplate', {
  instanceType: 't2.micro',
  imageId: 'ami-05842291b9a0bd79f', 
  keyName: 'ws-pair',
  userData: Buffer.from(initializeDependencies).toString('base64'),
})

const instanceProfile = new aws.iam.InstanceProfile('ws-client-instance-profile', {
  role: adminRole.name,
})

const instance = new aws.ec2.Instance('ws-client-ec2', {
  vpcSecurityGroupIds: [sg.id],
  subnetId: clientSubnet.id,
  iamInstanceProfile: instanceProfile,
  launchTemplate: {
    id: launchTemplate.id,
    version: '$Latest',
  },

  tags: {
    Name: 'ws-client-ec2',
    Project: 'ws',
  },
})