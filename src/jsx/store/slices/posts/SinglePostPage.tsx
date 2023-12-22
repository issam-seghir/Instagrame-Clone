import React from 'react'
import { useSelector } from 'react-redux'
import { Link, RouteComponentProps } from "react-router-dom"

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { StoreState } from '../../store'
import Post from '../../../types/post'


export const SinglePostPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { postId } = match.params as { postId: string };

  const post = useSelector((state: StoreState) =>
    state.posts.find((post) => post.id === postId) as Post
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
