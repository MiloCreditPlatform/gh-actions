# Build packages
Build node package using `npm`

example:
```yml
name: Build

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: MiloCreditPlatform/gh-actions/install_npm@main
        with:
          NPM_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
          omit_install: Boolean
          omit_node_modules: Boolean
```
