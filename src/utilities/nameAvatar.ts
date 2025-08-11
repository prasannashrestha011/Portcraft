export function getNameAvatarURL(name: string | null | undefined) {
  if (!name) return ""; // or return a default image URL

  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=128`;
}
