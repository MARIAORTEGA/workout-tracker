const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const newExerciseSchema = new Schema({ 

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

const Library = mongoose.model("newExercises", LibrarySchema); 
module.exports = Library; 