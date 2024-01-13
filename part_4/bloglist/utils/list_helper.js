const lodash = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
  }, blogs[0]);

  return favorite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupByAuthor = lodash.groupBy(blogs, "author");

  const authorsBlogCount = lodash.map(groupByAuthor, (blogs, author) => ({
    author: author,
    blogs: blogs.length,
  }));

  const authorWithMostBlogs = lodash.maxBy(authorsBlogCount, "blogs");

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupByAuthor = lodash.groupBy(blogs, "author");

  const authorsLikeCount = lodash.map(groupByAuthor, (blogs, author) => ({
    author: author,
    likes: lodash.sumBy(blogs, "likes"),
  }));

  const authorWithMostLikes = lodash.maxBy(authorsLikeCount, "likes");

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
