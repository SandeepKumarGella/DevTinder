const adminAuth =
  ("/admin",
  (req, res, next) => {
    const adminToken = "abc";
    const isAdminAuth = adminToken === "abc";
    if (!isAdminAuth) {
      res.status(401).send("unauthorized user");
    } else {
      console.log("admin Auth");
      next();
    }
  });

const userAuth =
  ("/user",
  (req, res, next) => {
    const userToken = "xyz";
    const isUserAuth = userToken === "xyz";
    if (!isUserAuth) {
      res.status(401).send("unauthorized user");
    } else {
      console.log("user auth");
      next();
    }
  });

module.exports = { adminAuth, userAuth };
