import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../../config';
import { v4 as uuidv4 }from 'uuid';
import getUserId from './utils/getUserId';

const prisma = new PrismaClient();

export const user = {
    Query: {
        getUserById: async (id) => {
            return await prisma.user.findUnique({where: {id: id}})
        },
        getAllUsers: async() => {
            return await prisma.user.findMany()
        }
    },
    Mutation: {
        signUp: async(parent,args,context,info) => {
            if (args.data.password.length < 8) {
                throw new Error('Password must be 8 characters or longer.')
            }
            const password = await bcrypt.hash(args.data.password, 10)
            const user = await prisma.user.create({
                data: {
                    name: args.data.name,
                    email: args.data.email,  
                    password: password,        
                }
            })
        
            const tok : string = jwt.sign({ userId: user.id }, secret)
         
            const token = await prisma.token.create({ data: {
                token: tok,
                userId: user.id
            }
            })
    
            return {
                user,
                token
            }
          },
          
          login: async(parent,args,context,info) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: args.data.email
                }
            })
    
            if (!user) {
                throw new Error('Unable to login')
            }
    
            const isMatch = await bcrypt.compare(args.data.password, user.password)
    
            if (!isMatch) {
                throw new Error('Unable to login')
            }
            const token : string = jwt.sign({ userId: user.id }, secret)

            const tokenObj : any = await prisma.token.create({ data: {
                token: token,
                userId: user.id
            } })
            return {
                tokenObj
            }
          },
          createPoem: async(parent, args, context , info) => {
              const userId = await getUserId(context)
              console.log(userId)
          }
        }
    }