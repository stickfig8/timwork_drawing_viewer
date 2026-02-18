import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ALL } from "@/configs/configs";

type Props = {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  disabled?: boolean;
  isOptionDisabled?: (option: string) => boolean;
};

export default function SearchSelectBox({
  label,
  value,
  options,
  onChange,
  disabled,
  isOptionDisabled,
}: Props) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent position="popper" className="z-[9999]">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          <SelectItem value={ALL}>전체</SelectItem>

          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              disabled={isOptionDisabled?.(option)}
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
