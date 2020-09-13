import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import { Panel, Service } from "rsi-react-web-components";
import { EPaymentError } from "rsi-react-filipizen-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";

const PaymentError = (props) => {
  const [partner, setPartner] = useState();
  const [error, setError] = useState();
  const params = queryString.parse(props.location.search);

  useEffect(() => {
    const loadPartner = async () => {
      const partnerSvc = await Service.lookupAsync("CloudPartnerService", "partner");
      return await partnerSvc.findById({ id: params.orgcode });
    };

    loadPartner()
      .then(setPartner)
      .catch((err) => setError(err.toString()));
  }, []);

  const gotoPartnerService = () => {
    props.history.replace({
      pathname: `/partner/${partner.name}/services`,
      state: { partner },
    });
  };

  return (
    <LguMasterTemplate partner={partner}>
      <Panel>
        <EPaymentError onClose={gotoPartnerService} {...props} />
      </Panel>
    </LguMasterTemplate>
  );
};

export default PaymentError;
