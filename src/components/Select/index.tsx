import { useState, useEffect, useRef, useCallback } from "react";
import type { MouseEventHandler } from "react";
import { OptionType, OptionProps, SelectProps } from '../../types'; 

import { options } from './options.ts';
import Arrow from '../../assets/arrow.svg'
import styles from "./styles.module.css";


const Option = (props: OptionProps) => {
  const {
    option,
    onClick
  } = props;

  const { value, title } = option;

  const handleClick = (
    value: OptionType
  ): MouseEventHandler<HTMLElement> => () => {
    onClick(value);
  };

  return (
    <li
      className={styles.option}
      value={value}
      onClick={handleClick(option)}
      role="option"
    >
      {title}
      <img className={styles.option__arrow} src={Arrow} />
    </li>
  );
};

const Select = (props: SelectProps) => {
  const {
    selected,
    onChange,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if(options[0]) onChange(options[0]);
  }, [onChange])

  const handleChooseOption = useCallback((value: OptionType) => {
    setIsOpen(false);
    onChange(value);
  }, [onChange]);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={styles.select}
      ref={rootRef}
      role="select"
    >
      <button
        className={styles.control}
        onClick={handleOpen}
      >
        {selected?.title}
      </button>

      {isOpen && (
        <ul className={styles.list} role="option list">
          {options.map((option) => (
            <Option
              key={option.value}
              option={option}
              onClick={handleChooseOption}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
