import jwt from 'jsonwebtoken';
import { secret } from '../../../config';

const getUserId = (request) => {
    const header = request.request.headers.authorization

    if (!header) {
        throw new Error('Authentication required')
    }

    const token = header.replace('Bearer ', '')
    const decoded : any = jwt.verify(token, secret)

    console.log(decoded)
    return decoded.userId
};

export { getUserId as default };