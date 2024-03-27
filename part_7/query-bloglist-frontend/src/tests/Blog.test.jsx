import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import { mockBlog, mockUser } from "./mock_data/blog";

let div;
let user;
let mockAddLike;

describe("Blog component", () => {
  beforeEach(async () => {
    user = userEvent.setup();
    mockAddLike = vi.fn();

    const { container } = render(
      <Blog blog={mockBlog} user={mockUser.username} addLike={mockAddLike} />
    );

    div = container.querySelector(".blog");
  });

  test("by default only title and author is shown", () => {
    expect(div).toHaveTextContent(
      mockBlog.title + " " + mockBlog.author
    );
    expect(div).not.toHaveTextContent(mockBlog.url);
    expect(div).not.toHaveTextContent(mockBlog.likes);
    expect(div).not.toHaveTextContent(mockBlog.user.username);
  });

  test("clicking the 'View' button reveals additional information", async () => {
    const viewBtn = screen.getByText("View");

    await user.click(viewBtn);

    expect(div).toHaveTextContent(mockBlog.url);
    expect(div).toHaveTextContent(mockBlog.likes);
    expect(div).toHaveTextContent(mockBlog.user.username);
  });

  test("clicking 'Like' twice calls the event handler by the same amount", async () => {
    const viewBtn = screen.getByText("View");

    await user.click(viewBtn);

    const likeBtn = div.querySelector(".like-button");

    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockAddLike.mock.calls).toHaveLength(2);
  });
});
