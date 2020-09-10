import React from "react";
import { useParams } from "react-router-dom";
import { Page, Title, Panel, List, Link, Spacer, Subtitle } from "rsi-react-web-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";

import { getModules } from "../modules";

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

const PartnerServiceList = (props) => {
  const { modules, onSelect } = props;
  return (
    <React.Fragment>
      {modules.map((module) => {
        return (
          <Panel key={module.name}>
            <Subtitle>{module.title}</Subtitle>
            <List items={module.services} style={styles.list}>
              {({ item: service }) => (
                <Link key={service.name} component="button" onClick={() => onSelect(module, service)}>
                  {service.title}
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
  const modules = getModules(partner)

  const onSelectService = (module, service) => {
    props.history.push({
      pathname: `/partner/${partner.name}/${module.name}/${service.name}`,
      state: { partner, module, service, },
    });
  };

  return (
    <LguMasterTemplate partner={partner} location={props.location} history={props.history}>
      <Page>
        <Spacer height={20} />
        <Title>Select Transaction</Title>
        <Spacer height={20} />
        <PartnerServiceList modules={modules} onSelect={onSelectService} />
      </Page>
    </LguMasterTemplate>
  );
};

export default PartnerScreen;
