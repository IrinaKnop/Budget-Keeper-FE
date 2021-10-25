import React from 'react';
import PropTypes from "prop-types";
import {LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid} from 'recharts';

export default function GraphAnalytics(props) {
    const data = props.data;
    let dataRename = data.map(item => ({
        date: item.date,
        Доходы: item.income,
        Расходы: item.expense,
    }));

    const CustomTooltipGraph = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0] ? `${payload[0].name}: ${payload[0].value.toLocaleString('ru-RU')}` : null}</p>
                    <p className="label">{payload[1] ? `${payload[1].name}: ${payload[1].value.toLocaleString('ru-RU')}` : null}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <LineChart width={570} height={430} data={dataRename}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltipGraph />}  />
            <Legend />
            <Line connectNulls type="monotone" dataKey="Доходы" stroke="#82ca9d" />
            <Line connectNulls type="monotone" dataKey="Расходы" stroke="#006666" />

        </LineChart>
    )
}

GraphAnalytics.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        income: PropTypes.number,
        expense: PropTypes.number
        }
    ))
}