![Build/release](https://github.com/homeworker-app/desktop/workflows/Build/release/badge.svg?branch=master)
![lint](https://github.com/homeworker-app/desktop/workflows/lint/badge.svg?branch=dev)

# Homeworker Desktop
A desktop app for [homeworker.li](https://homeworker.li)

### Build / Release
1. Change version number in `package.json` in `dev`
2. Release new Version as tag with format `v0.0.0`
3. Merge `dev` → `master`
4. Wait for the Action to finish

### Start
To start the app (development) run `npm run start`

### Package
To package the app locally run `npm run dist`

### Branches
- `dev` - not released, work in progress, changes
- `master` - the current version
