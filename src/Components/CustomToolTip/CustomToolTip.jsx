
import { format } from "date-fns";
import { enUS } from 'date-fns/locale';

export const  CustomTooltip = ({ active, payload, label }) =>  {    
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