const CommentController = require('../controllers/comment.controller');
const jwtMiddleware = require("../middleware/jwt.middleware");


module.exports = (app) => {
    app.post("api/comment/:shoeId", jwtMiddleware.authenticateJwt, CommentController.addNewComment);
}