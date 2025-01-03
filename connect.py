from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pymysql
import os

pymysql.install_as_MySQLdb()

app = Flask(__name__, template_folder='templates')  # Explicitly define template folder
app.secret_key = 'your_secret_key'

# Print the working directory for debugging
print("Current working directory:", os.getcwd())

# Set up the MySQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/KidocodeLoginSystem'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.Enum('Student', 'Intern'), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

# Render the login page
@app.route('/')
def index():
    return render_template('login.html')  # This should now work!

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Validate if username and password are provided
    if not username or not password:
        flash('Both fields are required!', 'error')
        return redirect(url_for('index'))

    # Check if the user exists in the database
    user = User.query.filter_by(username=username).first()

    if user:
        # If the user exists, check if the password is correct
        if user.password == password:  # If using plain text passwords (not recommended)
            session['username'] = username  # Store username in session
            session['user_type'] = user.user_type  # Optional: Store user type if needed
            return render_template(
                'login.html',
                login_success=True,
                username=username
            )
        else:
            flash('Invalid password. Please try again.', 'error')
            return render_template('login.html', login_error=True)
    else:
        flash('Username does not exist. Please try again.', 'error')
        return render_template('login.html', login_error=True)

@app.route('/home')
def home():
    if 'username' in session:
        username = session['username']  # Retrieve username from session

        # Get the current date and time
        now = datetime.now()
        current_date = now.strftime("%A, %B %d, %Y")  # Format: "Weekday, Month day, Year"
        current_time = now.strftime("%I:%M:%S %p")  # Format: "HH:MM:SS AM/PM"

        return render_template('home.html', username=username, current_date=current_date, current_time=current_time)
    else:
        flash('You need to log in first!', 'error')
        return redirect(url_for('index'))
    
@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, ssl_context=('cert/cert.pem','cert/key.pem'))
