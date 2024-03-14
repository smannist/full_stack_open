import { render, screen } from "@testing-library/react";
import { mockBlog } from "./mock_data/blog";
import CreateBlogForm from "../components/CreateBlogForm";
import userEvent from "@testing-library/user-event";

let user;
let createBlogMock;

describe("CreateBlogForm component", () => {
  beforeEach(() => {
    user = userEvent.setup();
    createBlogMock = vi.fn();
    render(<CreateBlogForm createBlog={createBlogMock} />);
  });

  test("when creating a new blog, callback function is called with the correct parameters", async () => {
    const inputs = screen.getAllByRole("textbox");
    const createBtn = screen.getByText("Create");

    await user.type(inputs[0], mockBlog.title);
    await user.type(inputs[1], mockBlog.author);
    await user.type(inputs[2], mockBlog.url);

    await user.click(createBtn);

    expect(createBlogMock.mock.calls).toHaveLength(1);
    expect(createBlogMock.mock.calls[0][0].title).toBe(mockBlog.title);
    expect(createBlogMock.mock.calls[0][0].author).toBe(mockBlog.author);
    expect(createBlogMock.mock.calls[0][0].url).toBe(mockBlog.url);
  });
});
