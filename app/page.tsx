'use client';

import { PostList } from "@/components/PostList";

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <PostList />
    </main>
  );
}
