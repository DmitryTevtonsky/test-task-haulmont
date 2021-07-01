import { Launch, PreparedData } from "api/types";
import { getPreparedData } from "api";
import React, { FC, memo, useCallback, useEffect, useState } from "react";

import { Dropdown, List } from "../components";
import { filter } from "../utils/filters";

import css from "./index.module.css";

const Core: FC = () => {
  const [data, setData] = useState<PreparedData>();
  const [filteredData, setFilteredData] = useState<Launch[] | null>();
  const [rocketFilter, setRocketFilter] = useState<string | null>(null);
  const [launchSiteFilter, setLaunchSiteFilter] = useState<string | null>(null);

  useEffect(() => {
    getPreparedData().then((prepairedData) => setData(prepairedData));
  }, []);

  useEffect(() => {
    data?.launches &&
      setFilteredData(
        filter({
          launches: data.launches,
          rocketFilter,
          launchSiteFilter,
        })
      );
  }, [data, rocketFilter, launchSiteFilter]);

  const filterByLaunchSites = useCallback(
    (value: string) => setLaunchSiteFilter(value === "reset" ? null : value),
    []
  );

  const filterByRockets = useCallback(
    (value: string) => setRocketFilter(value === "reset" ? null : value),
    []
  );

  return (
    <section className={css.section}>
      <header className={css.header}>
        <h1 className={css.title}>Launches</h1>
        <div className={css.filters}>
          <Dropdown
            filterCallback={filterByLaunchSites}
            options={data?.launchSites || []}
            title="Launch Site"
          />
          <Dropdown
            filterCallback={filterByRockets}
            options={data?.rockets || []}
            title="Rocket"
          />
        </div>
      </header>
      <main className={css.main}>
        {!data?.error ? (
          <List data={filteredData || data?.launches || []} />
        ) : (
          data?.error
        )}
      </main>
    </section>
  );
};

export default memo(Core);
