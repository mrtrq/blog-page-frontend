import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Custom hook for data fetching
export const useSupabase = () => {
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  const fetchPostById = async (id: number) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  const createPost = async (post: { title: string; content: string }) => {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const updatePost = async (id: number, post: { title?: string; content?: string }) => {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const deletePost = async (id: number) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }

  return {
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost
  }
}