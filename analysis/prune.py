import json

def read_data():
    return json.load(open('../data/nfl-combine-2013.json'))

def prune_data(players):
    to_delete = []
    for i in range(0, len(players)):
        if not hasAllValues( players[i] ):
            to_delete.append(players[i])
    # endfor

    for _ in to_delete:
        players.remove(_)

def hasAllValues( player ):
    if player["40yd"] == "":
        return False
    if player["benchpress"] == "":
        return False
    if player["vertleap"] == "":
        return False
    if player["broadjump"] == "":
        return False
    if player["shuttle"] == "":
        return False
    if player["3cone"] == "":
        return False
    return True

def write_data( data ):
    json.dump(data, open('../data/pruned-nfl-combine-2013.json', 'w'))

if __name__ == '__main__':
    data = read_data()
    prune_data(data['players'])
    write_data( data )
