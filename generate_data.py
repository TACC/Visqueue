#!/usr/bin/env python
import json

range_n = 100

test_data = { "name" : "test_" + str(range_n) , "children" : [] }
print( "creating test data" )
for x in range( range_n ):

	name_1 =  str( x )
	child_1 = { "name" : name_1, "children" : [] }

	for y in range( range_n ):

		name_2 = str(x) + "_" + str(y)
		child_2 = { "name" : name_2, "children" : [] }

		for z in range( range_n ):

			name_3 = str(x) + "_" + str(y) + "_" + str(z)
			child_3 = { "name" : name_3, "size" : 100 }

			child_2[ 'children' ].append( child_3 )

		child_1[ 'children' ].append( child_2 )

	test_data[ 'children' ].append( child_1 )

print("done creating data")
print("storing data in json file....")
with open( 'test_' + str(range_n) + '.json', 'w' ) as outfile:
	json.dump( test_data, outfile, indent = 4 )

print("complete")
