import csv
import json
import urllib

# starting static list of universities and their locations to reduce Google Places API call frequency
univ_locations = {'Texas A&M University Corpus Christi': 'us-tx', 'University of Texas at Arlington': 'us-tx', 'University of Houston': 'us-tx',
'Michigan Technological University': 'us-mi', 'Rice University': 'us-tx', 'University of Connecticut': 'us-ct', 'University of Florida': 'us-fl',
'Stanford University': 'us-ca', 'Texas A&M University': 'us-tx', 'University of North Texas': 'us-tx', 'University of Texas Medical Branch': 'us-tx',
'University of North Carolina, Chapel Hill': 'us-nc', 'Drake University': 'us-ia', 'Brown University': 'us-ri', 'University of California, Berkeley': 'us-ca',
'University of Texas at El Paso': 'us-tx', 'University of Texas at Dallas': 'us-tx', 'California Institute of Technology': 'us-ca',
'Clarkson University': 'us-ny', 'University of California, Los Angeles': 'us-ca', 'University of Memphis': 'us-tn',
'College of Physicians & Surgeons, Columbia University': 'us-tx', 'University of California, Santa Barbara': 'us-ca',
'Massachusetts Institute of Technology': 'us-ma', 'University of Texas Health Science Center at Houston': 'us-tx', 'Los Alamos National Laboratory': 'us-nm',
'Texas Tech University': 'us-tx', 'Texas A&M University-Kingsville': 'us-tx', 'Arizona State University': 'us-az', 'Vanderbilt University': 'us-tn',
'The Pennsylvania University': 'us-pa', 'North Carolina State University at Raleigh': 'us-nc', 'University of Texas Southwestern Medical Center': 'us-tx',
'University of Pittsburgh': 'us-pa', 'University of Michigan': 'us-mi', 'University of Pennsylvania': 'us-pa', 'National Renewable Energy Laboratory': 'us-co',
'University of California-Riverside': 'us-ca', 'University of California, Santa Cruz': 'us-ca', 'Vassar College': 'us-ny', 'City University of New York': 'us-ny',
'California State University-Northridge': 'us-ca', 'University of Virginia': 'us-va', 'Missouri University of Science and Technology': 'us-mo',
'Institute for Computational Engineering and Science': 'us-tx', 'John A. and Katherine G. Jackson School of Geosciences': 'us-tx', 'Princeton University': 'us-nj',
'University of Iowa': 'us-ia', 'University of Kentucky': 'us-ky', 'Texas Tech University Health Sciences Center, El Paso': 'us-tx', 'Fox Chase Cancer Center': 'us-pa',
'Old Dominion University': 'us-va', 'Brooklyn College': 'us-ny', 'Texas Advanced Computing Center': 'us-tx', 'Yale University': 'us-ct',
'University of California, Davis': 'us-ca', 'University of Central Florida': 'us-fl', 'UTHealth': 'us-tx', 'Louisiana State University': 'us-la',
'Columbia University': 'us-ny', 'Binghamton University': 'us-ny', 'Oregon State University': 'us-or', 'University of Oklahoma': 'us-ok',
'University of Washington': 'us-wa', 'Purdue University': 'us-in', 'Institute for Fusion Studies': 'us-tx', 'Oregon Health and Science University': 'us-or',
'University of Notre Dame': 'us-in', 'Department of Economics': 'us-tx', 'University of Missouri': 'us-mo', 'Department of Electrical and Computer Engineering': 'us-tx',
'New Mexico Institute of Mining and Technology': 'us-nm', 'Harvard University': 'us-ma', 'SUNY at Binghamton': 'us-ny', 'Offshore Technology Research Center': 'us-tx',
'University of Texas M. D. Anderson Cancer Center': 'us-tx', 'University of California, San Diego': 'us-ca', 'Boston College': 'us-ma', 'Northwestern University': 'us-il',
'Department of Mechanical Engineering': 'us-tx', 'University of Maryland, College Park': 'us-md', 'College of Engineering': 'us-tx', 'Brandeis University': 'us-ma',
'Salk Institute for Biological Studies': 'us-ca', 'University of Colorado': 'us-co', 'University of Wisconsin': 'us-wi', 'University of Delaware': 'us-de',
'Georgia Institute of Technology': 'us-ga', 'Department of Aerospace Engineering and Engineering Mechanics': 'us-tx', 'New Mexico State University': 'us-nm',
'University of Chicago': 'us-il', 'College of Charleston': 'us-sc', 'California State University Northridge': 'us-ca','University of Texas at Austin': 'us-tx',
'Pennsylvania State University': 'us-pa', 'Tufts University': 'us-ma', 'Department of Chemical Engineering': 'us-tx', 'Rochester Institute of Technology': 'us-ny',
'South Dakota State University': 'us-sd', 'George Mason University': 'us-va', 'University of Alabama, Huntsville': 'us-al', 'University of Georgia': 'us-ga',
'University of Nevada-Las Vegas': 'us-nv', 'Washington University in St. Louis': 'us-wa', 'University of Texas at San Antonio': 'us-tx', 'Iowa State University': 'us-ia',
'University of California, Irvine': 'us-ca', 'University of Nebraska, Omaha': 'us-ne', 'Indiana University': 'us-in', 'University of Illinois': 'us-il',
'Johns Hopkins University': 'us-md', 'Bowling Green State University': 'us-oh', 'University of Tennessee, Knoxville': 'us-tn', 'Department of Chemistry and Biochemistry': 'us-tx',
'Jackson State University': 'us-ms', 'Department of Psychology': 'us-tx', 'Department of Physics': 'us-tx', 'Department of Petroleum and Geosystems Engineering': 'us-tx',
'Center for Aeromechanics Research': 'us-tx', 'Center for Energy and Environmental Resources': 'us-tx', 'Center for Research in Water Resources': 'us-tx',
'San Francisco State University': 'us-ca', 'Ohio State University': 'us-oh', 'University of Denver': 'us-co', 'Boston University': 'us-ma', 'Haverford College': 'us-pa',
'Rensselaer Polytechnic Institute': 'us-ny', 'Cornell University': 'us-ny', 'SUNY at Albany': 'us-ny', 'University of Wisconsin-Milwaukee': 'us-wi',
'University of Oregon': 'us-or', 'Carnegie Mellon University': 'us-pa', 'Tennessee Technological University': 'us-tn', 'Rutgers University': 'us-nj',
'University of Nebraska at Lincoln': 'us-ne', 'University of Massachusetts, Amherst': 'us-ma', 'Drexel University': 'us-pa', 'Harvey Mudd College': 'us-ca',
'University of South Carolina': 'us-sc'}

# Makes a new base university_states.csv file from static structure
def refresh_csv():
    write_univ_states_csv(univ_locations, True)

# Returns a parsable list of jobs running on Stampede2 from a certain institution.
def get_jobs_by_institution(target_institution):
    with open('institution_job_mappings.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = '\t')
        next(csv_reader)
        for line in csv_reader:
            if (line[0] == target_institution):
                job_string = line[1]
                jobs_list = build_job_array(job_string)
                if (DEBUG):
                    print jobs_list
                return jobs_list
    return "That institution is not currently running any jobs on Stampede2."

# Makes an array out of the string holding the list of jobs.
def build_job_array(job_string):
    job_string = job_string.lstrip("['")
    job_string = job_string.rstrip("']")
    jobs_list = job_string.split("', '")
    return jobs_list

# Returns the number of jobs running on Stampede2 from a certain university.
def getCount(target_institution):
    inst_data = []
    with open('institution_job_mappings.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = '\t')
        for line in csv_reader:
            if(line[0] == target_institution):
                return len(build_job_array(get_jobs_by_institution(target_institution)))
    return 0

def rebuild_array():
    with open('university_states.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = '\t')
        for line in csv_reader:
            institution = line[0]
            if not institution in univ_locations.keys():
                univ_locations[institution] = line[1]

def add_new_universities():
    rebuild_array()
    university_info = {}
    addresses = []
    # DO NOT EDIT THIS KEY
    API_key = "AIzaSyDqiXm6EnF-m4xxQ-1IffuZU9l1IZSydk0"
    with open('institution_job_mappings.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = '\t')
        next(csv_reader)
        for line in csv_reader:
            institution = line[0]
            if not institution in univ_locations.keys():
                # make api call to get univerity location
                print institution
                keys = institution.split()
                search_string = '%20'.join(keys)
                # print search_string
                request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + search_string + "&inputtype=textquery&fields=formatted_address&key="  + API_key
                response   = urllib.urlopen(request_url)
                data       = json.loads( response.read())
                # print data
                if (len(data['candidates']) > 2):
                    address_components = data['candidates'][0]['formatted_address'].split(', ')
                    addresses.append(address_components)
                    state = address_components[-2][0:2]
                    university_info[institution] = "us-" + state.encode('utf-8').lower()

    write_univ_states_csv(university_info, False)


def write_univ_states_csv(locations_list, initial):
    # Make dictionary
    keys = locations_list.keys()
    univ_states = []
    for institution in keys:
        info = {'Institution' : institution, 'State' : locations_list[institution]}
        univ_states.append(info)

    # Write info out to csv
    if (len(univ_states) > 0):
        list_keys = sorted(univ_states[0].keys())
        if (initial):
            with open('university_states.csv', 'w')as output_file:
                    dict_writer = csv.DictWriter( output_file, list_keys, delimiter = '\t' )
                    dict_writer.writeheader()
                    dict_writer.writerows( univ_states )
        else:
            with open('university_states.csv', 'a')as output_file:
                dict_writer = csv.DictWriter( output_file, keys, delimiter = '\t' )
                dict_writer.writerows( univ_states )
    write_state_count_csv()

def write_state_count_csv():
    state_count = {}
    with open('university_states.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = '\t')
        next(csv_reader)
        for line in csv_reader:
            state = line[1]
            if not state in state_count.keys():
                state_count[state] = 1
            else:
                state_count[state] += 1

    state_count_array = []
    for state in sorted(state_count):
        info = {'State' : state, 'Count' : state_count[state]}
        state_count_array.append(info)

    with open('state_count.csv', 'w')as output_file:
        keys = sorted(state_count_array[0].keys(), reverse = True)
        dict_writer = csv.DictWriter( output_file, keys, delimiter = '\t' )
        dict_writer.writeheader()
        dict_writer.writerows( state_count_array )


def main():
    refresh_csv()
    add_new_universities()

main()
