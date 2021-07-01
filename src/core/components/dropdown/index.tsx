/* eslint-disable jsx-a11y/no-onchange */
import React, { FC, memo, useRef } from "react";

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
        {
          // Хотел не указывать value для дефолтного option,
          // но если не указать, то value становится равным "Все варианты".
          // Поэтому решил добавить value="reset" и далее работать с ним.
        }
        <option key="all" value="reset">
          All
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

/**
 * Memo для избегания ненужных перерендеров.
 * Таким образом Dropdown рендерится только 1 раз.
 */
export default memo(Dropdown);
