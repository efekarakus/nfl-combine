import csv

def read_data():
    pos = {}
    with open('../data/transformed_all.csv', 'r') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            p = row[0]
            if not p in pos:
                pos[p] = []
            pos[p].append(row)
    # endwith
    return pos
    
def write_positions(data):
    for pos in data:
        with open('../data/transformed-' + pos + '.csv', 'w') as f:
            for row in data[pos]:
                s = ','.join(row)
                f.write(s + '\n')

if __name__ == '__main__':
    data = read_data()
    write_positions(data)
