'use client'
import { useState, useEffect } from "react"
import { supabase } from "../services/supabaseClient"

type Post = {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function fetchPosts() {
        try {
            const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', {ascending: false})

            if (error) throw error
            setPosts(data || [])
        } catch (error) {
            console.error('Error fetching posts', error)
        } finally {
            setLoading (false)
        }
      }
      fetchPosts()
    }, [])
    return { posts, loading}
}


