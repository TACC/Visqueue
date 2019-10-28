import { Project } from 'src/app/models/project';

export interface Job {

    starttime : Date;
    endtime   : Date;
    duration  : number;
    nodes     : number;
    project   : Project;
    queue     : string;
}
