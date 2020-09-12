import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import { Content, Service } from "rsi-react-web-components";
import { EPaymentSuccess  } from "rsi-react-filipizen-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";


const PaymentSuccess = (props) => {
  const [partner, setPartner] = useState({});
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
      <Content center>
        <EPaymentSuccess onClose={gotoPartnerService} />
      </Content>
    </LguMasterTemplate>
  );
};

export default PaymentSuccess;
