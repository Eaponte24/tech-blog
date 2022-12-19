const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all api/comments route
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({});

    res.json(commentData);

    console.log(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single comment for api/comments/:id
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        id: req.params.id,
      },
    });

    res.json(commentData);

    console.log(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a comment for api/comments
router.post("/", withAuth, async (req, res) => {
  try {
    if (req.session) {
      const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.json(commentData);

      console.log(commentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// update an existing comment route for api/comments/:id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!commentData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.json(commentData);

    console.log(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete an existing coment route for api/comments/:id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.json(commentData);

    console.log(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
