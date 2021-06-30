/* eslint-disable jsx-a11y/no-onchange */
import React, { FC, useRef } from "react";

import css from "./index.module.css";

interface DropdownProps {
  options: string[];
}

const Dropdown: FC<DropdownProps> = ({ options }: DropdownProps) => {
  const selectElement = useRef<HTMLSelectElement>(null);

  const handleOnSelect = () => {
    if (selectElement?.current) {
      const selectedOption =
        selectElement.current.options[selectElement.current.selectedIndex];
      console.log(`The selected option is ${selectedOption.value}`);
    }
  };

  return (
    <select ref={selectElement} onChange={handleOnSelect}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
