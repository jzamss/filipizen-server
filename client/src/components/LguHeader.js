import React from "react";
import { Link } from "react-router-dom";
import { Panel, AppBar } from "rsi-react-web-components";

const styles = {
  container: {
    padding: "4px 50px",
  },
};

const LguHeader = (props) => {
  return (
    <AppBar>
        <Panel style={styles.container}>
          <Link to={{
            pathname: `/partner/${props.partner.name}/services`, 
            state: {partner: props.partner}
          }}>
            <Panel width={270}>{props.Logo}</Panel>
          </Link>
        </Panel>
    </AppBar>
  );
};

export default LguHeader;
