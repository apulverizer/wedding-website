"""`main` is the top level module for your Flask application."""
from datetime import timedelta
import os
# Import the Flask Framework
from flask import Flask, Response, redirect, url_for, request, session, abort, render_template, flash
from flask.ext.login import LoginManager, UserMixin, login_required, login_user, logout_user 

# Configure the flask app
app = Flask(__name__)
app.config.update(
    DEBUG = False,
    SECRET_KEY = 'wedding_website_secret_key',
    TEMPLATES_AUTO_RELOAD = True
)

# Configure login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

class User(UserMixin):
    pass
    
# Our mock database.
users = ["DACKS2017"]


@login_manager.user_loader
def user_loader(id):
    if id not in users:
        return
    user = User()
    user.id = id
    return user


@login_manager.request_loader
def request_loader(request):
    id = request.form.get('id')
    if id not in users:
        return
    user = User()
    user.id = id
    # if the name is correct (basically a password)
    user.is_authenticated = True
    return user
        
        
@app.route('/')
@login_required
def main():
    """Return a friendly HTTP greeting."""
    return render_template("index.html")

    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html")

    id = request.form['id']
    if id in users:
        user = User()
        user.id = id
        login_user(user)
        return redirect(url_for('main'))
    
    flash("Invalid Credentials")
    return redirect(url_for('login'))
    
@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('main'))
    
    
@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500
    
@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(days=30)
    
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")
