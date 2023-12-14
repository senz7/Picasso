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
    <div key={post.id}>
      <div>Id:{query.id}</div>
      <div>Body: {post.body}</div>
      <div>id from post: {post.id}</div>
      <Image quality={1} height={150} width={150} alt="Random Image" src={""} />
      <Link href="/posts">Go Back</Link>
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
