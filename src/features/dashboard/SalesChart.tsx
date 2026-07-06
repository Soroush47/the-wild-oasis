import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { BookingType } from "../../types";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

interface SalesChartProps {
    bookings: BookingType[];
    numDays: number;
}

function SalesChart({ bookings, numDays }: SalesChartProps) {
    const { isDarkMode } = useDarkMode();
    const isTablet = useMediaQuery("(max-width: 768px)");

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });

    const data = allDates.map(date => ({
        label: format(date, "MMM dd"),
        totalSales: bookings
            .filter(booking => isSameDay(date, new Date(booking.createdAt)))
            .reduce((acc, cur) => acc + cur.totalPrice, 0),
        extrasSales: bookings
            .filter(booking => isSameDay(date, new Date(booking.createdAt)))
            .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    }));

    const colors = isDarkMode
        ? {
              totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
              extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212fb3",
              boxShadow: "#000000e8",
          }
        : {
              totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#ffffff8c",
              boxShadow: "#827d7d80",
          };
    return (
        <StyledSalesChart>
            <Heading as="h2">
                {isTablet
                    ? "Sales"
                    : `Sales from ${format(allDates[0], "MMM dd yyyy")} - ${format(allDates[allDates.length - 1], "MMM dd yyyy")}`}
            </Heading>
            <ResponsiveContainer height={300} width="100%" style={{ padding: "2.4rem" }}>
                <AreaChart data={data}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                        minTickGap={20}
                    />
                    <YAxis
                        unit="$"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                        width={80}
                    />
                    <CartesianGrid strokeDasharray="4" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: colors.background,
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: `0px 0px 10px 0px ${colors.boxShadow}`,
                        }}
                    />
                    <Area
                        dataKey="totalSales"
                        type="monotone"
                        stroke={colors.totalSales.stroke}
                        fill={colors.totalSales.fill}
                        strokeWidth={2}
                        name="Total Sales"
                        unit="$"
                    />
                    <Area
                        dataKey="extrasSales"
                        type="monotone"
                        stroke={colors.extrasSales.stroke}
                        fill={colors.extrasSales.fill}
                        strokeWidth={2}
                        name="Extras Sales"
                        unit="$"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

export default SalesChart;
