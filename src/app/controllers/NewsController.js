class NewsController {

    // [GET] /news
    index(req, res) {
        // console.log(req.query.q);
        res.render("news");
    }

    // [GET] /news/:slug
    show(req,res) {
        res.send('News Test');
    }
}

module.exports = new NewsController;

