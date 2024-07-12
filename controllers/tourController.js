const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(__dirname + "/../dev-data/data/tours-simple.json")
);
/* iam passing this function to the param middleware */
exports.checkID = (req, res, next, id) => {
  console.log("checking ID" + id);
  if (req.params.id >= tours.length) {
    return res.status(404).json({
      status: "id not found",
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    console.log(req.params);
    return res.status(400).json({
      message: "data not complete",
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  // console.log(req.params);
  res.json({
    status: "success",
    "tours Number": tours.length,
    data: { tours },
  });
};
exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id == req.params.id);

  console.log(req.params);
  res.json({
    time: req.requestTime,
    status: "success",

    data: { tour },
  });
  res.status(200);
};
exports.addNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    __dirname + "/../dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.log(err);
        return res.status(200).json({ error: err });
      }
      res.json({
        message: "success",
        data: { newTour },
      });
    }
  );
  // console.log(req.body);
  // res.send("Done");
};
exports.updateTour = (req, res) => {
  res.status(201).json({
    status: "sucess",
    message: "updated successfully",
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "sucess",
    data: "null",
  });
};
