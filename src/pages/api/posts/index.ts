import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '../../../utils/database';
import { Post } from '../../../entities/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await getConnection();
  const postRepository = connection.getRepository(Post);

  switch (req.method) {
    case 'GET':
      const posts = await postRepository.find({ relations: ['category'] });
      res.status(200).json(posts);
      break;
    case 'POST':
      const { title, content, categoryId } = req.body;
      const post = postRepository.create({ title, content, category: { id: categoryId } });
      await postRepository.save(post);
      res.status(201).json(post);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
