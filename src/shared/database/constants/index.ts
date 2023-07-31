import { DatabaseEntitiesType } from '../types';

export const databaseTables: Record<keyof DatabaseEntitiesType, string> = <const>{
    users: 'users',
    books: 'books',
    likes: 'likes',
    orders: 'orders',
    ratings: 'ratings'
};
