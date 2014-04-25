import json

def read_data():
    return json.load(open('../data/pruned-nfl-combine-2013.json'))

def get_positions( players ):
    positions = set([])

    for player in players:
        positions.add(player['pos'])

    return positions

#  get avg, and indices of each positions
def meta( players ):
    
    meta = {}

    keys = ["40yd", "benchpress", "vertleap", "broadjump", "shuttle", "3cone"] 
    for i in range (0, len(players)):
        player = players[i]

        if not hasAllValues(player, keys):
            continue

        pos = player['pos']
        if not pos in meta:
            meta[pos] = {
                'average': {
                    '40yd': 0,
                    'benchpress': 0,
                    'vertleap': 0,
                    'broadjump': 0,
                    'shuttle': 0,
                    '3cone': 0,
                    'count': 0
                },
                'indices': []
            }
        addToAverage( meta[pos]['average'], player, keys )
        meta[pos]['indices'].append(i)
    
    for pos in meta:
        avg = meta[pos]['average']
        for drill in avg:
            if drill == 'count': continue
            avg[drill] = round(avg[drill]/avg['count'], 2)
        del avg['count']

    return meta
# end meta

def hasAllValues( player , keys):
    for key in keys:
        if player[key] == "":
            return False
    return True

def addToAverage( avg, player, keys ):
    for key in keys:
        avg[key] += float(player[key])
    avg['count'] += 1



if __name__ == '__main__':
    data = read_data()
    players = data['players']
    meta = meta( players )
    print json.dumps(meta)
