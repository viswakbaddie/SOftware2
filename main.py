from flask import Flask
from flask_cors import CORS
import mysql.connector as mysql
con=mysql.connect(host='localhost', user='root',password='password',database='flight_game')
cursor=con.cursor()
'''
app = Flask(__name__)
CORS(app)

@app.route('/location', methods=['GET'])
def hello_name():
    query = 'select * from airport;'
    cursor.execute(query)
    data = cursor.fetchall()
    for i in data:
        print(i[4], i[5])

if __name__ == '__main__':
    app.run(debug=True)'''
l=[]
query = 'select * from airport;'
cursor.execute(query)
data = cursor.fetchall()
for i in data:
    d = {}
    d['location'] = [i[4],i[5]]
    l.append(d)
print(l)
