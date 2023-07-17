export interface EventItem {
  id: string;
  date: string;
  slug: string;
  title: string;
  description: string;
  images: {
    mobile: string;
    tablet_port: string;
    tablet_land: string;
    desktop: string;
  };
}
