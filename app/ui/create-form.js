// app/ui/create-form.js
'use client'

import { useRouter } from "next/navigation";
import { createPost } from "../lib/actions";
import ImageSelector from "../ui/image-selector";
import { useActionState, useEffect } from "react";

export default function CreateForm() {
  const router = useRouter();
  const [formState, formAction] = useActionState(createPost, { success: null, message: null, errors: {} });

  useEffect(() => {
    if (formState.success) {
      router.push('/'); // Redirige a Home tras la creación
    }
  }, [formState.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <ImageSelector />
      <input name="content" className="p-2 border" required placeholder="Descripción de la publicación" />
      <input className="p-2 bg-blue-600 text-white rounded" type="submit" value="Publicar" />
    </form>
  );
}
