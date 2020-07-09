import React from "react";
import { Panel, AppBar } from "rsi-react-web"

const styles = {
  container: {
    padding: "4px 50px",
  }
}

const LguHeader = (props) => {
  return (
    <AppBar>
      <Panel style={styles.container}>
          <Panel width={270}>{props.Logo}</Panel>
      </Panel>
    </AppBar>
  );
}

export default LguHeader;