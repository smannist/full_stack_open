
const CreateBlogForm = ({
  handleCreate,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title
          <input type="text" value={title} name="Title" onChange={setTitle} />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={setAuthor}
          />
        </div>
        <div>
          Url
          <input type="text" value={url} name="Url" onChange={setUrl} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
