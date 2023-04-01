const express = require("express");

const healthRoute = express.Router();

/**
 * Try to reach the server
 */
healthRoute.route('/').get((request, response) => {
    response.json({message: "server is healthy"})
});


module.exports = healthRoute;