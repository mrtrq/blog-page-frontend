export interface Post {
    id: number
    title: string
    content: string
    created_at: string
}

export interface PostFormData {
    title: string
    content: string
}