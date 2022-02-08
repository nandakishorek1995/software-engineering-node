import Tuit from "../models/Tuit";

export default interface TuitDao {
   findAllTuits(): Promise<Tuit[]>;
   findTuitsByUser(username: string): Promise<Tuit[]>;
   findTuitById(tid: string): Promise<Tuit>;
   createTuit(username:string,tuit: Tuit): Promise<Tuit>;
   updateTuit(tid: string, tuit: Tuit): Promise<any>;
   deleteTuit(tid: string): Promise<any>;
}
