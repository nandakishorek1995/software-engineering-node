/**
 * @file Controller RESTful Web service API for Users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/users/UserController";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users to retrieve all the users created.
 *     </li>
 *     <li>GET //users/:userid to retrieve a single user using uid.
 *     </li>
 *     <li>GET /users/:uid/tuits to retrieve all tuits tuited by user.
 *     </li>
 *     <li>POST /users to create a user</li>
 *     <li>DELETE /users/:userid to record that a user
 *      is deleted</li>
 *     <li>PUT /users/:userid to record that a user is updated</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing tuits CRUD operations
 * @property {UserController} UserController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/api/users', UserController.userController.findAllUsers);
            app.get('/api/users/:userid', UserController.userController.findUserById);
            app.post('/api/users', UserController.userController.createUser);
            app.delete('/api/users/:userid', UserController.userController.deleteUser);
            app.put('/api/users/:userid', UserController.userController.updateUser);
        }
        return UserController.userController;
   }
   /**
     * Retrieves all users from the database.
     * @param {Request} req Represents request from client to retrieve all the users.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects.
     */
   findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
           .then(users => res.json(users));
     /**
     * Retrieves a user from the database.
     * @param {Request} req Represents request from client, including the path
     * parameter userid representing the user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user object.
     */
   findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));

     /**
     * @param {Request} req Represents request from client, including the
     * path parameters body representing the creating a user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database.
     */
   createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
           .then(user => res.json(user));
     /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid representing the user is deleted.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the user was successful or not
     */
   deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
     /**
     * @param {Request} req Represents request from client, including the
     * path parameters userid and body representing the user and the details of the user..
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user has been updated and inserted in the
     * database.
     */
   updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));
}
