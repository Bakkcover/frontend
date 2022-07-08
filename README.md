# BakkcoverFrontend
Ze most fantastic frontend you'll ever see in your life.

## Branches
### Development Branch (name: `main`)
All pull-requests should be merged into this branch first.

### Production Branch (name: `production`)
When changes are ready for deployment, merge the Development Branch into the Production Branch.

This will trigger the GitHub CI to test, build and deploy the files to the S3 bucket, which serves the static website at this link:
- [Go to Bakkcover](http://bakkcover.s3-website-ap-southeast-1.amazonaws.com/auth)
