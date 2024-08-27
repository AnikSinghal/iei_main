<<<<<<< HEAD
<<<<<<< HEAD
from flask import Flask
=======
from flask import Flask,render_template
>>>>>>> a7fc744e4cdc84158a3cc54aa503dde7bbf38b61
=======
from flask import Flask, render_template, session, redirect, url_for, request, flash
>>>>>>> 2658aa7021a0ae049de33b07ab0bbe37d17a93c8

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Dummy password for admin login
ADMIN_PASSWORD = 'admin123'

# Dictionary to track clicks on different links
click_stats = {
    'home': 0,
    'about': 0,
    'events': 0,
    'members': 0,
    'simon': 0
}

# Routes for each page
@app.route('/')
<<<<<<< HEAD
def hello_world():
<<<<<<< HEAD
    return 'Hello, World!'
=======
=======
def home():
    click_stats['home'] += 1
>>>>>>> 2658aa7021a0ae049de33b07ab0bbe37d17a93c8
    return render_template('home.html')
>>>>>>> a7fc744e4cdc84158a3cc54aa503dde7bbf38b61

@app.route('/about')
def about():
    click_stats['about'] += 1
    return render_template('about.html')

@app.route('/events')
def events():
    click_stats['events'] += 1
    return render_template('events.html')

@app.route('/members')
def members():
    click_stats['members'] += 1
    return render_template('members.html')

@app.route('/simon')
def simon_game():
    click_stats['simon'] += 1
    highscore = session.get('highscore', 0)
    return render_template('simon.html', highscore=highscore)

@app.route('/update_highscore/<int:score>')
def update_highscore(score):
    highscore = session.get('highscore', 0)
    if score > highscore:
        session['highscore'] = score
    return redirect(url_for('simon_game'))

# Admin login route
@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if 'logged_in' in session and session['logged_in']:
        return render_template('admin.html', click_stats=click_stats)
    
    if request.method == 'POST':
        password = request.form['password']
        if password == ADMIN_PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('admin'))
        else:
            flash('Incorrect password. Please try again.', 'error')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('admin'))

if __name__ == '__main__':
    app.run(
        debug=True,
            host="0.0.0.0",
            port=5000
            )
