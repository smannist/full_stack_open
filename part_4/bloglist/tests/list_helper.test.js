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

  test("when the list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(mockData.listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(mockData.listWithMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of an empty list is null", () => {
    const result = listHelper.favoriteBlogs([]);
    expect(result).toEqual(null);
  });

  test("when the list has only one blog, the favorite equals that", () => {
    const result = listHelper.favoriteBlogs(mockData.listWithOneBlog);
    expect(result).toEqual(mockData.listWithOneBlog[0]);
  });

  test("of a bigger list is found correctly", () => {
    const result = listHelper.favoriteBlogs(mockData.listWithMultipleBlogs);
    expect(result).toEqual(mockData.listWithMultipleBlogs[2]);
  });
});

describe("author with most blogs", () => {
  test("of an empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });

  test("when the list has only one blog, most blogs equals that", () => {
    const expectedData = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    const result = listHelper.mostBlogs(mockData.listWithOneBlog);
    expect(result).toEqual(expectedData);
  });

  test("of a bigger list is found correctly", () => {
    const expectedData = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = listHelper.mostBlogs(mockData.listWithMultipleBlogs);
    expect(result).toEqual(expectedData);
  });
});

describe("author with most likes", () => {
  test("of an empty list is null", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual(null);
  });
  
  test("when the list has only one blog, most likes equals that", () => {
    expectedData = {
      author: "Edsger W. Dijkstra",
      likes: 5
    }
  
    result = listHelper.mostLikes(mockData.listWithOneBlog);
    expect(result).toEqual(expectedData);
  })

  test("of a bigger list is found correctly" , () => {
    expectedData = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    result = listHelper.mostLikes(mockData.listWithMultipleBlogs);
    expect(result).toEqual(expectedData);
  })
});
