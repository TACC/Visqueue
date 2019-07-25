#!/usr/bin/env python
import urllib
import csv
import json


def gatherQueryInfo():
    DEBUG = True
    # queue URL for Stampede
    queueURLStampede    = 'https://portal.tacc.utexas.edu/commnq/stampede2.tacc.utexas.edu/queue.json'

    if (DEBUG):
        print ('retrieving data for stampede...')

    # grabbing data for Stampede and saving into data array
    response   = urllib.urlopen( queueURLStampede )
    data       = json.loads( response.read() )

    if (DEBUG):
        print ('done...')
        print ("parsing data...")

    # Maps each institution to the project_IDs associated with them
    # Output in institution_job_mappings.csv
    project_IDs = []

    results = []

    # Maps each project_ID to the abstract, and the number of cores it is utilizing
    # Output in running_job_attributes.csv
    pid_mappings = []

    # loop through running jobs first
    for job in data['running']:
        # create job dictionary object which will be appended to a running list of dictionary objects
        job_data = {"name" : job["Name"].encode('utf-8'), "size" : job["RequestedSlots"] }

        # if a job is in a Skylake (skx) queue then divide by 2 to show total number of
        # cores based off the fact that there are 2 hyperthreads, i.e. RequestedSlots
        # per core
        if job["Queue"].find("skx") >= 0:

            job_data["size"] = job_data["size"] / 2

        # if a job is in any other queue then it is presumably using a Knight's Landing
        # (KNL) machine which is 4 hyperthreads to a core. Divide the hyperthreads amount
        # i.e. RequestedSlots, by 4 to get total amount of cores

        else:

            job_data["size"] = job_data["size"] / 4

        # grab projectID of current job project is associated with
        project_ID = job["Extension"]["LocalAccount"]

        # set projectURL for project request
        project_URL = "https://tas.tacc.utexas.edu/api/web/project?name=" + project_ID

        try:

            # request project data and load JSON
            project_response = urllib.urlopen( project_URL )
            project_data  = json.loads( project_response.read() )

        except ValueError:

                continue;


        # grab institution associated with project
        inst_name = project_data[ 'pi_institution' ].encode( 'utf-8' )

        # either add to or create list of project IDs corresponding to the current institution
        my_item = next((item for item in project_IDs if item['Institution'] == inst_name), None)
        if (my_item != None):
            pid_list = my_item['Projects']
            if not project_ID in pid_list:
                pid_list.append(project_ID.encode( 'utf-8' ))

        else:
            info = {'Institution' : inst_name, 'Projects' : [project_ID.encode( 'utf-8' )]}
            project_IDs.append(info)

        # gather data related to project that will be displayed when the project is
        # highlighted.
        pid_display_info = {'ProjectID' : project_ID.encode( 'utf-8' ), 'Abstract' : project_data[ 'project_abstract' ].encode( 'utf-8' ),
                            'Num Cores' : job_data["size"]}

        job_data[ 'principal_investigator' ] = project_data[ 'principal_investigator' ].encode( 'utf-8' )
        job_data[ 'field_of_science' ] = project_data[ 'field_of_science' ].encode( 'utf-8' )
        job_data[ 'project_abstract' ] = project_data[ 'project_abstract' ].encode( 'utf-8' )
        job_data[ 'pi_institution' ] = project_data[ 'pi_institution' ].encode( 'utf-8' )

        pid_mappings.append(pid_display_info)
        results.append( job_data )

    if (DEBUG):
        print ('done...')
        print ('writing data to file...')

    project_keys = project_IDs[0].keys()
    results_keys = results[0].keys()
    display_keys = pid_mappings[0].keys()

    with open( 'running_job_attributes.csv', 'w' ) as output_file:
        dict_writer = csv.DictWriter( output_file, display_keys, delimiter = '\t' )
        dict_writer.writeheader()
        dict_writer.writerows( pid_mappings )

    with open( 'institution_job_mappings.csv', 'w' ) as output_file:
        dict_writer = csv.DictWriter( output_file, project_keys, delimiter = '\t' )
        dict_writer.writeheader()
        dict_writer.writerows( project_IDs )

    with open( 'stampede2.csv', 'w' ) as output_file:
        dict_writer = csv.DictWriter( output_file, results_keys, delimiter = '\t' )
        dict_writer.writeheader()
        dict_writer.writerows( results )

    print ('complete')

def main():
    gatherQueryInfo()


main()
