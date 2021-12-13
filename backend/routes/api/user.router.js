const router = require('express').Router();

const { UserController } = require('../../controllers/api/user.controller');

const {
  PARAMS: { ID },
} = require('../../helpers/router');

router
  .route(`/${ID}/`)
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .post(UserController.createUser)
  .delete(UserController.deleteUser);

router.get(`/${ID}/event/`, UserController.getUserEvents);

router.route('/').get(UserController.getUsers).post(UserController.createUser);

module.exports.userRouter = router;
