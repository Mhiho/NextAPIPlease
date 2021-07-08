import jwt from 'jsonwebtoken';
import { secret } from '../../../config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (tokenWithBear: string) => {

    if (!tokenWithBear) {
        throw new Error('Authentication required')
    }

    const token = tokenWithBear.replace('Bearer ', '')
    const decoded : any = jwt.verify(token, secret)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.userId
        }
    });
    if (!user) throw new Error('you must be logged in');
        
    const { email, name } = user;
    return { email, name };
};

export { getUser as default };