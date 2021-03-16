import { Institution } from "../../institution";
import { Project } from "../../project";

export interface ResponseData 
{
    institutions : Institution[],
    projects     : Project[]
}
