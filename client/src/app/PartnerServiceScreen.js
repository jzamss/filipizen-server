import React from "react";
import { useLocation } from "react-router-dom";
import { Content, Panel, Title, Spacer } from "rsi-react-web";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import * as modules from "./modules";

const getServiceComponent = (service) => {
  return modules[service.component];
};

const PartnerServiceService = (props) => {
  const { partner, service } = useLocation().state;
  const ModuleComponent = getServiceComponent(service);

  return (
    <LguMasterTemplate partner={partner}>
      <Content center>
        <Panel>
          <Spacer />
          <Title>{service.title}</Title>
          <ModuleComponent {...props} partner={partner} service={service} />
        </Panel>
      </Content>
    </LguMasterTemplate>
  );
};

export default PartnerServiceService;
