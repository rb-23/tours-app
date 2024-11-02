const express = require('express');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

//  NOT THE BEST SOLUTION
// tourRouter.route('/top-5-best').get((req, res) => {
//   req.query = {
//     limit: 5,
//     sort: 'price+-ratingsAverage+name',
//     fields: 'name+rating+price+summary+difficulty',
//   };
//   tourController.getAllTours(req, res);
// });
tourRouter
  .route('/top-5-best')
  .get(tourController.cheapAlias, tourController.getAllTours);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
