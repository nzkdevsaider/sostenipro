import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";

const AccountNavBar = () => {
  const user = useUser();
  if (user) {
    return (
      <div className="flex flex-row items-center justify-end mt-5">
        <Link href="/app/account">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2 rounded-full"
          >
            <UserCircleIcon className="h-8 w-8" />
            <span className="ml-2">{user.email}</span>
          </Button>
        </Link>
      </div>
    );
  }
};

export default AccountNavBar;
