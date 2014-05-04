import csv
import numpy as np
import pylab as pl
import matplotlib.pyplot as plt
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

def pca(positions):
    count = 1
    for p in positions:
        pca = PCA(n_components = 2) # the mean substraction handled by lib
        pca.fit(positions[p])

        print p, pca.components_
        Z = pca.transform(positions[p])

        x = [v for [v,t] in Z]
        y = [t for [v,t] in Z]
        plt.subplot(11, 1, count)
        plt.scatter(x, y)
        plt.title('PCA for ' + p)

        count += 1
    plt.show()

if __name__ == '__main__':
    positions = read_positions(datafile)
    #preprocess( positions )
    pca( positions )
