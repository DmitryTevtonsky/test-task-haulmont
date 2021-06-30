export type LaunchSite = {
  site_id: string;
  site_name: string;
  site_name_long: string;
};

export type Rocket = {
  rocket_id: string;
  rocket_name: string;
};

export type Launch = {
  flight_number: number;
  mission_patch_small: string;
  mission_name: string;
  launch_date_local: string;
  details: string;
  upcoming: boolean;
  launch_site: LaunchSite;
  rocket: Rocket;
};

export type PreparedData = {
  launches: Launch[];
  rockets: string[];
  launchSites: string[];
  error?: string;
};
