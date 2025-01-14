const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
class MeController {
  // [GET] /me/stored/courses
  async storedCourses(req, res, next) {
    try {
      const [deleteCount, courses] = await Promise.all([
        Course.countDocumentsWithDeleted({ deleted: true }),
        Course.find({}).lean()
      ]);
      res.render("me/stored-courses", {
        courses,
        deleteCount,
      })
    } catch(next) {
      console.log(next)
    }

    // Course.find({})
    //   .lean()
    //   .then(courses => res.render("me/stored-courses", { courses }))
    //   .catch(next)
  }

  trashCourses(req, res, next) {
    Course.findWithDeleted({deleted: true})
      .lean()
      .then(courses => res.render("me/trash-courses", { courses }))
      .catch(next)
  }
}

module.exports = new MeController();
