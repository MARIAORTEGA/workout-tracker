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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workoutdb", { useNewUrlParser: true });

db.Exercise.create({ name: "Workout Tracker" })
  .then(dbExercise => {
    console.log(dbExercise);
  })
  .catch(({ message }) => {
    console.log(message);
  });


//set all workouts submitted to not new: 
//.save will insert and update an object and we do not have to use if/else, .save handles both cases 
  app.post("/api/workouts", ({ body }, res) => {
    const workouts = body;
  
    workout.new = false;
  
    db.Exercise.save(workouts, (error, saved) => {
      if (error) {
        console.log(error);
      } else {
        res.send(saved);
      }
    });
  });

  //find workouts marked new workout. Get workouts out of collection that are new 
  //get last workout?
  app.get("/api/workouts", (req, res) => {
    db.Exercise.find({ new: true }, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });


//put route to add exercise 
  app.put("/api/workouts", ({ params }, res) => {
    db.Exercise.update(
      {
        _id: mongojs.ObjectId(params.id)
      },
      {
        $set: {
          new: true
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
    app.post("/api/workouts", ({body}, res) => {
      const newE = new newExercise(body);
      newE.setCreateWorkout();
    
      newExercise.create(newE)
        .then(dbExercise => {
          res.json(dbExercise);
        })
        .catch(err => {
          res.json(err);
        });
    });


  //getWorkoutsInRange     
app.get("/api/workouts", (req, res) => {
  db.Exercise.aggregate(sort({ date: -1}) [
    {
      $addFields: {
        Weight: { $sum: ""},
        Duration: { $sum: ""},
      }
    }
  ]
  , (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});