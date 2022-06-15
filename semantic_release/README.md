# Semantic Release
Create Release using Github Actions without install it on the repository

example:
```yml
name: Release

on:
  push:
    branches:
      - main
      - next
      - alpha
      - beta

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: MiloCreditPlatform/gh-actions/semantic_release@main
        with:
          NPM_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
```
