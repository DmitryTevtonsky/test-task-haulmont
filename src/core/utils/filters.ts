import { Launch } from "api/types";

interface FilterParams {
  launches: Launch[];
  rocketFilter: string | null;
  launchSiteFilter: string | null;
}
export const filter = ({
  launches,
  rocketFilter,
  launchSiteFilter,
}: FilterParams): Launch[] => {
  /**
   * Вынес отдельно функцию фильтрации.
   * Кажется, что можно что-то еще отрефачить, но уже глаз замылен)
   */
  if (rocketFilter && !launchSiteFilter) {
    return launches.filter(({ rocket }) => rocket.rocket_name === rocketFilter);
  }
  if (!rocketFilter && launchSiteFilter) {
    return launches.filter(
      ({ launch_site }) => launch_site.site_name_long === launchSiteFilter
    );
  }
  if (rocketFilter && launchSiteFilter) {
    return launches.filter(
      ({ launch_site, rocket }) =>
        launch_site.site_name_long === launchSiteFilter &&
        rocket.rocket_name === rocketFilter
    );
  }
  return launches;
};
