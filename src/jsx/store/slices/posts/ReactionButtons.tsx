import React from 'react'
import { useDispatch } from 'react-redux'

import { reactionAdded } from './postsSlice'

import Post from "../../../types/post"


const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name as keyof typeof reactionEmoji }))
        }
      >
        {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
