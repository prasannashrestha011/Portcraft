export default function PreviewPane({ code }: { code: string }) {
  return (
    <iframe
      className="flex-1 w-full h-full overflow-y-auto border-0"
      srcDoc={code}
      sandbox="allow-scripts"
    />
  );
}
