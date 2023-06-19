const express = require("express");
const router = express.Router();
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
} = require("./posts.controllers");

router.param("postId", (req, res, next, postId) => {
  try {
    const foundPost = fetchPost(postId);
    if (!foundPost) return next({ status: 404, message: "Post not found" });
    req.post = foundPost;
    return next();
  } catch (err) {
    return next(err);
  }
});

router.get("/", postsGet);
router.post("/", postsCreate);
router.delete("/:postId", postsDelete);
router.put("/:postId", postsUpdate);

module.exports = router;
