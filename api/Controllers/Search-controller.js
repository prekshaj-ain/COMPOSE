const httpError = require("../Models/http-error");
const Post = require("../Models/Posts");
const User = require("../Models/Users");

const search = async (req,res,next)=>{
    const query = req.query.q;
    let userData,postData;
    try{
        userData = await User.find({
            "$or":[
                {username:{$regex: query,$options:'i'}},
                {about:{$regex: query,$options:'i'}}
            ]
        }).limit(3);
        postData = await Post.find({
            "$or":[
                {title:{$regex: query,$options:'i'}},
                {description:{$regex: query,$options:'i'}}
            ]
        }).limit(3);

    }catch(err){
        return next(new httpError('could not search please try again later',500));
    }
    if(userData.length === 0 && postData.length === 0){
        return next(new httpError('no matches found',404));
    }
    res.status(200).json({userData,postData});
} 
const searchUser = async  (req,res,next)=>{
    const query = req.query.q;
    let UserData;
    try{
        UserData = await User.find({
            "$or": [
                {username:{$regex: query,$options:'i'}},
                {about:{$regex: query,$options:'i'}}
            ]
        })
    } catch(err){
        return next(new httpError('could not search please try again later',500));
    }
    if(UserData.length === 0){
        return next(new httpError('no matches found',404));
    }
    res.status(200).json(UserData);

}
const searchPost = async (req,res,next)=>{
    const query = req.query.q;
    let postData;
    try{
        postData = await Post.find({
            "$or":[
                {title:{$regex: query,$options:'i'}},
                {description:{$regex: query,$options:'i'}}
            ]
        })
    }catch(err){
        return next(new httpError('could not search please try again later',500));
    }
    if(postData.length === 0){
        return next(new httpError('no matches found',404));
    }
    res.status(200).json(postData);


}
module.exports.search = search;
module.exports.searchUser = searchUser;
module.exports.searchPost = searchPost;