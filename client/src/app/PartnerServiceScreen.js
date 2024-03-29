import React from "react";
import { useLocation } from "react-router-dom";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import * as modules from "../modules";

const getServiceComponent = (service) => {
  return modules[service.component];
};

const getPartnerServiceInfo = (location) => {
  if (location && location.state) {
    return location.state;
  } 
  return {};
}

const PartnerServiceScreen = (props) => {
  const location = useLocation();
  const {partner, module, service, ...rest} = getPartnerServiceInfo(location);
  
  if (!service)  return null;
  const ServiceComponent =  getServiceComponent(service);

  return (
    <LguMasterTemplate partner={partner}>
      <ServiceComponent {...props} partner={partner} service={service} {...rest}/>
    </LguMasterTemplate>
  );
};

export default PartnerServiceScreen;
