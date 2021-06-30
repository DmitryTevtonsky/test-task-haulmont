/* eslint-disable jsx-a11y/no-onchange */
import React, { FC, useRef } from "react";

import css from "./index.module.css";

interface DropdownProps {
  title: string;
  options: string[];
  filterCallback: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  title,
  options,
  filterCallback,
}: DropdownProps) => {
  const selectElement = useRef<HTMLSelectElement>(null);

  const handleOnSelect = () => {
    if (selectElement?.current) {
      const { value } =
        selectElement.current.options[selectElement.current.selectedIndex];
      filterCallback(value);
    }
  };

  return (
    <div className={css.drowdown}>
      <h3 className={css.drowdownTitle}>{title}</h3>
      <select
        ref={selectElement}
        className={css.drowdownSelect}
        onChange={handleOnSelect}
      >
        <option key="all" value="reset">
          Все варианты
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
