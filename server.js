const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mydbname!!!!!!db", { useNewUrlParser: true });

db.Workout.create({ name: "Workout Tracker" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });
//findOne to getLastWorkout
  app.get("/api/workouts", (req, res) => {
    db.Workout.findOne(
      {
        _id:mongojs.Objectid(req.params.id)
      })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //to addExcericse and update
  app.post("/api/workouts/", ({ body }, res) => {
    db.Workout.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  //create a new workout
  app.post("/api/workouts", (req, res) => {
    console.log(req.body);
  
    db.Workout.insert(req.body, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    });
  });

  //getWorkoutsInRange 
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });

//get route to View combined weight of 
//multiple exercises from 
//past 7 workouts on the stats page
app.get("/api/workouts", (req, res) => {
  db.Workout.findOne(
    {
      _id:mongojs.Objectid(req.params.id)
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
//get route View total duration of 
//each workout from past 7
//workouts on the stats page



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});