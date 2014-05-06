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

def find_otherpositions(scans):
    def read_eigenvectors():
        eigens = {}
        with open('../../data/eigen_vectors.csv', 'r') as f:
            next(f)
            reader = csv.reader(f)
            for row in reader:
                pos = row[0]
                eigen = [float(val) for val in row[1:]]

                if not pos in eigens:
                    eigens[pos] = []

                eigens[pos].append( eigen )
        return eigens

    def get_name(pos, x, y):
        with open('../../data/transformed_all.csv', 'r') as f:
            next(f)
            reader = csv.reader(f)
            for row in reader:
                ppos = row[0]
                pname = row[1]
                px = float(row[2])
                py = float(row[3])

                if pos == ppos:
                    if x == px and y == py:
                        return pname
        return None

    def get_features(pos, name):
        with open('../../data/all.csv', 'r') as f:
            next(f)
            reader = csv.reader(f)
            for row in reader:
                pname = row[0]
                ppos = row[1]

                features = [float(val) for val in row[5:]]
                if pname == name and ppos == pos:
                    return features
        return None

    def get_feature_means():
        # TODO update means to be based on positions
        means = {}
        n = {}
        with open('../../data/all.csv', 'r') as f:
            next(f)
            reader = csv.reader(f)
            for row in reader:
                pos = row[1]
                if not pos in means:
                    means[pos] = [0,0,0,0,0,0]
                    n[pos] = 0

                features = [float(val) for val in row[5:]]
                for i in range(6):
                    means[pos][i] += features[i]

                n[pos] += 1

        for pos in means:
            for i in range(6):
                means[pos][i] = float(means[pos][i])/n[pos]
        return means


    eigens = read_eigenvectors()
    means = get_feature_means()

    for pos in scans:
        scan = scans[pos]
        outliers = scan.get_outliers()

        for outlier in outliers:
            x = outlier[0]
            y = outlier[1]

            if x >= 0: continue

            # ONLY CONSIDER BAD PLAYERS

            name = get_name(pos, x, y)
            features = get_features(pos, name)

            print 'original: ', name, pos, str([x,y])
            for opos in eigens:
                if pos == opos: continue

                xEigen = eigens[opos][0]
                yEigen = eigens[opos][1]

                scaled_features = [0,0,0,0,0,0]

                for i in range(6):
                    scaled_features[i] = features[i] - means[opos][i]

                newX = sum(p*q for p,q in zip(scaled_features, xEigen))
                newY = sum(p*q for p,q in zip(scaled_features, yEigen))

                if newX >= 0 and newY >= 0:
                    print 'other: ', name, opos, str([newX,newY])

        # endfor outlier
    # endfor eigens

if __name__ == '__main__':
    points = read_points('../../data/transformed_all.csv')
    scans = scan_points(points)
    
    find_otherpositions(scans)
    #plot_scans(scans)
