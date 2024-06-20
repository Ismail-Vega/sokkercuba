import { memo, useState } from "react";
import Stack from "@mui/material/Stack";
import { ChartProps } from "./ChartProps";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { format, subDays, endOfWeek } from "date-fns";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { trainingSkills } from "../../constants/trainingSkills";

const ticks = Array.from(Array(19).keys());

const CustomTooltip = memo(({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dateLabel = format(
      subDays(endOfWeek(payload[0].payload.date * 1000), 2),
      "P"
    );

    return <p style={{ color: "#3f51b5" }}>{dateLabel}</p>;
  }

  return null;
});

const CustomizedLabel = memo(function CustomizedLabel(props: any) {
  const { x, y, value } = props;

  return (
    <text x={x} y={y} dy={-10} fill="#3f51b5" fontSize={14} textAnchor="middle">
      {value}
    </text>
  );
});

const CustomizedAxisTick = memo(function CustomizedAxisTick(props: any) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        fontSize={10}
        fill="#9e9e9e"
        textAnchor="end"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
});

function Chart({ data, skillName, onDataChange }: ChartProps) {
  const [skill, setSkill] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSkill(event.target.value);
  };

  return (
    <>
      <LineChart width={500} height={316} data={data} margin={{ right: 20 }}>
        <CartesianGrid />
        <XAxis interval={0} dataKey="formation" tick={<CustomizedAxisTick />} />
        <YAxis
          interval={0}
          ticks={ticks}
          tick={{ stroke: "#59CE72", strokeWidth: 1, fontSize: 10 }}
        />
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend
          iconType="circle"
          verticalAlign="top"
          height={36}
          payload={[
            {
              id: "ID01",
              type: "wye",
              color: "#3f51b5",
              value: `${skillName} - progress`,
            },
            {
              id: "ID02",
              type: "wye",
              value: "y: skills",
              color: "#59CE72",
            },
            {
              id: "ID03",
              type: "wye",
              value: "x: order",
              color: "#9e9e9e",
            },
          ]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3f51b5"
          label={<CustomizedLabel />}
        />
      </LineChart>
      <Stack
        mt={1}
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="select-standard-label">Skills</InputLabel>
          <Select
            value={skill}
            label="Skills"
            id="select-standard"
            onChange={handleChange}
            labelId="select-standard-label"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {trainingSkills.map((skill) => (
              <MenuItem value={`${skill}`}>{skill}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Pagination
          count={10}
          size="small"
          hideNextButton={data.length < 10}
          onChange={(_, page) => onDataChange(page)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
}

export default Chart;
