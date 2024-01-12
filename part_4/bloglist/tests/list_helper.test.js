const listHelper = require("../utils/list_helper");
const mockData = require("./mock_data/blog");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(mockData.listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(mockData.blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    const result = listHelper.favoriteBlogs([]);
    expect(result).toEqual(null);
  });

  test("when list has only one blog favorite equals that", () => {
    const result = listHelper.favoriteBlogs(mockData.listWithOneBlog);
    expect(result).toEqual(mockData.listWithOneBlog[0]);
  });

  test("of a bigger list is found correctly", () => {
    const result = listHelper.favoriteBlogs(mockData.blogs);
    expect(result).toEqual(mockData.blogs[2]);
  });
});
