import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGetStatsQuery } from "@/app/jobs.api";
import { ReactComponent as Spinner } from "@/assets/spinner.svg";

import s from "./stats.module.scss";

const Stats = () => {
  const { data: stats, isLoading } = useGetStatsQuery();

  const data = [
    {
      count: stats?.stats.pending || 0,
      title: "pending applications",
      icon: <FaSuitcaseRolling />,
      color: "hsl(42, 78%, 60%)",
      bg: "hsl(45, 90%, 88%)",
    },
    {
      count: stats?.stats.interview || 0,
      title: "interviews scheduled",
      icon: <FaCalendarCheck />,
      color: "hsl(227, 50%, 59%)",
      bg: "hsl(221, 68%, 93%)",
    },
    {
      count: stats?.stats.declined || 0,
      title: "jobs declined",
      icon: <FaBug />,
      color: "hsl(0, 57%, 63%)",
      bg: "hsl(0, 100%, 97%)",
    },
  ];

  const statsData = () => {
    if (stats && stats.monthlyApplications.length > 0) {
      return stats.monthlyApplications;
    }
    const currentDate = new Date(Date.now()).toLocaleString("en-EN", {
      year: "numeric",
      month: "short",
    });
    return [{ date: currentDate, count: 0 }];
  };

  return (
    <section className={s.container}>
      <section className={s.cards}>
        {data.map((el, id) => (
          <article
            key={id}
            className={s.card}
            style={{ borderColor: el.color }}
          >
            <header>
              <span className={s.count} style={{ color: el.color }}>
                {isLoading ? <Spinner style={{ color: el.color }} /> : el.count}
              </span>
              <span
                className={s.icon}
                style={{ color: el.color, background: el.bg }}
              >
                {el.icon}
              </span>
            </header>
            <h5 data-h5>{el.title}</h5>
          </article>
        ))}
      </section>
      <section className={s.chart}>
        <header>
          <h4 data-h4>Monthly applications</h4>
          <p>Job applications in last 12 months</p>
        </header>
        {isLoading ? (
          <Spinner
            style={{
              fontSize: "3rem",
              color: "hsl(209, 23%, 60%)",
            }}
          />
        ) : (
          <div className={s.cwrapper}>
            <ResponsiveContainer height={300}>
              <LineChart data={statsData()}>
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(185, 62%, 45%)"
                />
                <CartesianGrid
                  stroke="hsl(210, 31%, 85%)"
                  strokeDasharray="5 5"
                />
                <XAxis
                  stroke="hsl(211, 27%, 70%)"
                  dataKey="date"
                  tickMargin={10}
                />
                <YAxis stroke="hsl(211, 27%, 70%)" allowDecimals={false} />
                <Tooltip
                  wrapperStyle={{ outline: "none" }}
                  contentStyle={{
                    fontSize: ".75rem",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </section>
  );
};
export default Stats;
