'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from 'lucide-react'
import { Post } from '@/types/post'
import { useSupabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface PostCardProps {
  post: Post
  onDelete?: (id: number) => void
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const { deletePost } = useSupabase()
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deletePost(post.id)
      toast.success('Post deleted successfully')
      onDelete?.(post.id)
    } catch (error) {
      toast.error('Failed to delete post')
      console.error(error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {post.content}
        </p>
        <div className="text-xs text-muted-foreground mt-2">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/posts/edit/${post.id}`}>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <Button 
          variant="destructive" 
          size="icon" 
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}