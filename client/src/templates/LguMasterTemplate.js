import React from "react";
import { Image } from "rsi-react-web-components";
import LguHeader from "../components/LguHeader";
import FilipizenIcon from "../components/FilipizenIcon";
import FilipizenMasterTemplate from "./FilipizenMasterTemplate";

const getLguLogo = (partner) => {
  return (
      <Image style={{maxWidth: 60, width: "auto", height: "auto"}} src={`/assets/${partner.name}.png`} height="30px" />
  );
};

const LguMasterTemplate = ({ children, ...rest }) => {
  return (
    <FilipizenMasterTemplate logo={FilipizenIcon}>
      <LguHeader Logo={getLguLogo(rest.partner)} {...rest} />
      {children}
    </FilipizenMasterTemplate>
  );
};

export default LguMasterTemplate;
