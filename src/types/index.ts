export type OptionType = {
    title: string;
    value: number;
};

export type OptionProps = {
  option: OptionType;
  onClick: (value: OptionType) => void;
};

export type SelectProps = {
  selected: OptionType | null;
  onChange: (selected: OptionType) => void;
};