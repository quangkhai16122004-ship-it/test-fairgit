import React from "react";

type Props = {
  title: string;
  value: number;
  subtitle?: string;
};

export function SummaryCard({ title, value, subtitle }: Props) {
  return (
    <div className="card">
      <div style={{ fontSize: 12, color: "#556" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>{value}</div>
      {subtitle ? <div style={{ fontSize: 12, color: "#667", marginTop: 8 }}>{subtitle}</div> : null}
    </div>
  );
}
