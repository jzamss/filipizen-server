import React from "react";
import store from "store";
import { Panel } from "rsi-react-web-components";
import { EPaymentError } from "rsi-react-filipizen-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";

const PaymentError = (props) => {
  const partner = store.get("partner");
  
  const gotoPartnerService = () => {
    props.history.replace({
      pathname: `/partner/${partner.name}/services`,
      state: { partner },
    });
  };

  return (
    <LguMasterTemplate partner={partner}>
      <Panel>
        <EPaymentError onClose={gotoPartnerService} {...props} partner={partner} />
      </Panel>
    </LguMasterTemplate>
  );
};

export default PaymentError;
