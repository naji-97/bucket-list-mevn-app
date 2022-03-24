const {Schema, model} =require('mongoose')

const BucketListItemSchema = new Schema({
    description:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

module.exports = model('bucketListItem', BucketListItemSchema)

