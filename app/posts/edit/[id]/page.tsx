'use client'

import { useState, useEffect, use } from "react"
import { PostForm } from "@/components/PostForm"
import { useSupabase } from "@/lib/supabase"
import { Post } from "@/types/post"
import { Toaster } from "sonner"

export default function EditPostPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const [post, setPost] = useState<Post | undefined>()
    const { fetchPostById } =  useSupabase()
    const { id } = use(params)

    useEffect(() => {
        async function loadPost() {
            try {
                const fetchedPost = await fetchPostById(Number(id))
                setPost(fetchedPost)
            } catch (error) {
                console.error('Failed to load post', error)
            }
        }
        loadPost()
    }, [id])

    if (!post) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className=" container mx-auto px-4 py-6">
            <PostForm initialData={post} />
            <Toaster />
        </div>
    )
}