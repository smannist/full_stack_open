import { useState } from "react";

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    createBlog(blogObject);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="max-w-xs mt-5 mx-auto bg-yellow-400 shadow-md rounded px-3 pt-4 pb-6 mb-2">
      <h2 className="text-xl font-bold mb-3">Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div className="mb-3">
          <label className="block text-black text-sm font-bold mb-1">
            Title
          </label>
          <input
            data-testid="title"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-3">
          <label className="block text-black text-sm font-bold mb-1">
            Author
          </label>
          <input
            data-testid="author"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-blackleading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-1">Url</label>
          <input
            data-testid="url"
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
