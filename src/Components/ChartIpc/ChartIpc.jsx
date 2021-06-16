import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
import { format, parseISO, subDays, formatRelative } from "date-fns";
import { es } from 'date-fns/locale';

const data = [];
const currentTime = new Date();
const year = currentTime.getFullYear();      // 1980
const month = currentTime.getMonth();       // 31
const day = currentTime.getDay();           // 4
const hour = currentTime.getHours();         // 0
const minute = currentTime.getMinutes();       // 0
const second =currentTime.getSeconds(); 

for (let num = 30; num >= 0; num--) {
    let nu = num+1;
  data.push({
    date: subDays(new Date(year, month, day, hour+nu, minute+nu, second+nu), num).toISOString(), //.substr(0, 10)
    value: 1 + Math.random(),
  });
}

const  CustomTooltip = ({ active, payload, label }) =>  {    
    if (active) {
        console.log(payload)
      return (
        <div className="custom-tooltip">
            {/*<h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4> */}
            <h3>${payload[0].value} </h3>
            <p>{format(new Date(label), 'd MMM, yyyy', { locale: es })} </p>
        </div>
      );
    }
    return null;
}

export const ChartIpc = () => {
    return (
        <section className="chart">
            <div className="chart__container">
                <h1>Índice de Precios y Cotizaciones </h1>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                        <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00A877" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#00A877" stopOpacity={0.05} />
                        </linearGradient>
                        </defs>

                        <Area dataKey="value" stroke="#00A877" fill="url(#color)" />

                        <XAxis
                        dataKey="date"
                        //axisLine={false}
                        tickLine={false}
                        /*
                        tickFormatter={(str) => {
                            const date = parseISO(str);
                            console.log(date);
                            //if (date.getDate() % 7 === 0) {
                            return format(date, "hh:mm aaaa");
                            //}
                            //return "";
                        }}
                        */
                        tickFormatter={(str) => {
                            const date = parseISO(str);
                            return format(date, "hh:mm aaaa");
                        }}

                        />

                        <YAxis
                        type="number" domain={['dataMin', 'dataMax']}
                        datakey="value"
                        //axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        tickFormatter={(number) => `$${number.toFixed(2)}`}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <CartesianGrid opacity={0.1} vertical={false} />
                    </AreaChart>
                </ResponsiveContainer> 
            </div>           
        </section>
    )
}
