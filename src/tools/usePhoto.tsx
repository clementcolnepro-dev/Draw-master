import { useEffect, useRef, useState } from 'react';

/** Sélection d'une photo locale (non stockée) pour les outils. */
export function usePhoto() {
  const input = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>();
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  const picker = (
    <input
      ref={input}
      type="file"
      accept="image/*"
      hidden
      onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) setUrl(URL.createObjectURL(f));
        e.target.value = '';
      }}
    />
  );
  return { url, picker, open: () => input.current?.click() };
}
