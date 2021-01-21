import { PrismaClient } from "@prisma/client";

async function main() {
  const db = new PrismaClient();
  const categories = [
    { create: { id: 1 }, where: { id: 1 } },
    { create: { id: 2 }, where: { id: 2 } },
  ];
  await db.post.upsert({
    where: { author: "author" },
    create: {
      author: "author",
      categories: {
        connectOrCreate: categories,
      },
    },
    update: {
      categories: { connectOrCreate: categories },
    },
  });

  await db.post.upsert({
    where: { author: "author2" },
    create: {
      author: "author2",
      categories: {
        connectOrCreate: categories,
      },
    },
    update: {
      categories: { connectOrCreate: categories },
    },
  });

  const posts = await db.post.findMany({
    include: {
      categories: true,
    },
  }); // Throws a panic
  console.log(posts);
  db.$disconnect();
}

main();
