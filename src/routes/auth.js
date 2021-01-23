/**
 * Authentication Routes
 * @module Auth_routes
 */

// Packages
const { Router } = require("express");
const router = Router();

/* // Middlewares
const { verifyToken } = require("../middlewares/authJwt"); */

// Import controllers
const { signUp, signIn } = require("../controllers/auth");

//Import validators
const { validEmail } = require("../controllers/validators");

// **************************** POST => "api/auth/signup"
/**
 * Sign Up Route
 * @name Sign_Up
 * @path {POST} /api/auth/signup
 * @body {String} email - Email to register.
 * @body {String} password - Password to register.
 * @body {String[]} [roles= ["user"]] OPTIONAL Array with the rol values, max three values ["user", "moderator", "admin"].
 * @code {201} if your user is created successful.
 * @code {500} if yo have validation errors or something wen wrong.
 * @code {401} if your email is bussy.
 * @response {String} message User created!.
 */
router.post("/signup", validEmail, signUp);

// **************************** POST => "api/auth/signin"
/**
 * Sign In Route
 * @name Sign_In
 * @path {POST} /api/auth/signin
 * @body {String} email - Email to sign in.
 * @body {String} password - Password to sign in.
 * @code {200} if the request is successful
 * @code {500} if yo have validation errors or something wen wrong.
 * @code {400} if your user doesnt exists.
 * @code {401} if your password is invalid.
 * @response {String} message "Your user!!".
 * @response {String} token Token to access "/api/cervecerias" Routes.
 */
router.post("/signin", signIn);

module.exports = router;
