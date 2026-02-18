export default function ProjectTitle() {
  return (
    <header className="w-full h-fit flex gap-3 items-end">
      <a href="https://timwork.kr/">
        <img src="/assets/logo.png" className="h-15" />
      </a>

      <a
        href="https://mysterious-washer-bf4.notion.site/2e1324529262816e9653f4851f5d41cc?source=copy_link"
        className="cursor-pointer"
      >
        <p className="pb-1 text-var(--main-gray) hover:underline underline-offset-4">
          김현규 과제
        </p>
      </a>
    </header>
  );
}
