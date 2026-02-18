type Props = {
  title: string;
};

export default function SidebarSectionTitle({ title }: Props) {
  return (
    <h2 className="text-lg ml-2 text-[var(--main-gray)] shrink-0">{title}</h2>
  );
}
