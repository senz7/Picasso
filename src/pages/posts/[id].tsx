import { useRouter } from "next/router";
import Image from "next/image";

import { Post, getOnePost } from "@/services/posts";
import Link from "next/link";

interface PropsType {
  post: Post;
}

export default function Post({ post }: PropsType) {
  const { query } = useRouter();

  return (
    <div
      className="bg-slate-600 h-screen font-bold text-white px-40 pt"
      key={post.id}
    >
      <div>Post id:{query.id}</div>
      <div>{post.body}</div>

      <Image quality={1} height={150} width={150} alt="Random Image" src={""} />
      <Link
        className="font-bold border border-cyan-700 bg-cyan-600 hover:bg-cyan-500 rounded-md px-1 py-1"
        href="/posts"
      >
        Go Back
      </Link>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const post = await getOnePost(context.params.id);

  return {
    props: {
      post,
    },
  };
}
