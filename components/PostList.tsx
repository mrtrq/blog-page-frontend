'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { PostCard } from './PostCard'
import { useSupabase } from '@/lib/supabase'
import { Post } from '@/types/post'
import { toast } from "sonner"

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { fetchPosts } = useSupabase()

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to load posts')
        console.error(error)
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const handleDeletePost = (deletedId: number) => {
    setPosts(posts.filter(post => post.id !== deletedId))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading posts...
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Req's Blog Posts</h1>
        <Link href="/posts/create">
          <Button>Create New Post</Button>
        </Link>
      </div>
  
      {posts.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No posts found. Create your first post!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post.id} className="h-full">
              <PostCard 
                post={post} 
                onDelete={(e) => handleDeletePost(post.id)} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )  
}