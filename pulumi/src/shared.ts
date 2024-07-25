import * as aws from '@pulumi/aws'


export const vpc = new aws.ec2.Vpc('ws-main-vpc', {
  cidrBlock: '10.0.0.0/16',
  enableDnsHostnames: true,
  enableDnsSupport: true,

  tags: {
    Name: 'ws-main-vpc',
    Project: 'ws',
  },
})

const igw = new aws.ec2.InternetGateway('ws-client-igw', {
  vpcId: vpc.id,
  
  tags: {
    Name: 'ws-client-igw',
    Project: 'ws',
  },
})

export const clientSubnet = new aws.ec2.Subnet('ws-client-subnet', {
  vpcId: vpc.id,
  cidrBlock: '10.0.2.0/24',
  mapPublicIpOnLaunch: true,

  tags: {
    Name: 'ws-supplier-client-subnet',
    Project: 'ws',
  },
})

const rt = new aws.ec2.RouteTable('ws-client-rt', {
  vpcId: vpc.id,
  routes: [
    {
      cidrBlock: '0.0.0.0/0',
      gatewayId: igw.id,
    },
  ],

  tags: {
    Project: 'ws',
  },
})

const rta = new aws.ec2.RouteTableAssociation('ws-client-rta', {
  subnetId: clientSubnet.id,
  routeTableId: rt.id,
})

export const sg = new aws.ec2.SecurityGroup('ws-main-sg', {
  vpcId: vpc.id,
  description: 'Allows all traffic',
  ingress: [
    {
      protocol: '-1',
      fromPort: 0,
      toPort: 0,
      cidrBlocks: ['0.0.0.0/0'],
    }
  ],
  egress: [
    {
      protocol: '-1',
      fromPort: 0,
      toPort: 0,
      cidrBlocks: ['0.0.0.0/0'],
    }
  ],

  tags: {
    Project: 'ws',
  },
})