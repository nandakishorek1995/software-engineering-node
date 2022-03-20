/**
 * @file Tuit Schema represents the schema of the tuit collections that is present in the MongoDB.
 */
import mongoose,{Schema} from 'mongoose'
import Tuit from '../../models/tuits/Tuit';


const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    postedOn: {type: Date, default: Date.now}
}, {collection: 'tuits'});

export default TuitSchema;