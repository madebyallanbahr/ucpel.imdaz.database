const router = require("express").Router();

const { createDatabase, viewEnrollments, createEnrollment, removeEnrollment, updateEnrollment, removeAllEnrollment } = require("./database/db");
const { update, registration, cancelation, cancelationAll } = require("./rules/enrollmentsRules")
router.route("/").get((req, res) => {
  res.json({ version: "v0.1.0.1", status: 200 });
});

router.route("/imdaz").post(createDatabase);

router.route("/enrollments").get(viewEnrollments);
router.route("/enrollments/register").post(registration(), createEnrollment);
router.route("/enrollments/update").put(update(), updateEnrollment);
router.route("/enrollments/cancel").delete(cancelation(), removeEnrollment);
router.route("/enrollments/admin/cancel").delete(cancelationAll(), removeAllEnrollment)
module.exports = router;
