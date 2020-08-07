# Homeworker Desktop
A desktop app for [homeworker.li](https://homeworker.li)

### Build / Release
1. Merge `dev` → `live`
2. Change version number in `package.json`
3. Commit changes to `live`
4. Push changes to Github
5. Wait for the Action to finish

### Start
To start the app (development) run `npm run start`

### Package
To package the app (produktion) run the following commands:
- MacOS: `npm run package-mac`
- Windows: `npm run package-windows`

### Branches
- `dev` - devlopment of the app
- `live` - the current build
