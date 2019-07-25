import urllib
import json
import csv

########################################################################
#   This code is intended to look up all of the institutions that have #
#   jobs running on Stampede2 that don't have their respective state   #
#   included in their name. It fetches the state that the institution  #
#   is located in and appends that data to university_states.csv.      #
#   The list output by this is also used in project_organizer.py       #
########################################################################

# with open('unlisted_universities.csv') as csv_file:
#     csv_reader = csv.reader(csv_file, delimiter = '\t')
#     next(csv_reader)
#
#     universities = []
#     for line in csv_reader:
#         i_name = line[1]
#         universities.append(i_name)
#
# API_key = "AIzaSyDqiXm6EnF-m4xxQ-1IffuZU9l1IZSydk0"
#
# univ_info = []
# addresses = []
# for university in universities:
#     keys = university.split()
#     search_string = '%20'.join(keys)
#     request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + search_string + "&inputtype=textquery&fields=formatted_address&key="  + API_key
#     response   = urllib.urlopen(request_url)
#     data       = json.loads( response.read())
#     # print university
#     # print data
#     address_components = data['candidates'][0]['formatted_address'].split(', ')
#     addresses.append(address_components)
#     state = address_components[-2][0:2]
#     info = {'University': university, 'State': state}
#     univ_info.append(info)
#
# print univ_info
#
# print "\n\n\n\n"
#
# print addresses

# univ_locations = [{'University': 'Offshore Technology Research Center', 'State': u'TX'}, {'University': 'University of Houston', 'State': u'TX'}, {'University': 'Purdue University', 'State': u'IN'},
#     {'University': 'Stanford University', 'State': u'CA'}, {'University': 'Brooklyn College', 'State': u'NY'}, {'University': 'Drake University', 'State': u'IA'}, {'University': 'Harvard University', 'State': u'MA'},
#     {'University': 'SUNY at Binghamton', 'State': u'NY'}, {'University': 'Brown University', 'State': u'RI'}, {'University': 'Clarkson University', 'State': u'NY'}, {'University': 'Boston College', 'State': u'MA'},
#     {'University': 'Vanderbilt University', 'State': u'TN'}, {'University': 'Northwestern University', 'State': u'IL'}, {'University': 'Rice University', 'State': u'TX'},
#     {'University': 'Los Alamos National Laboratory', 'State': u'NM'}, {'University': 'Brandeis University', 'State': u'MA'}, {'University': 'Bowling Green State University', 'State': u'OH'},
#     {'University': 'University of Notre Dame', 'State': u'IN'}, {'University': 'University of Pittsburgh', 'State': u'PA'}, {'University': 'University of Chicago', 'State': u'IL'},
#     {'University': 'College of Charleston', 'State': u'SC'}, {'University': 'National Renewable Energy Laboratory', 'State': u'CO'}, {'University': 'Salk Institute for Biological Studies', 'State': u'CA'},
#     {'University': 'Vassar College', 'State': u'NY'}, {'University': 'Tufts University', 'State': u'MA'}, {'University': 'Rochester Institute of Technology', 'State': u'NY'},
#     {'University': 'George Mason University', 'State': u'VA'}, {'University': 'Princeton University', 'State': u'NJ'}, {'University': 'University of Memphis', 'State': u'TN'},
#     {'University': 'Fox Chase Cancer Center', 'State': u'PA'}, {'University': 'Old Dominion University', 'State': u'VA'}, {'University': 'Jackson State University', 'State': u'MS'},
#     {'University': 'Johns Hopkins University', 'State': u'MD'}, {'University': 'Yale University', 'State': u'CT'}, {'University': 'Columbia University', 'State': u'NY'}, {'University': 'Binghamton University', 'State': u'NY'}]
#
# i = 0
# while i < len(univ_locations):
#     univ_locations[i]['State'] = "us-" + univ_locations[i]['State'].lower()
#     i += 1
#
# print univ_locations

univ_locations = [{'University': 'Offshore Technology Research Center', 'State': u'us-tx'}, {'University': 'University of Houston', 'State': u'us-tx'}, {'University': 'Purdue University', 'State': u'us-in'},
{'University': 'Stanford University', 'State': u'us-ca'}, {'University': 'Brooklyn College', 'State': u'us-ny'}, {'University': 'Drake University', 'State': u'us-ia'},
{'University': 'Harvard University', 'State': u'us-ma'}, {'University': 'SUNY at Binghamton', 'State': u'us-ny'}, {'University': 'Brown University', 'State': u'us-ri'},
{'University': 'Clarkson University', 'State': u'us-ny'}, {'University': 'Boston College', 'State': u'us-ma'}, {'University': 'Vanderbilt University', 'State': u'us-tn'},
{'University': 'Northwestern University', 'State': u'us-il'}, {'University': 'Rice University', 'State': u'us-tx'}, {'University': 'Los Alamos National Laboratory', 'State': u'us-nm'},
{'University': 'Brandeis University', 'State': u'us-ma'}, {'University': 'Bowling Green State University', 'State': u'us-oh'}, {'University': 'University of Notre Dame', 'State': u'us-in'},
{'University': 'University of Pittsburgh', 'State': u'us-pa'}, {'University': 'University of Chicago', 'State': u'us-il'}, {'University': 'College of Charleston', 'State': u'us-sc'},
{'University': 'National Renewable Energy Laboratory', 'State': u'us-co'}, {'University': 'Salk Institute for Biological Studies', 'State': u'us-ca'}, {'University': 'Vassar College', 'State': u'us-ny'},
{'University': 'Tufts University', 'State': u'us-ma'}, {'University': 'Rochester Institute of Technology', 'State': u'us-ny'}, {'University': 'George Mason University', 'State': u'us-va'},
{'University': 'Princeton University', 'State': u'us-nj'}, {'University': 'University of Memphis', 'State': u'us-tn'}, {'University': 'Fox Chase Cancer Center', 'State': u'us-pa'},
{'University': 'Old Dominion University', 'State': u'us-va'}, {'University': 'Jackson State University', 'State': u'us-ms'}, {'University': 'Johns Hopkins University', 'State': u'us-md'},
{'University': 'Yale University', 'State': u'us-ct'}, {'University': 'Columbia University', 'State': u'us-ny'}, {'University': 'Binghamton University', 'State': u'us-ny'}]

with open( 'university_states.csv', 'a' ) as output_file:
    dict_writer = csv.DictWriter( output_file, univ_locations[0].keys(), delimiter = '\t' )
    dict_writer.writeheader()
    dict_writer.writerows(univ_locations)
