import urllib
import json
import csv

API_key = "AIzaSyDqiXm6EnF-m4xxQ-1IffuZU9l1IZSydk0"

def build_location_csv():
    universities = []
    with open('institution_job_mappings.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = '\t')
        next(csv_reader)
        for line in csv_reader:
            institution_name = line[0]
            universities.append(institution_name)

    # print universities

    univ_info = []
    addresses = []
    for university in universities:
        keys = university.split()
        search_string = '%20'.join(keys)
        print search_string
        request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + search_string + "&inputtype=textquery&fields=formatted_address&key="  + API_key
        response   = urllib.urlopen(request_url)
        data       = json.loads( response.read())
        #print university
        #print data
        if(len(data['candidates']) > 0 ):
            address_components = data['candidates'][0]['formatted_address'].split(', ')
            addresses.append(address_components)
            state = address_components[-2][0:2]
            info = {'University': university, 'State': state}
            univ_info.append(info)

    #print univ_info

    #print "\n\n\n\n"

    #print addresses

build_location_csv()
