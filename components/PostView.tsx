'use client'

import React from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { Post } from '@/types/post'

interface PostViewProps {
  post: Post
}

export function PostView({ post }: PostViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        href="/posts" 
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Posts
      </Link>
      
      <article className="prose dark:prose-invert lg:prose-xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <span>
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
        </header>
        
        <div 
          className="break-words"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}