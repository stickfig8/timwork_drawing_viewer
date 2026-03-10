import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  text: string;
  width?: string;
  height?: string;
  onClick: () => void;
  classname?: string;
};

export default function CommonButton({
  text,
  width = "20",
  height = "8",
  onClick,
  classname = "",
}: Props) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        `w-${width} h-${height} mx-auto bg-[var(--main-orange)] hover:bg-[var(--main-blue)] cursor-pointer mt-1 transition-colors duration-300 ease-in-out`,
        classname,
      )}
    >
      {text}
    </Button>
  );
}
