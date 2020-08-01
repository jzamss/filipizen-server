import React from "react";
import { useParams } from "react-router-dom";
import { Title, Panel, List, Link, Spacer, Subtitle } from "rsi-react-web-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";

import { getPartners } from "../modules";

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

const PartnerServiceList = (props) => {
  const { services, onSelect } = props;
  return (
    <React.Fragment>
      {services.modules.map((module) => {
        return (
          <Panel key={module.name}>
            <Subtitle>{module.title}</Subtitle>
            <List items={module.services} style={styles.list}>
              {({ item }) => (
                <Link key={item.name} component="button" onClick={() => onSelect(module, item)}>
                  {item.title}
                </Link>
              )}
            </List>
          </Panel>
        );
      })}
    </React.Fragment>
  );
};

const PartnerScreen = (props) => {
  const { partnerId } = useParams();
  const { partner } = props.location.state;
  const services = getPartners().find(
    (item) => item.objid === partnerId
  );

  const onSelectService = (module, service) => {
    props.history.push({
      pathname: `/partner/${partner.name}/${module.name}/${service.name}`,
      state: {
        partner,
        service,
      },
    });
  };

  return (
    <LguMasterTemplate partner={partner}>
      <Panel>
        <Spacer height={20} />
        <Title>Select Transaction</Title>
        <Spacer height={20} />
        <PartnerServiceList services={services} onSelect={onSelectService} />
      </Panel>
    </LguMasterTemplate>
  );
};

export default PartnerScreen;
