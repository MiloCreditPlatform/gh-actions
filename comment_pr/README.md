# Comment a github PR
Comment a PR with a description

example:
```yml
name: Comment

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: MiloCreditPlatform/gh-actions/comment_pr@main
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          message: Hello world
```
