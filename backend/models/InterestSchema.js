
import mongoose, {Schema} from mongoose

const InterestSchema = new Schema({
    adopter : {
        type : Schema.Types.ObjectId,
        ref : "User"
    } , 
    pet : {
        type : Schema.Types.ObjectId,
        ref : "Post"
    }
},
{
    timestamps: true,
}
)

export const Interest = mongoose.model("Interest" , InterestSchema)