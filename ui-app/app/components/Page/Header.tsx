import React from "react";

export default function PageHeader(props: {
  renderTitle?: () => React.ReactElement;
  renderSubtitle?: () => React.ReactElement;
}) {
  return (
    <div className="mb-4 pb-4 border-b-2 border-b-slate-400">
      <h2 className="page-title">{props.renderTitle?.()}</h2>
      <h4 className="page-subtitle">{props.renderSubtitle?.()}</h4>
    </div>
  );
}
