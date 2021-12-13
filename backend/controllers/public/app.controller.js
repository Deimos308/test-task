const config = require('./../../configs');

class AppController {
  /**
   * @static
   * @api { GET } /app/*
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */

  static async getAppIndex(req, res, next) {
    try {
      const options = {
        root: config.paths.vueDistDir,
        headers: {
          'Cache-Control': 'private, max-age=0',
        },
      };

      // send app index page
      return res.sendFile('index.html', options, (err) => {
        if (err) next(err);
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { AppController };
