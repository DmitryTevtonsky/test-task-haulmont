import { Launch } from "api/types";
import React, { FC } from "react";

import css from "./index.module.css";

interface ListProps {
  data: Launch[];
}

const List: FC<ListProps> = ({ data }: ListProps) => {
  return (
    <ul className={css.list}>
      {data?.map(
        ({
          flight_number,
          mission_patch_small,
          mission_name,
          launch_date_local,
          details,
          upcoming,
        }) => (
          <li
            key={`${flight_number}-${launch_date_local}`}
            className={css.item}
          >
            <img
              alt={`Mission patch "${mission_name}"`}
              className={css.itemImage}
              src={mission_patch_small}
            />

            <div className={css.itemInfo}>
              <div className={css.itemHeader}>
                <h3 className={css.itemTitle}>{mission_name}</h3>
                <h3 className={css.itemExtra}>
                  {new Date(launch_date_local).toLocaleDateString()}
                </h3>
              </div>
              <div className={css.itemDescription}>
                {upcoming ? "Upcoming" : details}
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default List;
