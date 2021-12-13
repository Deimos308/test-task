const { join, resolve } = require('path');
const envs = require('../constants/envs');

const RESOLVED_HOST = +process.env.DEV_USE_LOCAL_NETWORK_ADDRESS
  ? Object.values(require('os').networkInterfaces())
      .flat()
      .find((i) => i.family === 'IPv4' && !i.internal).address
  : 'localhost';

const cwd = process.cwd();

module.exports.config = Object.freeze(
  new (class {
    constructor() {
      this.NODE_ENV = envs.DEVELOPMENT;
      this.prodEnv = false;

      this.host = RESOLVED_HOST;
      this.port = +process.env.SERVER_PORT || 4040;

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
