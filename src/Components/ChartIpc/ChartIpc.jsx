import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIpcList } from '../../stateManagement/actions/ipcActions';
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";
import { format } from "date-fns";
import { es, enUS } from 'date-fns/locale';
import { Loading } from '../Common/Loading';

const  CustomTooltip = ({ active, payload, label }) =>  {    
    if (active) {
      return (
        <div className="custom-tooltip">
            <h3>${payload[0].value} </h3>
            <p>{format(new Date(label), 'd MMM, yyyy', { locale: enUS })} </p>
        </div>
      );
    }
    return null;
}


export const ChartIpc = () => {
    
    const dispatch = useDispatch();
    const ipcListState = useSelector(state => state.IpcList);
    const { loading, data } = ipcListState;
    
    useEffect(() => {
        dispatch(getIpcList());
    }, []) 

    return (
        <section className="chart">
            {
                 loading ? <Loading /> :
            <div className="chart__container">
                <h2>Prices and Quotations Index</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={ data }>
                        <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00A877" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#00A877" stopOpacity={0.05} />
                        </linearGradient>
                        </defs>

                        <Area dataKey="price" stroke="#00A877" fill="url(#color)" />

                        <XAxis
                            dataKey="date"
                            tickLine={false}               
                            tickFormatter={ (str) => {
                                const strDate = new Date(str);
                                return format(strDate, "hh:mm aaaa");
                            }}
                        />

                        <YAxis
                        type="number" domain={['dataMin', 'dataMax']}
                        datakey="price"
                        tickLine={false}
                        tickCount={8}
                        tickFormatter={(number) => {
                            const price = number.toLocaleString(
                                'es-MX',
                                {
                                    style: 'currency',
                                    currency: 'MXN'

                                }
                            )
                            return price;
                        }}
                        width={80}
                        allowDecimals={false}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <CartesianGrid opacity={0.1} vertical={false} />
                    </AreaChart>
                </ResponsiveContainer> 
            </div> 
            }          
        </section>
    )
}
