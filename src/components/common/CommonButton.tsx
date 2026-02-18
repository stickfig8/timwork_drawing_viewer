import { Button } from "../ui/button";

type Props = {
  text: string;
  width?: string;
  height?: string;
  onClick: () => void;
};

export default function CommonButton({
  text,
  width = "20",
  height = "8",
  onClick,
}: Props) {
  return (
    <Button
      onClick={onClick}
      className={`w-${width} h-${height} mx-auto bg-[var(--main-orange)] hover:bg-[var(--main-blue)] cursor-pointer mt-1 transition-colors duration-300 ease-in-out`}
    >
      {text}
    </Button>
  );
}
