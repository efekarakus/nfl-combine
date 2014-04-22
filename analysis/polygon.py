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

if __name__ == '__main__':
    data = read_data()
    avg = average(data["players"])
    pprint(avg)
