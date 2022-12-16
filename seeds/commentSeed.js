const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Uhm its kind of difficult",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Its actually not that hard",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text:
      "No, know that i think of it, Front end stuff is kind of cool too",
    user_id: 3,
    post_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
