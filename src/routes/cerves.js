/**
 * Cervecerias Routes
 * @module Cerveceria_Routes
 */
// ************************************** Packages
const { Router } = require("express");
const router = Router();
// Upload images Middleware
const { multerS3 } = require("../middlewares/uploadImages");
const upload = multerS3.array("images", 4);

// *********************************** Middlewares
const {
  verifyToken,
  isModerator,
  isAdmin,
  isUser,
} = require("../middlewares/authJwt");

// ***************************** Import validators
const {
  validName,
  validDirection,
  validCity,
  validHours,
  validTime,
  validDay,
  validTankStyle,
  validTankCapacity,
  validTankQuantity,
  validTankPosition,
  validComments,
} = require("../controllers/validators");

// ************************ Import the controllers
const {
  insertCerve,
  getCerve,
  updateCerve,
  deleteCerve,
} = require("../controllers/cerves");

// ****************** POST => "api/cerveceria/"
/**
 * Insert Cerveceria Route
 * @name POST
 * @path {POST} /api/cerveceria/
 * @header x-access-token - Token provided to get the authorization.
 * @body {String} name - Cerveceria´s Name.
 * @body {String} direction - Cerveceria´s Direction.
 * @body {String} city - Cerveceria´s City.
 * @body {String} [telephone] - Cerveceria´s Telephone.
 * @body {String} openingHours - Cerveceria´s Opening hour.
 * @body {String} closingTime - Cerveceria´s Closing time.
 * @body {String} closingDay - Cerveceria´s Closing day.
 * @body {String} [comments] - Cerveceria´s Comments.
 * @body {Object[]} tanks - Information about the installation of the Cerveceria inside a tanks Object Type.
 * @body {String[]} [picturesUrl] - Cerveceria´s Photos.
 * @code {201} Created. The cerveceria is updated.
 * @code {400} Bad Request. You have not passed the validations.
 * @code {422} Unprocessable Entity. Not suported extension files to upload.
 * @code {500} Internal Server Error. Something went wrong.
 * @response {String} message "Saved!!".
 * @response {Object} result - Record of created object.
 */
router.post(
  "/",
  [
    function (req, res, next) {
      upload(req, res, function (err) {
        if (err) {
          return res.status(422).json({
            error: err.message,
          });
        }
        next();
      });
    },
    validName,
    validDirection,
    validCity,
    validHours,
    validTime,
    validDay,
    validTankStyle,
    validTankCapacity,
    validTankQuantity,
    validTankPosition,
    validComments,
    verifyToken,
    isModerator,
  ],
  insertCerve
);

// ****************** GET => "api/cerveceria/"
/**
 * Get Cervecerias Route
 * @name GET
 * @path {GET} /api/cerveceria/
 * @header x-access-token - Token provided to get the authorization.
 * @query {String} [id] - Cerveceria´s Id.
 * @query {String} [openHour] - Cerveceria´s Openings times.
 * @query {String} [closingDay] - Cerveceria´s Closings days.
 * @query {String} [city] - Cerveceria´s Cities.
 * @code {200} Ok. The request is successful.
 * @code {404} Not Found. No results found.
 * @code {500} Internal Server Error. Something went wrong.
 * @response {String} message "Your result.".
 * @response {Object[]} result - Requested records.
 */
router.get("/", [verifyToken, isUser], getCerve);

// ***************************** PUT => "api/cerveceria/"
/**
 * Update Cerveceria Route
 * @name PUT
 * @path {PUT} /api/cerveceria/
 * @header x-access-token - Token provided to get the authorization.
 * @query {String} [id] - Cerveceria´s Id.
 * @body {String} name - Cerveceria´s Name.
 * @body {String} direction - Cerveceria´s Direction.
 * @body {String} city - Cerveceria´s City.
 * @body {String} [telephone] - Cerveceria´s Telephone.
 * @body {String} openingHours - Cerveceria´s Opening hour.
 * @body {String} closingTime - Cerveceria´s Closing time.
 * @body {String} closingDay - Cerveceria´s Closing day.
 * @body {String} [comments] - Cerveceria´s Comments.
 * @body {Object[]} tanks - Information about the installation of the Cerveceria inside a tanks Object Type.
 * @body {String[]} [picturesUrl] - Cerveceria´s Photos.
 * @code {201} Created. The cerveceria is updated.
 * @code {400} Bad Request. You have not passed the validations.
 * @code {404} Not Found. No results found.
 * @code {500} Internal Server Error. Something went wrong.
 * @response {String} message "Updated!!".
 * @response {Object} result - Record updated.
 */
router.put(
  "/",
  [
    validName,
    validDirection,
    validCity,
    validHours,
    validTime,
    validDay,
    validTankStyle,
    validTankCapacity,
    validTankQuantity,
    validTankPosition,
    validComments,
    verifyToken,
    isModerator,
  ],
  updateCerve
);

// ****************** DELETE => "api/cerveceria/"
/**
 * Delete Cerveceria Route
 * @name DELETE
 * @path {DELETE} /api/cerveceria/
 * @header x-access-token - Token provided to get the authorization.
 * @query {String} [id] - Cerveceria´s Id.
 * @code {200} Ok. The request is successful.
 * @code {404} Not Found. No results found.
 * @code {500} Internal Server Error. Something went wrong.
 * @response {String} message "Deleted!!".
 * @response {Object[]} deleted - Record deleted.
 */
router.delete("/", [verifyToken, isAdmin], deleteCerve);

module.exports = router;

/* Roles para las rutas terminados 
  User => GET,
  Moderator => GET,, /PUT, /POST
  Admin => GET, /PUT, /POST, DELETE
*/

// **************************************** TYPE DEFINITIONS
/**
 * @typedef tanks
 * @type {Object}
 * @property {String} style - Type of beer.
 * @property {Number} quantity - Quantity of tanks.
 * @property {Number} capacity - Capacity of tanks.
 * @property {String} position - position of tanks.
 */
