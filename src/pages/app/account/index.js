import Account from "@sostenipro/components/Account/Account";
import { IconButton } from "@material-tailwind/react";
import LogoutButtton from "@sostenipro/components/Buttons/LogoutButtton";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "@supabase/auth-helpers-react";

export default function AccountPage() {
  const session = useSession();
  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-green-700 to-green-100">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center h-4/5 w-10/12 my-5 p-3 px-10 md:w-3/5 bg-white md:my-10 md:py-10 md:px-24 rounded-md shadow-lg space-y-4">
            <Link href="/">
              <IconButton>
                <ArrowSmallLeftIcon className="h-5 w-5"/>
              </IconButton>
            </Link>
            <h1 className="text-4xl">Configuración</h1>
            <h2 className="text-2xl">Información general</h2>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <h3 className="font-bold">Correo eléctronico</h3>
              <p>{session.user.email}</p>
            </div>
            <h2 className="text-2xl">Personalización</h2>
            <Account session={session} />
            <h2 className="text-2xl">Controles</h2>
            <LogoutButtton />
          </div>
        </div>
      </div>
    );
  }
}
