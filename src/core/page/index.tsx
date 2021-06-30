import { PreparedData } from "api/types";
import { getPreparedData } from "api";
import React, { FC, useEffect, useState } from "react";

import { Dropdown, List } from "../components";

import css from "./index.module.css";

const Core: FC = () => {
  const [data, setData] = useState<PreparedData>();

  useEffect(() => {
    getPreparedData().then((prepairedData) => setData(prepairedData));
  }, []);

  return (
    <main className={css.main}>
      {data && (
        <>
          <Dropdown options={data.launchSites} />
          <Dropdown options={data.rockets} />
          <List data={data.launches} />
        </>
      )}
    </main>
  );
};

export default Core;
