/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import Tuit from "../models/tuits/Tuit"
import TuitDaoI from "../interfaces/tuits/TuitDao";
import TuitModel from "../mongoose/tuits/TuitModel"

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {Tuit} tuitDao  single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    /**
     * Retrieve all tuit documents from tuits collection.
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    /**
     * Retrieve all tuit documents from tuits collection which are posted by a particular user.
     * @param {string} uid Primary key of user to get details.
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findTuitsByUser(uid: string): Promise<any> {
        return await TuitModel.find({postedBy:uid});
    }
    /**
     * Retrieves a single tuit document from tuits collection which has id as tid.
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }
    /**
     * creates a new Tuit instance into the tuits collection.
     * @param {Tuit} tuit Instance to be inserted into the database
     * @param {string} uid Instance to be inserted into the databse
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(uid:string,tuit: Tuit): Promise<any> {
        return await TuitModel.create({...tuit,postedBy:uid});
    }
    /**
     * Updates Tuit with new values in tuits collection for the tuit with tuit id tid.
     * @param {string} tid Primary key of user to be modified
     * @param {Tuit} tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }
    /**
     * Removes tuit from the tuits collection.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id:tid});
    }
  
}