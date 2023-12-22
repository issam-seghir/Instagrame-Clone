import React from 'react'
import { useStoreDispatch, useStoreSelector } from "../../hooks"

export const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useStoreSelector((state) =>
    state.users.find((user) => user.id === userId),
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
