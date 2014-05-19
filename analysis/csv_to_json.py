import json
import csv

def read_data():
    data = []
    with open('../data/all.csv', 'r') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            name = row[0]
            pos = row[1]
            yd = float(row[5])
            benchpress = float(row[6])
            vertleap = float(row[7])
            broadjump = float(row[8])
            shuttle = float(row[9])
            cone = float(row[10])

            data.append({
                'name': name,
                'pos': pos,
                '40yd': yd,
                'benchpress': benchpress,
                'vertleap': vertleap,
                'broadjump': broadjump,
                'shuttle': shuttle,
                '3cone': cone
            })
        # endfor
    # endwith
    return data

def write(data):
    with open('../data/all.js', 'w') as f:
        json.dump({'data': data}, f)

if __name__ == '__main__':
    data = read_data()
    write(data)
