/**
 * @file Declares data type representing information about the tuit
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents information about the tuit i.e when the tuit is posted and by whom the tuit has been posted.
 * @property postedBy{User} The User who posted the tuit.
 * @property tuit{string} Information of the tuit.
 * @property postedOn{Date} The date when the tuit has been posted.
 */
export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;
}
