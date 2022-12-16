const { Post } = require("../models");

const postData = [
  {
    title: "Love Javascript",
    content: "Its so cool and not hard at all, easy easy easy",
    user_id: 1,
  },
  {
    title: "Hate CSS",
    content: "CSS is very hard..like come on.. ART??",
    user_id: 2,
  },
  {
    title: "Backend stuff is cool",
    content: "all this back end stuff is really cool and not hard, jk its hard",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
