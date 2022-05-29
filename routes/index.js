var express = require('express');
var router = express.Router();
const notification = require("../controllers/NetposNotification");
const authenticate = require("../controllers/JwtAuthentication");


router.post('/netpos_notifications',authenticate.validate, notification.createTransaction);
router.post('/signup', authenticate.createUser );
router.post('/login', authenticate.loginUser);
router.post('/refresh_token', authenticate.refreshToken);
router.post('/logout', authenticate.logoutUser);



module.exports = router;