import { useBlobUrl } from '../lib/useBlobUrl';

export function BlobImg({ blob, alt, className }: { blob?: Blob; alt: string; className?: string }) {
  const url = useBlobUrl(blob);
  return url ? <img src={url} alt={alt} className={className} /> : <div className={`${className || ''} img-ph`} />;
}
