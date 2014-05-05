class DBScan:
    """
    Algorithm adapted from:
    http://en.wikipedia.org/wiki/DBSCAN
    and
    http://www.cs.uiuc.edu/homes/hanj/cs512/slides/4-ch11ClusAdvanced.pdf

    @author Efe Karakus
    """
    
    class Cluster:
        """
        Cluster object represented by a set
        """
        def __init__(self):
            self._c = set([])

        def add(self, data):
            self._c.add(data)

        def has(self, data):
            return data in self._c

        def __str__(self):
            return str(self._c)

    class Node:
        def __init__(self, nid, data):
            self.nid = nid
            self.data = data
            self.label = 'UNEXPLORED'
            
    
    def __init__(self, eps, min_pts):
        self.eps = eps
        self.min_pts = min_pts
        self.clusters = []
        self.nodes = []

    def fit(self, X):
        def get_neighbors(cur):
            neighbors = []
            for n in self.nodes:
                if cur.nid == n.nid: continue

                dist = 0
                for i in range(len(n.data)):
                    dist += (cur.data[i]-n.data[i]) * (cur.data[i]-n.data[i])

                if dist <= self.eps*self.eps:
                    neighbors.append(n)
            return neighbors

        def expand(node, neighbors, cluster):
            cluster.add(node)

            reachables = neighbors
            for neighbor in neighbors:
                if neighbor.label == 'UNEXPLORED':
                    neighbor.label = 'EXPLORED'
                    surroundings = get_neighbors(neighbor)
                    if len(surroundings) >= self.min_pts:
                        reachables.extend(surroundings)
            # endfor

            for reach in reachables:
                if not self.has_cluster(reach):
                    cluster.add(reach)
            return

        # start

        for i in range(len(X)):
            n = self.Node(i, X[i])
            self.nodes.append(n)
        # endfor nodes

        for node in self.nodes:
            if node.label != 'UNEXPLORED': continue

            node.label = 'EXPLORED'
            neighbors = get_neighbors(node)

            if len(neighbors) < self.min_pts:
                node.label = 'OUTLIER'
            else:
                cluster = self.Cluster()
                expand(node, neighbors, cluster)
                self.clusters.append(cluster)
        return

    def get_clusters(self):
        return [[n.data for n in clus._c ] for clus in self.clusters]

    def has_cluster(self, node):
        for c in self.clusters:
            if c.has(node):
                return True
        return False

    def get_outliers(self):
        outliers = []
        for node in self.nodes:
            if node.label == 'OUTLIER':
                outliers.append(node.data)
        return outliers
        

if __name__ == '__main__':
    data = [ [0,0] , [0, 1.0], [0, 2.0], [10.0, 0.0] ]
    scan = DBScan(3.0, 1)
    scan.fit(data)
    print scan.get_clusters()
    print scan.get_outliers()
