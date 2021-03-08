const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const html= require("./html-routes.js")

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workoutdb", { useNewUrlParser: true });

db.Exercise.create({ name: "Workout Tracker" })
  .then(dbExercise => {
    console.log(dbExercise);
  })
  .catch(({ message }) => {
    console.log(message);
  });

html(app)

  //get workouts
  app.get("/api/workouts", (req, res) => {
    db.Exercise.find({}) 
    .populate("exercises")
    .then((dbExercise) => {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.json(err);
    });
  });

//put route to add exercise 
  app.put("/api/workouts/:id", ({ params , body}, res) => {
    db.Exercise.update(
      {
        _id: params.id
      },
    {
      $push:{
        exercises: body
      }
    },
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });

  //create workout 
  app.post("/api/workouts/", ({ body }, res) => {
    db.Exercise.create(body)
      //.then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
//getWorkoutsInRange
app.get("/api/workouts/range", (req, res) => {
    db.Exercise.find().sort({ _id: -1,}).limit(7) //.aggregate(
      //     [
      //           {
      //             $addFields: {
      //               totalDuration : {$sum: "$Duration"}, 
                   
      //               }
      //             },
      //          ])
      //          .populate("exercises")
    .then((dbExercise)=> {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.json(err);
    });
    });
  

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});








