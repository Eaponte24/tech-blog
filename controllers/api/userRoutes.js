const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get all users route for api/users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.json(userData);

    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single user with their posts and comments for api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
        },

        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
        {
          model: Post,
          attributes: ["title"],
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    res.json(userData);

    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a user route for api/users/
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json(userData);

      console.log(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create login route for /api/users/login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user with that Username!" });
      return;
    }

    const correctPword = userData.checkPassword(req.body.password);

    if (!correctPword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });

      console.log(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a logout route for api/users/logout
router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// create a update route for api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });

    if (!userData[0]) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    res.json(userData);

    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a delete route for api/users
router.delete("/:id", async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
            id: req.params.id
        }
      });

      if (!userData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
  
      res.json(userData);
  
      console.log(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
