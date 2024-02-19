"use client";
import { useState } from "react";
import Link from "next/link";
import "../../app/globals.css";

import { Post, getAllPosts } from "@/services/posts";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import InfiniteScroll from "react-infinite-scroll-component";

interface PropsType {
  posts: Post[];
}

export default function Posts({ posts }: PropsType) {
  const [hasMore, setHasMore] = useState(true);
  const [filterData, setFilterData] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>(posts);

  async function fetchMoreData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);

      setAllPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.log("Error fetching more data: ", error);
    }
  }

  const ChangeFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData(event.target.value);
  };

  return (
    <div className="bg-slate-600 h-full ">
      <Header />
      <div className="px-40">
        <div className="flex justify-center pt-4 pb-4">
          <Input
            className="w-96 outline-none text-white bg-slate-500 rounded-md focus:outline-slate-950"
            placeholder="search post"
            value={filterData}
            onChange={ChangeFilterData}
          />
        </div>

        <div id="scrollableDiv" className="text-white flex flex-col pt-4">
          <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {allPosts
              ? allPosts
                  .filter(({ title }) => title.includes(filterData))
                  .map((item) => (
                    <div
                      className="py-5 px-2 mt-6 border border-slate-800 bg-slate-700 rounded-md "
                      key={item.id}
                    >
                      <h1 className="font-bold mb-2">
                        #{item.id} | {item.title}...
                      </h1>
                      <Link
                        className="font-bold border border-cyan-700 bg-cyan-600 hover:bg-cyan-500 rounded-md px-1 py-1"
                        href={`/posts/${item.id}`}
                      >
                        View
                      </Link>
                    </div>
                  ))
              : "Posts not exist"}
          </InfiniteScroll>
        </div>
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
