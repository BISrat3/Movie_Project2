const { Review } = require("../models");

Review.deleteMany({}, function (error, deletedReviews) {
  if (error) {
    return console.log(error);
  }
  Review.insertMany(
    [
      {
        rating: 5,
        comment: "Fast Delivery!",
        movie: "(a real ID from Atlas)",
        user: "(a real ID from Atlas)",
      },
      {
        rating: 3,
        comment: "Took awhile to get here, but the product is great.",
        movie: "(a real ID from Atlas)",
        user: "(a real ID from Atlas)",
      },
      {
        rating: 4,
        comment: "love the style of the products",
        movie: "(a real ID from Atlas)",
        user: "(a real ID from Atlas)",
      },
    ],
    function (error, createdReviews) {
      if (error) {
        return console.log(error);
      }
      console.log("=== Seed Complete ===");
      console.log(createdReviews);
    }
  );
});