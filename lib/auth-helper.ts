import { auth } from '@/auth'
import prisma from '@/lib/db'

export const getSessionUser = async () => {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  return user
}
