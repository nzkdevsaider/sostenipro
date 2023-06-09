import Login from "@sostenipro/components/Layout/Login";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  
  if (!session) {
    return (
      <main className="min-h-screen bg-gray-100">
        <Login />
      </main>
    );
  }
  if (session) {
    router.push("/app");
  }
}
