import React from "react";
import { Page, Label, Spacer, Panel, Button } from "rsi-react-web-components";

import FilipizenIcon from "../components/FilipizenIcon";
import FilipizenMasterTemplate from "../templates/FilipizenMasterTemplate";

const HomeScreen = (props) => {
  const startHandler = () => {
    props.history.push("/partners");
  };

  return (
    <FilipizenMasterTemplate showHeader={false}>
      <Page>
        <Spacer height={60} />
        <FilipizenIcon width={200} />
        <Spacer height={30} />
        <Label labelStyle={{ fontSize: 42, fontWeight: "bold" }}>
          Experience ease of doing business with the government
        </Label>
        <Label labelStyle={{ fontSize: 20 }}>
          Over 50 local government units participating all over the Philippines.
        </Label>
        <Spacer height={40} />
        <Panel style={styles.actions}>
          <Button
            style={{ paddingLeft: 50, paddingRight: 50 }}
            caption="Start Here"
            size="large"
            onClick={startHandler}
          />
        </Panel>
      </Page>
    </FilipizenMasterTemplate>
  );
};

const styles = {
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
}

export default HomeScreen;
