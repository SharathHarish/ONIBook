import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient();


async function main() {
const hashed = await bcrypt.hash('password', 10);


await prisma.user.upsert({
where: { email: 'admin@example.com' },
update: {},
create: { email: 'admin@example.com', password: hashed, name: 'Admin', role: 'ADMIN' },
});


const author = await prisma.author.upsert({
where: { name: 'Jane Austen' },
update: {},
create: { name: 'Jane Austen', bio: 'Classic author' },
});


await prisma.book.upsert({
where: { isbn: 'ISBN-0001' },
update: {},
create: {
title: 'Pride and Prejudice',
description: 'Classic novel by Jane Austen',
authorId: author.id,
isbn: 'ISBN-0001',
copies: 3,
publishedAt: new Date('1813-01-28'),
},
});
}


main()
.catch((e) => console.error(e))
.finally(async () => await prisma.$disconnect());