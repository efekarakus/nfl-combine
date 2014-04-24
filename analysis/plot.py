import json
import numpy as np
from scipy.interpolate import pchip
import matplotlib.pyplot as plt

def read_data():
    return json.load(open('../data/nfl-combine-2013.json'))

def plot(players, key):
    points = {}

    for player in players:
        if player[key] == "": continue
        yd = float(player[key])
        yd = round(yd,1)

        if not yd in points:
            points[yd] = 1
        else:
            points[yd] += 1
    # endfor

    
    x = np.array(sorted(points.keys()))
    y = np.array([points[xi] for xi in x])

    interp = pchip(x, y)
    xx = np.linspace(x[0], x[-1], 100)

    plt.clf()
    plt.title(key)
    plt.ylabel("number of players")
    plt.plot(xx, interp(xx))
    plt.plot(x, y, 'bo')
    plt.ylim(min(y), max(y))
    plt.grid(True)
    plt.savefig(key + ".png")

    

if __name__ == '__main__':
    data = read_data()
    plot(data["players"], "40yd")
    plot(data["players"], "benchpress")
    plot(data["players"], "vertleap")
    plot(data["players"], "broadjump")
    plot(data["players"], "3cone")
    plot(data["players"], "shuttle")

