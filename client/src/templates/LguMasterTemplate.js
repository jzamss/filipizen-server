import React from "react";
import { Image, Link} from "rsi-react-web-components";
import LguHeader from "../components/LguHeader";
import FilipizenIcon from "../components/FilipizenIcon";
import FilipizenMasterTemplate from "./FilipizenMasterTemplate";

const getLguLogo = (partner) => {
  return (
    <Link to={`/partner/${partner?.name}/services`}>
      <Image src={`/assets/${partner.name}.png`}height="39px" />
    </Link>
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
