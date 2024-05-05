import { auth } from "@/auth";
import prisma from "@/lib/db";


export default async function Home() {
  const session = await auth();

  if (!session?.user) return null

  const userEmail = session.user.email;

  return (
    <>

    </>
  );
}