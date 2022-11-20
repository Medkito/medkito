module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-medkito`
  extends: ["medkito"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
