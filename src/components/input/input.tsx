import { FC } from "react";

type InputProps = {
  className?: string | undefined;
  onChange?: (e: any) => void;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
};

export const Input: FC<InputProps> = (props) => {
  const { onChange, className, placeholder, value } = props;
  return (
    <input
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      value={value}
    />
  );
};
