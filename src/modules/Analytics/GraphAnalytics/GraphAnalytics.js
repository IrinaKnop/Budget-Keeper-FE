import React from 'react';
import PropTypes from "prop-types";
import {LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid} from 'recharts';

export default function GraphAnalytics(props) {
    const data = props.data;

    return (
        <LineChart width={600} height={430} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line connectNulls type="monotone" dataKey="income" stroke="#82ca9d" />
            <Line connectNulls type="monotone" dataKey="expense" stroke="#006666" />

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