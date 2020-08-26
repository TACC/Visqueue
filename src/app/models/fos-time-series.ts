import { TimeSeries } from './time-series';

export interface FosTimeSeries 
{
    name   :  string,
    abbrev : string,
    data   : [ TimeSeries ]
}
