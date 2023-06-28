import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";

const Login = () => {
  const supabase = useSupabaseClient();

  return (
    <div className="flex flex-row min-h-screen">
      <section className="w-4/6">
        <div className="flex flex-col mx-16 my-10">
          <div className="flex flex-col items-center py-3">
            <Image
              src="/images/icon.jpg"
              width={80}
              height={80}
              alt="Ícono de SosteniPro"
            />
            <Image
              src="/logo.png"
              width={220}
              height={220}
              alt="Logo de SosteniPro"
            />
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={false}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Correo eléctronico",
                  password_label: "Contraseña",
                  button_label: "Iniciar sesión",
                  loading_button_label: "Iniciando sesión...",
                  link_text: "¿Ya tienes una cuenta? Inicia sesión",
                },
                sign_up: {
                  email_label: "Correo eléctronico",
                  password_label: "Contraseña",
                  button_label: "Registrarse",
                  loading_button_label: "Registrando...",
                  link_text: "¿No tienes una cuenta? Regístrate",
                  confirmation_text:
                    "Mira tu correo eléctronico para la confirmación de registro",
                },
              },
            }}
            theme="dark"
          />
        </div>
      </section>
      <section className="bg-[url(/images/bg1.jpg)] bg-cover bg-center h-screen w-screen">
      </section>
    </div>
  );
};

export default Login;
