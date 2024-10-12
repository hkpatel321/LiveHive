import mongoose, { mongo, Schema } from "mongoose";

const meetingSchema=new Schema({
    user_id:{type:String},
    meetingCode:{type:String,required:true},
    date:{type:Date,defualt:Date.now(),required:true},

});

const Meeting =mongoose.model("Meeting",meetingSchema);
    export {Meeting}