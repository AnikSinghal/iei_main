<<<<<<< HEAD
from flask import Flask
=======
from flask import Flask,render_template
>>>>>>> a7fc744e4cdc84158a3cc54aa503dde7bbf38b61

app = Flask(__name__)

@app.route('/')
def hello_world():
<<<<<<< HEAD
    return 'Hello, World!'
=======
    return render_template('home.html')
>>>>>>> a7fc744e4cdc84158a3cc54aa503dde7bbf38b61

if __name__ == '__main__':
    app.run(debug=True)
