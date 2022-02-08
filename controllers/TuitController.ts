import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
            if(TuitController.tuitController === null) {
                TuitController.tuitController = new TuitController();
                app.get('/api/tuits', TuitController.tuitController.findAllTuits);
                app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
                app.get("/api/users/:username/tuits", TuitController.tuitController.findTuitsByUser);
                app.post("/api/users/:username/tuits", TuitController.tuitController.createTuit);
                app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
                app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
                
            }
            return TuitController.tuitController;
    }
    private constructor(){}
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
           .then((tuits:Tuit[]) => res.json(tuits));
    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.username)
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.params.username,req.body)
            .then(tuit => res.json(tuit));
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
}