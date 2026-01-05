import { ResponsiveLine } from "@nivo/line";
import styles from "./WorkingCapitalChart.module.scss";
import { formatMoney } from "@rt/utils/formatMoney";
import { useMemo, useState } from "react";

type ApiItem = { month: string; income: number; expense: number; net: number };

export default function WorkingCapitalChart({ items }: { items: ApiItem[] }) {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const data = useMemo(
    () => [
      { id: "Income", data: items.map((i) => ({ x: i.month, y: i.income })) },
      {
        id: "Expenses",
        data: items.map((i) => ({ x: i.month, y: i.expense })),
      },
    ],
    [items]
  );

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
          pointSize={0}
          useMesh
          onMouseMove={(p: unknown) => {
            type PointLike = {
              data?: {
                xFormatted?: string | number;
                x?: string | number;
                y?: number;
              };
              seriesId?: string;
            };
            type SliceLike = { points?: PointLike[] };

            const payloadPoint: PointLike | null =
              typeof p === "object" && p !== null && "data" in p
                ? (p as PointLike)
                : Array.isArray((p as SliceLike)?.points) &&
                    (p as SliceLike).points!.length > 0
                  ? (p as SliceLike).points![0]
                  : null;

            const rawX =
              payloadPoint?.data?.xFormatted ?? payloadPoint?.data?.x ?? null;
            const x =
              typeof rawX === "string"
                ? rawX
                : rawX != null
                  ? String(rawX)
                  : null;

            setHoveredMonth(x);
          }}
          onMouseLeave={() => setHoveredMonth(null)}
          theme={{
            text: { fill: "#667085", fontSize: 12 },
            grid: { line: { stroke: "rgba(17,24,39,0.06)" } },
            tooltip: { container: { borderRadius: 10 } },
          }}
          tooltip={({ point }) => (
            <div className={styles.tooltip}>
              <span className={styles.tooltipLabel}>
                {String(point.seriesId)}:
              </span>
              <span className={styles.tooltipValue}>
                {formatMoney(Number(point.data.y), "TRY")}
              </span>
            </div>
          )}
          layers={[
            (props) => <HighlightBand {...props} highlightX={hoveredMonth} />,
            "grid",
            "axes",
            "lines",
            "points",
            "mesh",
          ]}
        />
      </div>
    </div>
  );
}

function HighlightBand({
  xScale,
  innerHeight,
  highlightX,
}: {
  xScale: ((value: string) => number) & { domain?: () => string[] };
  innerHeight: number;
  highlightX: string | null;
}) {
  if (!highlightX || !xScale) return null;

  const x = xScale(highlightX);
  if (x == null) return null;

  const domain: string[] = xScale.domain?.() ?? [];
  const idx = domain.indexOf(highlightX);

  const prevX = idx > 0 ? xScale(domain[idx - 1]) : null;
  const nextX = idx < domain.length - 1 ? xScale(domain[idx + 1]) : null;

  const gapLeft = prevX != null ? x - prevX : null;
  const gapRight = nextX != null ? nextX - x : null;

  const paddingY = 8;
  const bandHeight = innerHeight - paddingY * 2;

  const minW = 10;
  const factor = 0.15;

  let bandX = x;
  let bandW = minW;

  if (gapLeft == null && gapRight != null) {
    bandW = Math.max(minW, gapRight * factor);
    bandX = x;
  } else if (gapRight == null && gapLeft != null) {
    bandW = Math.max(minW, gapLeft * factor);
    bandX = x - bandW;
  } else if (gapLeft != null && gapRight != null) {
    const half = Math.min(gapLeft, gapRight) / 2;
    bandW = Math.max(minW, half * 2 * factor);
    bandX = x - bandW / 2;
  }

  return (
    <g>
      <rect
        x={bandX}
        y={paddingY}
        width={bandW}
        height={bandHeight}
        rx={12}
        fill="rgba(15, 23, 42, 0.04)"
      />
    </g>
  );
}
