import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

const LogoutButtton = ({ redirect, variant, size }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const handleOnClick = () => {
    supabase.auth.signOut();
    router.push(redirect ?? "/");
  };

  return (
    <Button
      size={size}
      variant={variant === "icon" ? "filled" : variant}
      color="red"
      onClick={handleOnClick}
    >
      {variant === "icon" ? (
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      ) : (
        "Cerrar sesión"
      )}
    </Button>
  );
};

export default LogoutButtton;
