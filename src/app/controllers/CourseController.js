const Course = require("../models/Course");

class CoursesController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {});
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    const courseId = req.params.id;
    const updateData = req.body;
    Course.findByIdAndUpdate(courseId, updateData)
      .lean()
      .then((course) => {
        res.render("courses/edit", { course });
      })
      .catch(next);
  }

  // [PUT] /courses/:id
  async update(req, res, next) {
    await Course.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // [DELETE] /courses/:id
  async destroy(req, res, next) {
    await Course.delete({ _id: req.params.id })
      .lean()
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .lean()
      .then(() => res.redirect("back"))
      .catch(next);
  }

  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .lean()
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  // [POST] /courses/handle-form-actions
  async handleFormActions(req, res, next) {
    try {
      switch (req.body.action) {
        case 'delete': {
          await Course.delete({ _id: { $in: req.body.courseIds }})
          res.redirect('back')
          break
        }

        case 'restore': {
          await Course.restore({ _id: { $in: req.body.courseIds }})
          res.redirect('back')
          break
        }

        case 'forceDelete': {
          await Course.deleteMany({ _id: { $in: req.body.courseIds }})
          res.redirect('back')
          break
        }

        default:
          console.log('Actions is invalid')
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CoursesController();
