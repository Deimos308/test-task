const { ObjectId } = require('mongoose').Types;
const { HttpException } = require('../../helpers/errors');
const { UserService } = require('../../services/user.service');
const { DTO_ACTIONS } = require('../../constants/services');

class UserController {
  /**
   * @static
   * @api { GET } /api/user/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsersList();
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @static
   * @api { GET } /api/user/:id/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async getUser(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id || !ObjectId.isValid(id)) throw HttpException.BAD_REQUEST();
      const user = await UserService.getUserById(id);

      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @static
   * @api { GET } /api/user/:id/event/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async getUserEvents(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id || !ObjectId.isValid(id)) throw HttpException.BAD_REQUEST();

      const [user, events] = await Promise.all([
        UserService.getUserById(id),
        UserService.getUserEvents(id),
      ]);

      res.json({ user, events });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @static
   * @api { PUT } /api/user/:id/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async updateUser(req, res, next) {
    const {
      body: userDTO,
      params: { id },
    } = req;

    try {
      if (!id || !ObjectId.isValid(id)) throw HttpException.BAD_REQUEST();

      await UserService.validateDTO(userDTO, DTO_ACTIONS.UPDATE);
      const user = await UserService.updateUser(id, userDTO);

      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @static
   * @api { DELETE } /api/user/:id/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async deleteUser(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id || !ObjectId.isValid(id)) throw HttpException.BAD_REQUEST();

      await UserService.deleteUser(id);

      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @static
   * @api { POST } /api/user/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async createUser(req, res, next) {
    const { body: userDTO } = req;

    try {
      await UserService.validateDTO(userDTO, DTO_ACTIONS.CREATE);
      const user = await UserService.createUser(userDTO);

      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { UserController };
