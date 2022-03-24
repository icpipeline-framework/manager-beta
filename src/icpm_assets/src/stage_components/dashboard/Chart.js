import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../../components/Title';
import AltRouteIcon from '@mui/icons-material/AltRoute';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('10/5', 3),
  createData('10/6', 4),
  createData('10/7', 3),
  createData('10/8', 6),
  createData('10/9', 7),
  createData('10/10', 1),
  createData('10/11', 2),
  createData('10/12', 5),
  createData('10/13', 2),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title><AltRouteIcon sx={{mr:1}}/>Deployments by day</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Deployments
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
