import * as api from "../../../../api";
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts';
import PropTypes from "prop-types";
import React from "react";

const COLORS = ["#99CCCC", "#66CCCC", "#339999",
    "#669999", "#006666", "#00CCCC", "#009999",
    "#66CC99", "#33CC99", "#00CC99", "#339966",
    "#009966", "#99CC99"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
                                   cx,
                                   cy,
                                   midAngle,
                                   innerRadius,
                                   outerRadius,
                                   percent,
                                   index
                               }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.75;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill={COLORS[index % COLORS.length]}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{payload[0] ? `${payload[0].name}: ${payload[0].value.toLocaleString('ru-RU')}` : null}</p>
            </div>
        );
    }
    return null;
}

PieChart.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node
};

export default function DiagramCurrentMonth(props) {
    const data = props.data;

    return (
        <PieChart width={650} height={430}>
            <Pie
                nameKey="category"
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                fill="#006666"
                labelLine={true}
                label={renderCustomizedLabel}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend/>
        </PieChart>
    )
}

DiagramCurrentMonth.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
            category: PropTypes.string,
            value: PropTypes.number
        }
    ))
}