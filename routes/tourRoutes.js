const express = require("express");
const fs = require("fs");
const tourController = require(".././controllers/tourController");
const router = express.Router();

// param middleware
router.use(express.json());

router.param("id", tourController.checkID);
//----------tours routes----------
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addNewTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
