type Props = {
  title: string;
};
export default function ControllerSectionTitle({ title }: Props) {
  return (
    <h3 className="text-[var(--main-gray)] border-b-1 pb-3 w-full">{title}</h3>
  );
}
