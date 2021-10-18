import React from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';

// Read: https://recharts.org/en-US/guide/getting-started - Fast start guide
// https://recharts.org/en-US/api - Full guide
export default function DiagramExampleComponent(props) {
    const data = [

        {
            month: 'Jul',
            expenses: 5330,
        },

        {
            month: 'Aug',
            expenses: 4500,
        },

        {
            month: 'Sep',
            expenses: 3400,
        },

        {
            month: 'Oct',
            expenses: 8200,
        },
    ];

    return (
        <LineChart width={200} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
        </LineChart>
    );
}