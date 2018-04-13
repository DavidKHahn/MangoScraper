var db = require("../models");
//exporting functionality of the app
module.exports = function (app) {
//route 
  app.get("/saved", function (req, res) {
      //finds article
    db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("saved", {array: dbArticle} );
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  })
//posts 
  app.post("/api/articles/:id", function (req, res) {
    console.log(req.params.id);
    db.Article.findOneAndUpdate({ _id: req.params.id }, {saved: true})
    .then(function (dbArticle) {
      res.json(dbArticle);
    });
  });
};