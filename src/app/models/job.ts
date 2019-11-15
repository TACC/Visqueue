import { Project } from 'src/app/models/project';

export interface Job {

    name      : string;
    starttime : Date;
    endtime   : Date;
    duration  : number;
    nodes     : number;
    project   : Project;
    queue     : string;
}
