/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 *     <li>follow</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowController from "./controllers/FollowController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from './controllers/AuthenticationController';
import mongoose from "mongoose";

const DB_USERNAME = "admin" || process.env.DB_USERNAME;
const DB_PASSWORD = "admin" || process.env.DB_PASSWORD;
const session = require("express-session");
const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.r5rhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
var cors = require('cors')
mongoose.connect(connectionString);
const app = express();
app.use(cors({
    credentials: true,
    origin: ['https://a4--fse-react-nanda.netlify.app']
  }));
const SECRET = 'process.env.SECRET';

let sess = {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "PRODUCTION" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "PRODUCTION",
    }
 }
 
 if (process.env.NODE_ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
 }
 app.use(session(sess))
 app.use(express.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const followController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);
AuthenticationController(app);
/**
 * Start a server listening at port 3000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);