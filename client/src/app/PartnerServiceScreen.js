import React from "react";
import { useLocation } from "react-router-dom";
import { Content, Panel, Title, Spacer } from "rsi-react-web-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import * as modules from "../modules";

const getServiceComponent = (service) => {
  return modules[service.component];
};

const getPartnerServiceInfo = (location) => {
  if (location && location.state) {
    return location.state;
  } 
  
  const tokens = location.pathname.split("/");
  const [_, __,  partnerId, moduleName, serviceName] = tokens;
  const partner = modules.getPartners().find(p => p.objid === partnerId)
  const module = partner.modules.find(m => m.name === moduleName);
  const service = module.services.find(s => s.name === serviceName);
  return {partner, module, service};
}


const PartnerServiceScreen = (props) => {
  const location = useLocation();
  const {partner, service, ...rest} = getPartnerServiceInfo(location);
  const ServiceComponent = getServiceComponent(service);

  return (
    <LguMasterTemplate partner={partner}>
      {/*
      <Title>{service.title}</Title>
     */}
        <ServiceComponent {...props} partner={partner} service={service} {...rest}/>
    </LguMasterTemplate>
  );
};

export default PartnerServiceScreen;
