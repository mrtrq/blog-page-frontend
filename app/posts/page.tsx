import { PostList } from "@/components/PostList";
import { Toaster } from "sonner";

export default function PostsPage() {
    return (
        <div>
            <PostList />
            <Toaster />
        </div>
    )
}