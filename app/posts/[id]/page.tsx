// app/posts/[id]/page.tsx
import { PostPage } from "@/components/PostPage";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <PostPage postId={id} />;
}
