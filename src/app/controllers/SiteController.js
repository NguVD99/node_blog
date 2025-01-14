const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  // [GET] /news
  //next là function sẽ đẩy error vào midleware
  index(req, res, next) {
    Course.find({})
      //Sử dụng lean() sau find() với Mongoose
      //kích hoạt lean() này sẽ cho Mongoose bỏ qua việc khởi tạo
      //toàn bộ tài liệu Mongoose và chỉ cung cấp cho bạn POJO.
      //giúp truy vấn nhanh hơn rất nhiều khi sử dụng find().
      .lean()
      .then((courses) => {
        res.render("home", { courses });
      })
      .catch((error) => {
        next(error);
      });
  }
  // // [GET] /
  // async index(req, res, next) {
  //   try {
  //     const courses = await Course.find({});
  //     res.render('home', {
  //       courses: multipleMongooseToObject(courses)
  //     });
  //   } catch (err) {
  //     res.status(400).send({ error: "error!" });
  //   }
  // }

  //   index(req, res) {

  //     Course.find({}, function (err, courses) {
  //         if(!err) res.json(courses);
  //         res.status(500).json({ error: 'message' });
  //     });
  //     // res.render("home");
  //   }

  // [GET] /search
  search(req, res) {
    // console.log(req.query.q);
    res.render("search");
  }
}

module.exports = new SiteController();
