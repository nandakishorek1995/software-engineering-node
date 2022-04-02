/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose Like model
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/likes/LikeDao";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes.
 * @property {Like} likeDao  single instance of MessageDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }

    /**
     * Retrieve all the users that liked a particular tuit.
     * @param {string} tid Primary key of tuit to get details.
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Retrieve all Tuits documents from likes collection which are liked by the user.
     * @param {string} uid Primary key of user to get details.
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * creates a new likes instance into the likes collection when the user likes a tuit.
     * @param {string} uid Instance to be inserted into the databse
     * @param {string} tid Instance to be inserted into the databse
     * @returns Promise To be notified when likes is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Deletes Like record from the likes collection when the user unlikes a tuit.
     * @param {string} uid Primary key of user to retrieve the message.
     * @param {string} tid Primary key of tuit.
     * @returns Promise To be notified when like is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Find user likes in the database
     * @param {string} uid  Primary key of user
     * @param {string} tid  Primary key of tuit to be unliked
     * @returns Promise To be notified when user likes is retreived from the database
     */    
     findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
     LikeModel.findOne({tuit: tid, likedBy: uid});

 /**
  * Count number of likes in tuit
  * @param {string} tid  Primary key of tuit to be unliked
  * @returns Promise To be notified when user count of likes is retreived from the database
  */    
 countHowManyLikedTuit = async (tid: string): Promise<any> =>
     LikeModel.count({tuit: tid});
}