const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const ExercisenewSchema = new Schema({ 

name: { 
type: String, 
unique: true 
}, 
exercises: [ 
    {  
type: Schema.Types.ObjectId, 
ref: "Exercise" 
    } 
] 
}); 

const Library = mongoose.model("Exercisenew", ExercisenewSchema); 
module.exports = Exercisenew; 