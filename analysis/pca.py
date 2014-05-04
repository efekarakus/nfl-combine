import csv
import numpy as np
from sklearn.decomposition import PCA

datafile = '../data/all.csv'

def read_positions(path):
    positions = {}
    with open(path, 'r') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            pos = row[1]
            if not pos in positions:
                positions[pos] = []

            for i in range(len(row[5:])):
                row[i+5] = float(row[i+5])
            
            positions[pos].append( row[5:] )
    return positions


def preprocess(positions):
    # substract mean
    counts = {}
    for p in positions:
        counts[p] = {}
        for entry in positions[p]:
            for i in range(len(entry)):
                if not i in counts[p]:
                    counts[p][i] = 0
                counts[p][i] += entry[i]
            # endfor i
        # endfor entry
    # endfor p
    
    means = {}
    for p in counts:
        means[p] = {}
        for i in counts[p]:
            means[p][i] = counts[p][i]/float(len(positions[p]))
        # endfor
    # endfor

    for p in positions:
        for entry in positions[p]:
            for i in range(len(entry)):
                entry[i] -= means[p][i]
            # endfor
        # endfor
    #endfor

def pca(positions):
    for p in positions:
        pca = PCA(n_components = 2)
        pca.fit(positions[p])

        print p, pca.components_

if __name__ == '__main__':
    positions = read_positions(datafile)
    #preprocess( positions )
    pca( positions )
