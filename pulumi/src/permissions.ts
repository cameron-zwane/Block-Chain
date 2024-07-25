import * as aws from '@pulumi/aws'


export const adminRole = new aws.iam.Role('ws-admin-role', {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: 'ec2.amazonaws.com' }),
})


const adminRolePolicy = new aws.iam.RolePolicyAttachment('ws-admin-role-policy', {
  role: adminRole.name,
  policyArn: aws.iam.ManagedPolicies.AdministratorAccess,
})

