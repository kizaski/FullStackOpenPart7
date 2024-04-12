const newBlogForm = ({
  handleSubmit,
  handleTitleChange,
  titleVal,
  handleAuthorChange,
  authorVal,
  handleUrlChange,
  urlVal,
}) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form className="mx-2" onSubmit={handleSubmit}>
        <div className="my-2">
          <label className="mx-2">title</label>
          <input
            className="rounded-md outline-double"
            type="text"
            value={titleVal}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="my-2">
          <label className="mx-2">author</label>
          <input
            className="rounded-md outline-double"
            type="text"
            value={authorVal}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div className="my-2">
          <label className="mx-2">url</label>
          <input
            className="rounded-md outline-double"
            type="text"
            value={urlVal}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button className="rounded-md px-2 py-1 outline-double" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default newBlogForm
