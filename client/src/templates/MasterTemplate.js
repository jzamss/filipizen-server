import React from "react";
import "./MasterTemplate.css";
import { Card } from "rsi-react-web-components"

const getChildren = ({ children }) => {
  const comps = {
    header: null,
    left: null,
    center: null,
    right: null,
    footer: null,
  };
  React.Children.forEach(children, (child) => {
    if (child) {
      let target = child.props.target || "center";
      const childType =
        typeof child.type === "string" ? child.type : child.type.name;
        console.log("childType", childType)
      
      if (/header/i.test(childType)) target = "header";
      else if (/footer/i.test(childType)) target = "footer";
      if (!comps[target]) comps[target] = [];
      comps[target].push(child);
    }
  });
  return comps;
};

const MasterTemplate = (props) => {
  const { header, left, center, right, footer } = getChildren(props);
  return (
    <div className="template">
      <div className="row header">{header}</div>
      <div className="content">
        <div className="panel">
          <aside className="aside aside-left">{left}</aside>
          <div className="main">
          <Card>
          {center}
          </Card>
          </div>
          <aside className="aside aside-right">{right}</aside>
        </div>
      </div>
      <div className="row footer">{footer}</div>
    </div>
  );
};

export default MasterTemplate;
