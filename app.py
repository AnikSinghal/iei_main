from flask import Flask,render_template,session, redirect, url_for

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/members')
def members():
    return render_template('members.html')

@app.route('/simon')
def simon_game():
    highscore = session.get('highscore', 0)
    return render_template('simon.html', highscore=highscore)

@app.route('/update_highscore/<int:score>')
def update_highscore(score):
    highscore = session.get('highscore', 0)
    if score > highscore:
        session['highscore'] = score
    return redirect(url_for('simon_game'))

if __name__ == '__main__':
    app.run(debug=True)
