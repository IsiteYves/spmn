const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  userLogin,
  getCurrentUser
} = require("../controllers/user.controllers");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  router.route("/")
    /**
     * @swagger
     * /users:
     *   post:
     *     tags:
     *       - User
     *     description: Create a user
     *     parameters:
     *       - name: body
     *         description: Fields for a user
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post(createUser)
    /**
     * @swagger
     * /users:
     *   put:
     *     tags:
     *       - User
     *     description: Update a user
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a user
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .get(getAllUsers)

  router.route("/:userId")
    .put(updateUser)
    .get(getUserById)

    /**
     * @swagger
     * /users:
     *   delete:
     *     tags:
     *       - User
     *     description: Delete User
     *     security:
     *       - bearerAuth: -[]
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .delete(deleteUser);

  router.route("/current")
    /**
     * @swagger
     * /users/current:
     *   get:
     *     tags:
     *       - User
     *     description: Returns current User
     *     security:
     *       - bearerAuth: -[]
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .get(getCurrentUser)

  router.route("/login")
    /**
     * @swagger
     * /users/login:
     *   post:
     *     tags:
     *       - User
     *     description: User Login
     *     parameters:
     *       - name: body
     *         description: Fields for a user
     *         in: body
     *         required: true
     *         schema:
     *           properties:
     *            email:
     *              type: string
     *            password:
     *              type: string
     *     responses: 
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post(userLogin)

  app.use("/api/users", router);
};