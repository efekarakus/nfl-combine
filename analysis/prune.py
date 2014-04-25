import json

def read_data():
    return json.load(open('../data/nfl-combine-2013.json'))

def missing_data(players):
    keys = ["40yd", "vertleap", "broadjump", "shuttle", "3cone"] 
    for player in players:
        if player["pos"] == "QB":
            if not hasAllValues( player, keys ): 
                continue
            else:
                if player["benchpress"] == "":
                    player["benchpress"] = "0"
    # endfor



def prune_data(players):
    to_delete = []
    keys = ["40yd", "benchpress", "vertleap", "broadjump", "shuttle", "3cone"] 
    for i in range(0, len(players)):
        if not hasAllValues( players[i], keys ):
            to_delete.append(players[i])
    # endfor

    for _ in to_delete:
        players.remove(_)


def hasAllValues( player , keys):
    for key in keys:
        if player[key] == "":
            return False
    return True

def write_data( data ):
    json.dump(data, open('../data/pruned-nfl-combine-2013.json', 'w'))

if __name__ == '__main__':
    data = read_data()
    missing_data(data['players'])
    prune_data(data['players'])
    write_data( data )
