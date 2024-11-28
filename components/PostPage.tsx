'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PostView } from './PostView'
import { useSupabase } from '@/lib/supabase'
import { Post } from '@/types/post'
import { toast } from 'sonner'

export function PostPage({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { fetchPostById } = useSupabase()

  useEffect(() => {
    async function loadPost() {
      try {
        const fetchedPost = await fetchPostById(Number(postId))
        
        if (!fetchedPost) {
          toast.error('Post not found')
          router.push('/posts')
          return
        }

        setPost(fetchedPost)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to load post')
        console.error(error)
        router.push('/posts')
        setLoading(false)
      }
    }

    loadPost()
  }, [postId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading post...
      </div>
    )
  }

  if (!post) {
    return null
  }

  return <PostView post={post} />
}