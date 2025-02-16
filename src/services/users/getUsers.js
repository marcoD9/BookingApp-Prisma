import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    where: {
      username: username ? username : undefined,
      email: email ? email : undefined,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });

  return users;
};

export default getUsers;
