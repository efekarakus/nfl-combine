import json
from pprint import pprint

def read_data():
    return json.load(open('../data/nfl-combine-2013.json'))


def average(players):
    avg = {
        "height": { "values": 0, "count": 0 },
        "weight": { "values": 0, "count": 0 },
        "wonderlic": { "values": 0, "count": 0 },
        "40yd": { "values": 0, "count": 0 },
        "benchpress": { "values": 0, "count": 0 },
        "vertleap": { "values": 0, "count": 0 },
        "broadjump": { "values": 0, "count": 0 },
        "shuttle": { "values": 0, "count": 0 },
        "3cone": { "values": 0, "count": 0 }
    }

    for player in players:
        add_key(avg, player, "height")
        add_key(avg, player, "weight")
        add_key(avg, player, "wonderlic")
        add_key(avg, player, "40yd")
        add_key(avg, player, "benchpress")
        add_key(avg, player, "vertleap")
        add_key(avg, player, "broadjump")
        add_key(avg, player, "shuttle")
        add_key(avg, player, "3cone")
            

    for key in avg:
        avg[key] = round(avg[key]["values"]/avg[key]["count"], 2)

    return avg

def add_key(avg, player, key):
    if player[key] != "":
        avg[key]["values"] += float(player[key])
        avg[key]["count"] += 1

def meta( players ):
    meta = {
        "height": [float('inf'), 0.0],
        "weight": [float('inf'), 0.0],
        "wonderlic": [float('inf'), 0.0],
        "40yd": [float('inf'), 0.0],
        "benchpress": [float('inf'), 0.0],
        "vertleap": [float('inf'), 0.0],
        "broadjump": [float('inf'), 0.0],
        "shuttle": [float('inf'), 0.0],
        "3cone": [float('inf'), 0.0]
    }
    for player in players:
        range_key( meta, player, "height" )
        range_key( meta, player, "weight" )
        range_key( meta, player, "wonderlic" )
        range_key( meta, player, "40yd" )
        range_key( meta, player, "benchpress" )
        range_key( meta, player, "vertleap" )
        range_key( meta, player, "broadjump" )
        range_key( meta, player, "shuttle" )
        range_key( meta, player, "3cone" )
    return meta

def range_key( meta, player, key ):
    if player[key] != "":
        meta[key][0] = min( meta[key][0], float( player[key] ) )
        meta[key][1] = max( meta[key][1], float( player[key] ) )

def combine( meta, avg ):
    for key in meta:
        meta[key].insert( 1, avg[key] )

if __name__ == '__main__':
    data = read_data()
    avg = average(data["players"])
    m = meta(data["players"])
    combine( m, avg )
    pprint(m)
