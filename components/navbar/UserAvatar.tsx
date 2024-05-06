import { auth } from "@/auth"
import { SignOut } from "../auth/signout-button"
import Link from "next/link"

export default async function UserAvatar() {

  const session = await auth()

  if (!session?.user) return null

  return (
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={session.user.image || ''} alt="User Avatar" />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Learn More
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <Link href={'/studio'}>
              <span>Studio</span>
            </Link>
          </li>
          <li>
            <a href='https://dashboard.stripe.com/login' target={'_blank'} >
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <SignOut />
          </li>
        </ul>
      </div>
    </div >

  )
}