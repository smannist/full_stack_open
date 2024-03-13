import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  test("by default only title and author is shown", () => {
    render(<Blog blog={mockBlog} user={mockUser.username} />);

    const element = screen.getByText(
      "AI agents help explain other AI systems Rachel Gordon"
    );

    expect(element).toBeDefined();
  });

  test("clicking the 'View' button reveals additional information", async () => {
    const { container } = render(
      <Blog blog={mockBlog} user={mockUser.username} />
    );
    const div = container.querySelector(".blog");
    const button = screen.getByText("View");
    const user = userEvent.setup();

    await user.click(button);

    expect(div).toHaveTextContent(mockBlog.url);
    expect(div).toHaveTextContent(mockBlog.likes);
    expect(div).toHaveTextContent(mockBlog.user.username);
  });
});
