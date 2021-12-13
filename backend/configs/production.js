const { join, resolve } = require('path');
const envs = require('../constants/envs');

const cwd = process.cwd();

module.exports.config = Object.freeze(
  new (class {
    constructor() {
      this.NODE_ENV = envs.PRODUCTION;
      this.prodEnv = true;

      this.host = 'localhost';
      this.port = +process.env.SERVER_PORT || 8000;

      this.paths = {
        assetsDir: join(cwd, 'backend', 'assets'),
        // Source paths ==========================================================
        vueSrcDir: join(cwd, 'frontend', 'vue', 'src'),
        // Dist paths ============================================================
        vueDistDir: join(cwd, 'frontend', 'vue', 'dist'),
      };

      this.defaultClustersAmount = 1;
    }
  })()
);
