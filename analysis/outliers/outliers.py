from dbscan import DBScan
import csv
import numpy as np
import matplotlib.pyplot as plt

def read_points(path):
    points = {}
    with open(path, 'r') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            pos = row[0]
            x = float(row[2])
            y = float(row[3])

            if not pos in points:
                points[pos] = []

            points[pos].append([x,y])
    return points

def get_params(pos):
    if pos == 'DL':
        return (3, 2)
    elif pos == 'OL':
        return (3, 3)
    elif pos == 'LB':
        return (3, 2)
    elif pos == 'CB':
        return (3.5, 3)
    elif pos == 'FB':
        return (6, 2)
    elif pos == 'S':
        return (3, 2)
    elif pos == 'QB':
        return (2, 2)
    elif pos == 'WR':
        return (3, 1)
    elif pos == 'RB':
        return (3, 2)
    elif pos == 'DT':
        return (4, 3)
    else:
        return (4, 2)

def scan_points(points):
    scans = {}
    for pos in points:
        X = points[pos]
        (eps, min_pts) = get_params(pos)

        scan = DBScan(eps, min_pts)
        scan.fit(X)

        scans[pos] = scan
    return scans

def plot_scans(scans):
    count = 1
    plt.subplots(11, 1)
    plt.subplots_adjust(hspace=0.9)
    for pos in scans:
        scan = scans[pos]

        outliers = scan.get_outliers()
        clusters = scan.get_clusters()

        plt.subplot(11, 1, count)

        # plt outliers
        x = [v for [v,t] in outliers]
        y = [t for [v,t] in outliers]

        plt.scatter(x,y,c='r')
        
        # plt normals
        for cluster in clusters:
            x = [v for [v,t] in cluster]
            y = [t for [v,t] in cluster]
            plt.scatter(x,y)

        plt.title('Outliers for ' + pos)

        count += 1
    plt.show()

if __name__ == '__main__':
    points = read_points('../../data/transformed_all.csv')
    scans = scan_points(points)
    plot_scans(scans)
