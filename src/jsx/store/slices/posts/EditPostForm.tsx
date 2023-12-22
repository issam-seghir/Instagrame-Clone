import React, { ChangeEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdated } from './postsSlice'

import { useStoreDispatch, useStoreSelector } from "../../hooks"


export const EditPostForm = ({ match }) => {
  const { postId } = useParams<{ postId: string }>();

  const post = useStoreSelector((state) =>
    state.posts.find((post) => post.id === postId),
  )

  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")

  const dispatch = useStoreDispatch()
  const navigate = useNavigate()

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
