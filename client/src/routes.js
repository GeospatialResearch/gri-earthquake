import Map from "@/components/Map";
import DataTable from "@/components/DataTable";
import Plots from "@/components/Plots";
import About from "@/components/About";

export default [
  {
    path: '/',
    name: 'Map',
    component: Map,
    alias: '/map',
  },
  {
    path: '/table',
    name: 'DataTable',
    component: DataTable,
  },
  {
    path: '/plots',
    name: 'Plots',
    component: Plots,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];