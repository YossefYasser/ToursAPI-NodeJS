const fs = require("fs");

const express = require("express");

const app = express();
const morgan = require("morgan");
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/dev-data/data/tours-simple.json")
);
//middlewares

//**middlwares are aplicable for each request
//** middlware stack bt2ol en lw 7tet el middleware b3d el route msh htshtghl */

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(morgan("dev"));
// callback functions to use
const getAllTours = (req, res) => {
  // console.log(req.params);
  res.json({
    status: "success",
    "tours Number": tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  if (req.params.id >= tours.length) {
    return res.status(404).json({
      status: "error",
    });
  } else {
    const tour = tours.find((el) => el.id == req.params.id);

    console.log(req.params);
    res.json({
      time: req.requestTime,
      status: "success",

      data: { tour },
    });
    res.status(200);
  }
};
const addNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    __dirname + "/dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      if (err) console.log("sss");
      res.json({
        message: "success",
        data: { newTour },
      });
    }
  );
  // console.log(req.body);
  // res.send("Done");
};
const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "id not found",
    });
  }

  res.status(200).json({
    status: "sucess",
    message: "updated successfully",
  });
};
const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "id not found",
    });
  }
  res.status(204).json({
    status: "sucess",
    data: "null",
  });
};

//routers

// ** routes are middlewares which are aplicable for specific routes
// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", addNewTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

//routes

app.route("/api/v1/tours").get(getAllTours).post(addNewTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// start server
const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log("listening on port " + port);
});
