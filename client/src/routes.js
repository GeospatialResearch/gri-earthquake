import MapPage from "@/pages/MapPage";
import DataTablePage from "@/pages/DataTablePage";
import PlotsPage from "@/pages/PlotsPage";
import AboutPage from "@/pages/AboutPage";

export default [
  {
    path: '/',
    name: 'Map',
    component: MapPage
  },
  {
    path: '/table',
    name: 'DataTable',
    component: DataTablePage,
  },
  {
    path: '/plots',
    name: 'Plots',
    component: PlotsPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '*',
    redirect: '/'
  }
];