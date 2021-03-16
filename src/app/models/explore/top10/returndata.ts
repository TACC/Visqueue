interface Institution
{
    count : number,
    institution : string
};

interface Project
{
    abstract    : string,
    count       : number,
    fos         : string,
    institution : string,
    pi          : string,
    project     : string
};

export interface ReturnData
{
    institutions : Institution[],
    projects     : Project[]
};