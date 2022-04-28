// Dashboard React layouts
import Profile from "./layouts/profile/index"
import MyCleaning from "./layouts/myCleaning/index";
import Services from "./layouts/services/index";
import ToOrder from "./layouts/toOrder/index";

// icons
import DeleteIcon from '@mui/icons-material/Delete';
// <SvgIcon {...props}>
//     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
// </SvgIcon>

const routes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <DeleteIcon sx={{ fontSize: 40 }} />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "MyCleaning",
    key: "myCleaning",
    route: "/myCleaning",
    icon: <DeleteIcon sx={{ fontSize: 40 }} />,
    component: MyCleaning,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Services",
    key: "services",
    route: "/services",
    icon: <DeleteIcon sx={{ fontSize: 40 }} />,
    component: Services,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ToOrder",
    key: "toOrder",
    route: "/toOrder",
    icon: <DeleteIcon sx={{ fontSize: 40 }} />,
    component: ToOrder,
    noCollapse: true,
  },
];

export default routes;
