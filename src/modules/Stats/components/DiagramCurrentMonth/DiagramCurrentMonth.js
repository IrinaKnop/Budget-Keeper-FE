import * as api from "../../../../api";
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts';
import PropTypes from "prop-types";

const COLORS = ["#99CCCC", "#66CCCC", "#339999",
    "#669999", "#006666", "#00CCCC", "#009999",
    "#66CC99", "#33CC99", "#00CC99", "#339966",
    "#009966", "#99CC99"];

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
                fill="#82ca9d"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip/>
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