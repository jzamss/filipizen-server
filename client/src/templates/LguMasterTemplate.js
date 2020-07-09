import React from "react";
import { Image } from "rsi-react-web";
import LguHeader from "../components/LguHeader";
import FilipizenIcon from "../components/FilipizenIcon";
import FilipizenMasterTemplate from "./FilipizenMasterTemplate";

//TODO:
const getLguLogo = (props) => {
  return <Image src={require("../assets/legazpi.png")} height="39px" />;
};

const LguMasterTemplate = ({ children, ...rest }) => {
  return (
    <FilipizenMasterTemplate logo={FilipizenIcon}>
      <LguHeader Logo={getLguLogo()} {...rest} />
      {children}
    </FilipizenMasterTemplate>
  );
};

export default LguMasterTemplate;
