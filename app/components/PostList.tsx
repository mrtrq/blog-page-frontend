'use client'
import { usePosts } from "../hooks/usePosts"

export function PostList() {
    const {posts, loading} = usePosts()

    if (loading) return (
        <div>
        Loading posts...
        </div>
    )

    return (
        <div>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.created_at.substring(0,10)}</p>
            <br />
          </div>
        ))}
      </div>
    )
}