"use client";

import { useState } from "react";
import Link from "next/link";

import { Post, getAllPosts } from "@/services/posts";

interface PropsType {
  posts: Post[];
}

export default function Posts({ posts }: PropsType) {
  const [filterData, setFilterData] = useState<string>("");

  const ChangeFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData(event.target.value);
  };
  return (
    <div>
      <h1>Posts</h1>
      <input
        placeholder="search"
        value={filterData}
        onChange={ChangeFilterData}
      />
      <div>
        {posts
          ? posts
              .filter(({ title }) => title.includes(filterData))
              .map((item) => (
                <div key={item.id}>
                  <Link href={`/posts/${item.id}`}>{item.title}</Link>
                </div>
              ))
          : "Posts not exist"}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
