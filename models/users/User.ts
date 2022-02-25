/**
 * @file Declares User data type representing information about the user.
 */
import AccountType from "../AccountType";
import MaritalStatus from "../MaritalStatus";
import Location from "../Location";


/**
 * @typedef User represents the class having the attributes of the user..
 * @property {string} username UserName of the user using the application.
 * @property {string} password Password of the user.
 * @property {string} firstName First Name of the user.
 * @property {string} lastName Last name of the user.
 * @property {string} email Email address of the user.
 * @property {string} profilePhoto Profile photo of the user.
 * @property {string} headerImage Header image of the user.
 * @property {string} accountType Account type of the user.
 * @property {string} maritalStatus Marital status of the user.
 * @property {string} biography Biography of the user.
 * @property {Date} dateOfBirth DOB of the user.
 * @property {Date} joined The date user joined the tuiter application.
 * @property {string} location Location of the user.
 */
export default class User {
   private username: string = '';
   private password: string = '';
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;
}
