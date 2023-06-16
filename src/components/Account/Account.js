import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Input, Spinner } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import Avatar from "./Avatar";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [full_name, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, full_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFullname(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      setAlert({
        level: 0,
        message: "Ha ocurrido un error al obtener datos del perfil.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, full_name, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        full_name,
        avatar_url,
        updated_at: new Date().toISOString(),
      };
      
      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      setAlert({
        level: 1,
        message: "Los datos del perfil han sido actualizado exitosamente.",
      });
    } catch (error) {
      setAlert({
        level: 0,
        message: "Ha ocurrido un error al actualizar los datos del perfil.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
        }}
      />

      <form
        onChange={(e) => {
          e.preventDefault();
          setAlert(null);
        }}
        className="flex flex-col space-y-4"
      >
        <Input
          label="Nombre completo"
          value={full_name}
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          label="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
      <div className="flex flex-row items-center space-x-3">
        <Button
          onClick={() => updateProfile({ username, full_name, avatar_url })}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Guardar cambios"}
        </Button>
        {alert?.level === 0 && (
          <div className="text-red-500 flex flex-row">
            <ExclamationCircleIcon className="h-5 w-5" /> {alert?.message}
          </div>
        )}
        {alert?.level === 1 && (
          <div className="text-green-500 flex flex-row">
            <CheckCircleIcon className="h-5 w-5" />
            {alert?.message}
          </div>
        )}
      </div>

      <div></div>
    </div>
  );
}
