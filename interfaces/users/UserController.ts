/**
 * @file UserController interface represents web services for Users resource. 
 */
import {Request, Response} from "express";

export default interface UserController {
   findAllUsers(req: Request, res: Response): void;
   findUserById(req: Request, res: Response): void;
   createUser(req: Request, res: Response): void;
   deleteUser(req: Request, res: Response): void;
   updateUser(req: Request, res: Response): void;
   deleteAllUsers (req: Request, res: Response): void;
}
