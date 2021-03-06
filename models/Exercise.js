const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const ExerciseSchema = new Schema({ 

    type: {
        type:String,
        trim: true, 
    },

    name: {
        type:String,
        trim: true, 
        },

    duration: {
            type:String,
            trim: true, 
            },

    weight: {
            type:String,
            trim: true, 
            },
            
    reps: {
            type:String,
            trim: true, 
            },

    sets: {
            type:String,
            trim: true, 
            },

    Date: {
            type: Date,
            default: Date.now
            },
    });

ExerciseSchema.methods.setCreateWorkout = function() {
        this.createWorkout = `${this.type} ${this.name} ${this.duration} ${this.weight} ${this.reps} ${this.sets} ${this.Date}`;
      
        return this.createWorkout;
      };

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;