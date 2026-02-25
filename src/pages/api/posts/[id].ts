import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '../../../utils/database';
import { Post } from '../../../entities/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const connection = await getConnection();
  const postRepository = connection.getRepository(Post);

  switch (req.method) {
    case 'GET':
      const post = await postRepository.findOne({
        where: { id: parseInt(id as string) },
        relations: ['category'],
      });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
      break;
    case 'PUT':
      const { title, content, categoryId } = req.body;
      const existingPost = await postRepository.findOne({
        where: { id: parseInt(id as string) },
        relations: ['category'],
      });
      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      postRepository.merge(existingPost, { title, content, category: { id: categoryId } });
      await postRepository.save(existingPost);
      res.status(200).json(existingPost);
      break;
    case 'DELETE':
      const deleteResult = await postRepository.delete(parseInt(id as string));
      if (deleteResult.affected === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
