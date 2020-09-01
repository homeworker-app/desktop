![Build/release](https://github.com/homeworker-app/desktop/workflows/Build/release/badge.svg?branch=master)
![lint](https://github.com/homeworker-app/desktop/workflows/lint/badge.svg?branch=dev)

# Homeworker Desktop
A desktop app for [homeworker.li](https://homeworker.li)

### Build / Release
1. Change version number in `package.json` in `dev`
2. Merge `dev` → `master`
3. Release new Version as tag with format `v0.0.0`
4. Wait for the Action to finish

### Start
To start the app (development) run `npm run start`

### Package
To package the app (produktion) run the following commands:
- MacOS: `npm run package-mac`
- Windows: `npm run package-windows`

### Branches
- `dev` - development branch of the app, where all feature branchs got merged into
- `master` - the current released version
