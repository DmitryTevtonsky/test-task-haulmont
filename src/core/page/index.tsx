import { Launch, PreparedData } from "api/types";
import { getPreparedData } from "api";
import React, { FC, useCallback, useEffect, useState } from "react";

import { Dropdown, List } from "../components";

import css from "./index.module.css";

const Core: FC = () => {
  const [data, setData] = useState<PreparedData>();
  const [filteredData, setFilteredData] = useState<Launch[] | null>();

  useEffect(() => {
    getPreparedData().then((prepairedData) => setData(prepairedData));
  }, []);

  const filterByLaunchSites = useCallback(
    (value: string) =>
      value === "reset"
        ? setFilteredData(null)
        : setFilteredData(
            data?.launches.filter(
              ({ launch_site }) => launch_site.site_name_long === value
            )
          ),

    [data]
  );

  const filterByRockets = useCallback(
    (value: string) =>
      value === "reset"
        ? setFilteredData(null)
        : setFilteredData(
            data?.launches.filter(({ rocket }) => rocket.rocket_name === value)
          ),
    [data]
  );

  return (
    <section className={css.section}>
      {data && (
        <>
          <header className={css.header}>
            <h1 className={css.title}>Launches</h1>
            <div className={css.filters}>
              <Dropdown
                filterCallback={filterByLaunchSites}
                options={data.launchSites}
                title="Launch Site"
              />
              <Dropdown
                filterCallback={filterByRockets}
                options={data.rockets}
                title="Rocket"
              />
            </div>
          </header>
          <main className={css.main}>
            <List data={filteredData || data.launches} />
          </main>
        </>
      )}
    </section>
  );
};

export default Core;
