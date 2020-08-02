import React from "react";
import MasterTemplate from "../templates/MasterTemplate";
import FilipizenIcon from "../components/FilipizenIcon";

const Header = (props) => {
  return (
    <div style={styles.header}>
      <FilipizenIcon />
    </div>
  );
};

const Footer = (props) => {
  return (
    <div target="footer" style={styles.footer}>
      <span style={styles.footerText}>@2020  Sitemap | Privacy | Legal | Feedback</span>
    </div>
  );
};

const FilipizenMasterTemplate = ({ children, ...rest }) => {
  const showHeader = rest.showHeader === undefined ? true : rest.showHeader;
  return (
    <MasterTemplate logo={FilipizenIcon}>
      {showHeader && <Header />}
        {children}
      <Footer />
    </MasterTemplate>
  );
};

const styles = {
  header: {
    height: "50",
    backgroundColor: "#ecf0f1",
    padding: "8px 8px",
    paddingLeft: "50px",
  },
  footer: {
    padding: '8px',
    backgroundColor: '#ecf0f1',
    borderTop: '3px solid #2c3e50',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '14px',
    color: '#4d4d4d',
  }
};

export default FilipizenMasterTemplate;
