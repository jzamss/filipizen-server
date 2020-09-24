import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Page,
  Title,
  Panel,
  Label,
  Link,
  List,
  Spacer,
  CircularProgress,
  groupBy,
  Service,
  getNotification,
  Subtitle,
} from "rsi-react-web-components";
import FilipizenMasterTemplate from "../templates/FilipizenMasterTemplate";

const svc = Service.lookup("CloudPartnerService", "partner");
const notification = getNotification();


const PartnerListScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);

  const updatePartnerStatus = (channel, status) => {
    const idx = partners.findIndex((partner) => partner.id === channel);
    if (idx >= 0) {
      const partner = partners[idx];
      if (partner.isonline !== status) {
        partner.isonline = status;
        const updatedPartners = [...partners];
        updatedPartners[idx] = partner;
        setPartners(updatedPartners);
      }
    }
  };

  notification.register("activate", (channel) => {
    updatePartnerStatus(channel, "1");
  });

  notification.register("deactivate", function (channel) {
    updatePartnerStatus(channel, "0");
  });

  React.useEffect(() => {
    setLoading(true);
    svc.getList((err, list) => {
      if (!err) {
        setLoading(false);
        setPartners(list);
      }
    })
  }, []);

  return (
    <FilipizenMasterTemplate>
      <Page>
        <Spacer height={20} />
        <Title>Select a Partner Agency</Title>
        {loading && <CircularProgress size={20} />}
        <Spacer height={20} />
        {!loading && <PartnerList partners={partners} />}
      </Page>
    </FilipizenMasterTemplate>
  );
};

const PartnerLgu = ({ partners }) => {
  const partnerGroup = partners[0].group;
  return (
    <Panel>
      <Subtitle>{partnerGroup.title}</Subtitle>
      <List items={partners}>
        {({ item: partner }) => {
          if (partner.isonline !== "0") {
            return (
              <Link
                component={RouterLink}
                key={partner.id}
                to={{
                  pathname: `/partner/${partner.name}/services`,
                  state: { partner },
                }}
                caption={partner.title}
              />
            );
          }
          return (
            <Label key={partner.id} style={{ color: "#a9a7a7", paddingTop: 0 }}>
              {partner.title}
            </Label>
          );
        }}
      </List>
    </Panel>
  );
};

const PartnerList = (props) => {
  const { partners } = props;
  const cluster = groupBy(partners, "clusterid");
  return (
    <Panel>
      {Object.keys(cluster).map((clusterKey) => (
        <PartnerLgu key={clusterKey} partners={cluster[clusterKey]} />
      ))}
    </Panel>
  );
};

export default PartnerListScreen;
