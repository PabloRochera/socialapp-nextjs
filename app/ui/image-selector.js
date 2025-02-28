// app/ui/image-selector.js
'use client'

import Image from "next/image";
import { useState } from "react";

export default function ImageSelector() {
  const [previewSrc, setPreviewSrc] = useState("/preview.jpg");

  function handleChange(ev) {
    const file = ev.target.files[0];
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
    }
  }

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="media">
        <Image src={previewSrc} alt="Vista previa" width={256} height={256} className="rounded" />
      </label>
      <input id="media" type="file" name="media" onChange={handleChange} required className="hidden" />
    </div>
  );
}
