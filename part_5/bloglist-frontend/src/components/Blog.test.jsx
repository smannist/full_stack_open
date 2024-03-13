import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const mockBlog = {
  title: "AI agents help explain other AI systems",
  author: "Rachel Gordon",
  url: "https://news.mit.edu/2024/ai-agents-help-explain-other-ai-systems-0103",
  likes: 2,
  user: {
    username: "potato",
  },
};

const mockUser = {
  username: "potato",
};

describe("Blog component", () => {
  test("title and author is rendered", () => {
    render(<Blog blog={mockBlog} user={mockUser.username} />);

    const element = screen.getByText(
      "AI agents help explain other AI systems Rachel Gordon"
    );

    expect(element).toBeDefined();
  });
});
