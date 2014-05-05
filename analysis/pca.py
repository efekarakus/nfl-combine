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
            name = row[0]
            if not pos in positions:
                positions[pos] = {}

            for i in range(len(row[5:])):
                row[i+5] = float(row[i+5])
            
            positions[pos][name] = row[5:] 
    return positions

def pca(positions):
    count = 1
    eigens = {}
    T = {}
    for p in positions:
        X = []
        for name in positions[p]:
            X.append(positions[p][name])

        pca = PCA(n_components = 2) # the mean substraction handled by lib
        pca.fit(X)

        eigens[p] = pca.components_

        T[p] = {}
        for name in positions[p]:
            Z = pca.transform([positions[p][name]])
            T[p][name] = Z
        #Z = pca.transform(X)

        #x = [v for [v,t] in Z]
        #y = [t for [v,t] in Z]
        #plt.subplot(11, 1, count)
        #plt.scatter(x, y)
        #plt.title('PCA for ' + p)

        #count += 1
    #plt.show()

    return eigens, T

def write_eigens(path, eigens):
    with open(path, 'w') as f:
        f.write('pos,40yd,benchpress,vertleap,broadjump,shuttle,3cone\n')
        for pos in eigens:
            s = pos
            for val in eigens[pos][0]:
                s += ','+str(val)
            s += '\n'
            f.write(s)

            s = pos
            for val in eigens[pos][1]:
                s += ',' + str(val)
            s += '\n'
            f.write(s)

def write_transformation(path, T):
    with open(path, 'w') as f:
        f.write('pos,name,x,y\n')
        for pos in T:
            for name in T[pos]:
                s = pos + ','+name
                s += ','+ str(T[pos][name][0][0])
                s += ','+ str(T[pos][name][0][1])
                s += '\n'
                f.write(s)

if __name__ == '__main__':
    positions = read_positions(datafile)
    #preprocess( positions )
    eigens, T = pca( positions )
    write_eigens('../data/eigen_vectors.csv', eigens)
    write_transformation('../data/transformed_all.csv', T)
