export const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

function buildBase(type: 'image' | 'video') {
  return CLOUDINARY_CLOUD
    ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/${type}/upload`
    : '';
}

// Build Cloudinary image URL with sane defaults
export function cldImage(publicId: string, transforms = 'f_auto,q_auto') {
  const base = buildBase('image');
  if (!base) return '';
  // publicId can include folders like parade/hero
  return `${base}/${transforms}/${publicId}`;
}

// Build Cloudinary video URLs (webm/mp4) with good defaults
export function cldVideoSources(publicId: string, opts?: { quality?: string; webmCodec?: string; mp4Codec?: string }) {
  const base = buildBase('video');
  if (!base) return { webm: '', mp4: '' };
  const q = opts?.quality ?? 'q_auto:eco';
  const webmCodec = opts?.webmCodec ?? 'vc_vp9';
  const mp4Codec = opts?.mp4Codec ?? 'vc_h265';
  return {
    webm: `${base}/${q},${webmCodec}/${publicId}.webm`,
    mp4: `${base}/${q},${mp4Codec}/${publicId}.mp4`,
  };
}
