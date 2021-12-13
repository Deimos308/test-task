// vetur.config.js
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    // 'vetur.validation.interpolation': true,
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': false,
  },
  // **optional** default: `[{ root: './' }]`
  // support monorepos
  projects: [
    './frontend/vue', // Shorthand for specifying only the project root location
  ],
};
