import HomeScreen from "./app/HomeScreen";
import PartnerListScreen from "./app/PartnerListScreen";
import PartnerScreen from "./app/PartnerScreen";
import PartnerServiceScreen from "./app/PartnerServiceScreen";
import PaymentSuccess from "./app/PaymentSuccess";
import PaymentError from "./app/PaymentError";

export default [
  { name: "home", exact: true, path: "/", component: HomeScreen },
  { name: "partners", path: "/partners", component: PartnerListScreen },
  {
    name: "services",
    path: "/partner/:partnerId/services",
    component: PartnerScreen,
  },
  {
    name: "service",
    path: "/partner/:partnerId/:module/:service",
    component: PartnerServiceScreen,
  },
  {
    name: "success",
    path: "/payoptions/success",
    component: PaymentSuccess,
  },
  {
    name: "error",
    path: "/payoptions/error",
    component: PaymentError,
  }  
];
