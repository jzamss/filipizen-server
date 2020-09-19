import React from "react";
import store from "store";
import { Content } from "rsi-react-web-components";
import { EPaymentSuccess  } from "rsi-react-filipizen-components";
import LguMasterTemplate from "../templates/LguMasterTemplate";


const PaymentSuccess = (props) => {
  const partner = store.get("partner");

  const gotoPartnerService = () => {
    props.history.replace({
      pathname: `/partner/${partner.name}/services`,
      state: { partner },
    });
  };

  return (
    <LguMasterTemplate partner={partner}>
      <Content center>
        <EPaymentSuccess onClose={gotoPartnerService} {...props} />
      </Content>
    </LguMasterTemplate>
  );
};

export default PaymentSuccess;
