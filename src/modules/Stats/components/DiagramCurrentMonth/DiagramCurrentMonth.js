import * as api from "../../../../api";
import { PieChart, Pie } from 'recharts';

export default function DiagramCurrentMonth(props) {
    const data1 = [
        {
            "category": "Коммунальные платежи",
            "value": 5000,
            "percentage": 100.0
        },
        {
            "category": "Красота / уход",
            "value": 100,
            "percentage": 100.0
        },
        {
            "category": "Домашние животные",
            "value": 5555,
            "percentage": 100.0
        },
        {
            "category": "Автомобиль",
            "value": 1000,
            "percentage": 100.0
        },
        {
            "category": "Здоровье / медицина",
            "value": 1000,
            "percentage": 100.0
        },
        {
            "category": "Бытовые нужды",
            "value": 399,
            "percentage": 100.0
        },
        {
            "category": "Еда / продукты",
            "value": 2426.50,
            "percentage": 11.0
        },
        {
            "category": "Другое",
            "value": 1000,
            "percentage": 100.0
        },
        {
            "category": "Техника",
            "value": 7000,
            "percentage": 100.0
        }
    ];

    return (
        <PieChart width={500} height={500}>
            <Pie data={data1} dataKey="value" nameKey="value" cx="50%" cy="50%" innerRadius={90} outerRadius={120} fill="#82ca9d" label />
        </PieChart>
    )
}