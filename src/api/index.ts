import { Launch, PreparedData } from "./types";

export const getPreparedData = async (): Promise<PreparedData> => {
  const response = await fetch("https://api.spacexdata.com/v3/launches");

  if (response.ok) {
    const data: any[] = await response.json();
    // console.log("INITIAL: ", launches);

    const launches: Launch[] = data.map(
      ({
        links,
        mission_name,
        launch_date_local,
        details,
        upcoming,
        launch_site,
        rocket,
        flight_number,
      }) => ({
        flight_number,
        mission_patch_small: links.mission_patch_small,
        mission_name,
        launch_date_local,
        details,
        upcoming,
        launch_site: {
          site_id: launch_site.site_id,
          site_name: launch_site.site_name,
          site_name_long: launch_site.site_name_long,
        },
        rocket: {
          rocket_id: rocket.rocket_id,
          rocket_name: rocket.rocket_name,
        },
      })
    );

    const rockets = [
      ...new Set(launches.map(({ rocket }) => rocket.rocket_name)),
    ];

    const launchSites = [
      ...new Set(launches.map(({ launch_site }) => launch_site.site_name_long)),
    ];

    return { launches, rockets, launchSites };
  }

  return { launches: [], rockets: [], launchSites: [], error: "Error!" };
};
