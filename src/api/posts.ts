import { NextApiRequest, NextApiResponse } from "next";

type Post = {
  title: string;
  body: string;
};

export default function PostsApi(req: NextApiRequest, res: NextApiResponse) {
  // Communication with prisma
  res.status(200).json([
    {
      title: "Hello",
      body: "World",
    },
  ]);
}
