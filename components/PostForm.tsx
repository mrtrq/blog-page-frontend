'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from '@/lib/supabase'
import { Post, PostFormData } from '@/types/post'
import { toast } from "sonner"

interface PostFormProps {
  initialData?: Post
}

export function PostForm({ initialData }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title || '',
    content: initialData?.content || ''
  })
  const { createPost, updatePost } = useSupabase()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (initialData) {
        // Update existing post
        await updatePost(initialData.id, formData)
        toast.success('Post updated successfully')
      } else {
        // Create new post
        await createPost(formData)
        toast.success('Post created successfully')
      }
      router.push('/posts')
    } catch (error) {
      toast.error('Failed to save post')
      console.error(error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? 'Edit Post' : 'Create New Post'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Post Title"
              value={formData.title}
              onChange={(e) => setFormData({ 
                ...formData, 
                title: e.target.value 
              })}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Post Content"
              value={formData.content}
              onChange={(e) => setFormData({ 
                ...formData, 
                content: e.target.value 
              })}
              required
              rows={6}
            />
          </div>
          <Button type="submit" className="w-full">
            {initialData ? 'Update Post' : 'Create Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}