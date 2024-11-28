import { PostForm } from "@/components/PostForm";
import { Toaster } from "sonner";

export default function CreatePostPage() {
    return (
        <div className="container mx-auto px-4 py-6">
            <PostForm />
            <Toaster />
        </div>
    )
}