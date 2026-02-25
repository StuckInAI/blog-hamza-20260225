import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '../../../utils/database';
import { Category } from '../../../entities/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const connection = await getConnection();
  const categoryRepository = connection.getRepository(Category);
  const categories = await categoryRepository.find();
  res.status(200).json(categories);
}
