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
      - uses: MiloCreditPlatform/gh-actions/deploy_bucket@v1
        with:
          AWS_ACCESS_KEY_ID: ${{ secrets... }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets... }}
          INVALIDATE_DIST: ${{ secrets... }} # invalidate distribution
          INVALIDATE_PATHS: '/something*' # default '/*'
          remove_bucket: "something.milocredit.com folder/"
          sync_bucket: "something.milocredit.com folder/"

          # --------- OR ---------

          remove_bucket: "('something1.milocredit.com folder1/' 'something2.milocredit.com folder2/')"
          sync_bucket: "('something1.milocredit.com folder1/' 'something2.milocredit.com folder2/')"
```
