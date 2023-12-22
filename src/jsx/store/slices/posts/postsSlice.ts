import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"
import { sub, formatISO } from 'date-fns'

import Post from '../../../types/post'

interface ReactionPayload {
  postId: string
  reaction: keyof Post['reactions']
}

interface PostPayload {
  id: string
  title: string
  content: string
}

const initialState: Post[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: formatISO(sub(new Date(), { minutes: 10 })),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: formatISO(sub(new Date(), { minutes: 5 })),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    reactionAdded(state, action: PayloadAction<ReactionPayload>) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action: PayloadAction<PostPayload>) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions


// you can use selectors instead  const posts = useSelector(state:StoreState, ...)  : => const posts = useSelector(selectAllPosts)
// export const selectAllPosts = (state) => state.posts

// export const selectPostById = (state: StoreState, postId) =>state.posts.find((post) => post.id === postId)

export default postsSlice.reducer
