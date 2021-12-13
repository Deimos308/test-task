const { ObjectId } = require('mongoose').Types;
const { HttpException } = require('../../helpers/errors');
const { EventService } = require('../../services/event.service');
const { DTO_ACTIONS } = require('../../constants/services');

class EventController {
  /**
   * @static
   * @api { GET } /api/event/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async getEvents(req, res, next) {
    try {
      const events = await EventService.getEventsList();
      res.json({ events });
    } catch (err) {
      next(err);
    }
  }
  /**
   * @static
   * @api { GET } /api/event/:id/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async getEvent(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id || !ObjectId.isValid(id)) throw HttpException.BAD_REQUEST();
      const events = await EventService.getEventById(id);

      res.json({ events });
    } catch (err) {
      next(err);
    }
  }
  /**
   * @static
   * @api { PUT } /api/event/:id/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async updateEvent(req, res, next) {
    const {
      body: eventDTO,
      params: { id },
    } = req;

    try {
      if (!id || !ObjectId.isValid(id)) throw HttpException.BAD_REQUEST();

      await EventService.validateDTO(eventDTO, DTO_ACTIONS.UPDATE);
      const event = await EventService.updateEvent(id, eventDTO);

      res.status(201).json({ event });
    } catch (err) {
      next(err);
    }
  }
  /**
   * @static
   * @api { DELETE } /api/event/:id/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async deleteEvent(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id || !ObjectId.isValid(id)) throw HttpException.BAD_REQUEST();

      await EventService.deleteEvent(id);

      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @static
   * @api { POST } /api/event/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async createEvent(req, res, next) {
    const { body: eventDTO } = req;

    try {
      await EventService.validateDTO(eventDTO, DTO_ACTIONS.CREATE);
      const event = await EventService.createEvent(eventDTO);

      res.status(201).json({ event });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { EventController };
