'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from 'lucide-react'
import { Post } from '@/types/post'
import { useSupabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

interface PostCardProps {
  post: Post
  onDelete?: (id: number) => void
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const { deletePost } = useSupabase();
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event propagation
    try {
      await deletePost(post.id);
      toast.success('Post deleted successfully');
      onDelete?.(post.id);
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    }
  };

  const handleNavigation = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div 
      className="block cursor-pointer w-full max-w-md mx-auto transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
      onClick={handleNavigation}
    >
      <Card className="h-80 flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="truncate">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <p className="text-muted-foreground line-clamp-3">
            {post.content}
          </p>
          <div className="text-xs text-muted-foreground mt-2">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card navigation
              router.push(`/posts/edit/${post.id}`);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card navigation
              handleDelete(e);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
