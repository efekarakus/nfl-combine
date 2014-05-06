import json

features = ['name', 'pos', 'height', 'weight', 
	'wonderlic', '40yd', 'benchpress', 'vertleap', 
	'broadjump', 'shuttle', '3cone']


positions = {
    # offense
    #########
    # merge as kickers
    'P': 'K',
    'K': 'K',

    # merge into offensive line
    'OT': 'OL',
    'OG': 'OL',
    'LS': 'OL',
    'C': 'OL',

    # defense
    #########

    # safeties
    'SS': 'S',
    'FS': 'S',

    # line backers
    'OLB': 'LB',
    'ILB': 'LB',

    # defensive line
    'DT': 'DL',
    'DE': 'DL'
}

def merge(paths):
    def isValid(player):
        pos = player['pos']
        if pos == 'QB' and player['benchpress'] == '':
            player['benchpress'] = '0.0'

        for feature in features[5:]:
            if player[feature] == '':
                return False
        return True

    def clean(player):
        if player['pos'] in positions:
            player['pos'] = positions[player['pos']]

        for feature in features[2:]:
            if player[feature] != '':
                val = player[feature]
                if val[0] == '*':
                    val = val[1:]
                player[feature] = float(val)

    data = []
    for path in paths:
        j = json.load(open(path, 'r'))
        players = j['players']

        for player in players:
            if isValid(player):
                clean(player)
                data.append(player)
    return data

def write_csv(path , players):

	with open(path, 'w') as f:
		f.write(','.join(features) + '\n')

		for player in players:
			s = player['name']['text']
			for feature in features[1:]:
				if player[feature] == '':
					s += ','
				else:
					s += ',' + str(player[feature])
			# endfor
			s += '\n'
			f.write(s)
		# endfor

if __name__ == '__main__':
	paths = [
        '../data/nfl-combine-2014.json',
		'../data/nfl-combine-2013.json',
		'../data/nfl-combine-2012.json',
		'../data/nfl-combine-2011.json'
	]
	data = merge(paths)
	write_csv('../data/all.csv', data)
