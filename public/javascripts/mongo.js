let mongoose = require('mongoose');
let config = require('../../config/config');
let mConn=mongoose.createConnection(`mongodb://${config.mongodb.host}:${config.mongodb.port}/webhtml`);
let Schema = mongoose.Schema;
module.exports={
    insertHtml:function() {
        let htmlData = new Schema({
            title:String,
            desc:String,
            html:String
        })
        
    }
}
