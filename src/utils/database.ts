import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Post } from '../entities/Post';
import { Category } from '../entities/Category';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './database.sqlite',
  synchronize: true,  // Automatically create tables based on entities (use migrations in production)
  logging: false,
  entities: [User, Post, Category],
  migrations: [path.join(__dirname, '../migrations/*.ts')],
  subscribers: [],
});

let connection: DataSource | null = null;

export async function getConnection(): Promise<DataSource> {
  if (!connection) {
    connection = await AppDataSource.initialize();
  }
  return connection;
}
