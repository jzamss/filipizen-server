import React from "react";
import { Link } from "react-router-dom";
import { Panel, AppBar } from "rsi-react-web-components";

const styles = {
  container: {
    padding: "4px 50px",
  },
  title: {
    color: "#ddd",
    paddingLeft: 5,
  }
};

const LguHeader = ({partner, Logo}) => {
  return (
    <AppBar>
        <Panel style={styles.container}>
          <Link to={{
            pathname: `/partner/${partner.name}/services`, 
            state: {partner: partner}
          }}>
            <Panel row>
              <div>{Logo}</div>
              <span style={styles.title}>{partner.title}</span>
            </Panel>
          </Link>
        </Panel>
    </AppBar>
  );
};


export default LguHeader;
