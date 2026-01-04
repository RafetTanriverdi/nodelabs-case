import { ResponsiveLine } from "@nivo/line";
import styles from "./WorkingCapitalChart.module.scss";
import { formatMoney } from "@rt/utils/formatMoney";

type ApiItem = { month: string; income: number; expense: number; net: number };

export default function WorkingCapitalChart({
  items,
  highlightMonth = "Kasım",
}: {
  items: ApiItem[];
  highlightMonth?: string;
}) {
  const data = [
    { id: "Income", data: items.map((i) => ({ x: i.month, y: i.income })) },
    { id: "Expenses", data: items.map((i) => ({ x: i.month, y: i.expense })) },
  ];

  const markers = [
    {
      axis: "x" as const,
      value: highlightMonth,
      legend: "",
      lineStyle: { display: "none" },
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Working Capital</h3>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.dotIncome} />
            Income
          </span>
          <span className={styles.legendItem}>
            <span className={styles.dotExpense} />
            Expenses
          </span>
        </div>

        <button className={styles.rangeBtn} type="button">
          Last 6 months <span className={styles.chev}>▾</span>
        </button>
      </div>

      <div className={styles.chartWrap}>
        <ResponsiveLine
          data={data}
          margin={{ top: 18, right: 20, bottom: 40, left: 44 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: "auto", stacked: false }}
          curve="monotoneX"
          enableGridX
          enableGridY={false}
          gridXValues={items.map((i) => i.month)}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 0,
            tickPadding: 14,
            tickRotation: 0,
            format: (v) => `${Number(v) / 1000}K`,
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 14,
            tickRotation: 0,
          }}
          colors={["#0E9F6E", "#B7F000"]}
          lineWidth={3}
          pointSize={8}
          pointBorderWidth={3}
          pointColor="#ffffff"
          pointBorderColor={(p) =>
            p.seriesId === "Income" ? "#0E9F6E" : "#B7F000"
          }
          useMesh
          theme={{
            text: { fill: "#667085", fontSize: 12 },
            grid: { line: { stroke: "rgba(17,24,39,0.06)" } },
            tooltip: { container: { borderRadius: 10 } },
          }}
          tooltip={({ point }) => (
            <div className={styles.tooltip}>
              {formatMoney(point.data.y, "TRY")}
            </div>
          )}
          // 👇 highlight band için custom layer
          layers={[
            (props) => <HighlightBand {...props} highlightX={highlightMonth} />,
            "grid",
            "markers",
            "axes",
            "lines",
            "points",
            "mesh",
          ]}
          markers={markers}
        />
      </div>
    </div>
  );
}

function HighlightBand({
  xScale,
  innerHeight,
  highlightX,
}: any & { highlightX: string }) {
  if (!xScale || !highlightX) return null;

  const x = xScale(highlightX);
  if (x == null) return null;

  const domain = xScale.domain?.() ?? [];
  const idx = domain.indexOf(highlightX);
  const prev = idx > 0 ? xScale(domain[idx - 1]) : null;
  const next = idx < domain.length - 1 ? xScale(domain[idx + 1]) : null;

  const half =
    prev != null && next != null
      ? Math.min((x - prev) / 2, (next - x) / 2)
      : 22;

  const bandW = Math.max(44, half * 1.15);

  return (
    <g>
      <rect
        x={x - bandW / 2}
        y={8}
        width={bandW}
        height={innerHeight - 16}
        rx={12}
        fill="rgba(15, 23, 42, 0.04)"
      />
    </g>
  );
}
