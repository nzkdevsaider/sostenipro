import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Spinner } from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error al descargar la imagen: ", error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Debes elegir una imagen.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error subiendo la imagen!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl !== "" ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="shadow-md rounded-md max-w-full h-auto align-middle border-none hover:shadow-xl"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="bg-gray-100" style={{ height: size, width: size }} />
      )}
      <div className="mb-10 mt-3">
        <label htmlFor="single">
          {uploading ? (
            <Spinner />
          ) : (
            <div className="flex flex-row space-x-3">
              <ArrowUpTrayIcon className="h-6 w-6" />
              <span>Actualizar avatar</span>
            </div>
          )}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
