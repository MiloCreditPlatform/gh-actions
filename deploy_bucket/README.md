# Deploy Amazon Bucket (S3)

example:
```yml
name: Deploy

on:
  pull_request:
    types: [synchronize]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: MiloCreditPlatform/gh-actions/deploy_bucket@main
        with:
          AWS_ACCESS_KEY_ID: ${{ secrets... }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets... }}
          INVALIDATE_DIST: ${{ secrets... }} # invalidate distribution
          INVALIDATE_PATHS: '/something*' # default '/*'
          delete_bucket: "aws s3 rm ... "
          sync_bucket: "aws s3 sync ..."
```
