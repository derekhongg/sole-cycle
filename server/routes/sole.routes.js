const ShoeController = require ('../controllers/sole.controller');
const jwtMiddleware = require("../middleware/jwt.middleware");


module.exports = (app) => {
    app.get("/api/shoes", jwtMiddleware.authenticateJwt, ShoeController.findAllShoes);
    app.post("/api/shoes", jwtMiddleware.authenticateJwt, ShoeController.createNewShoe);
    app.get("/api/shoes/:id", jwtMiddleware.authenticateJwt, ShoeController.findOneShoe);
    app.put("/api/shoes/:id", jwtMiddleware.authenticateJwt, ShoeController.updateShoe);
    app.delete("/api/shoes/:id", jwtMiddleware.authenticateJwt, ShoeController.deleteShoe);
}