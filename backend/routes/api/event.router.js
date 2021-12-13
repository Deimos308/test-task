const router = require('express').Router();

const { EventController } = require('../../controllers/api/event.controller');

const {
  PARAMS: { ID },
} = require('../../helpers/router');

router.route('/').get(EventController.getEvents).post(EventController.createEvent);
router
  .route('/:id/')
  .get(EventController.getEvents)
  .put(EventController.updateEvent)
  .post(EventController.createEvent)
  .delete(EventController.deleteEvent);

module.exports.eventRouter = router;
