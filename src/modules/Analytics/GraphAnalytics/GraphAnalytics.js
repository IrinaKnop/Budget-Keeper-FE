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
    console.log(dataRename);

    return (
        <LineChart width={600} height={430} data={dataRename}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
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