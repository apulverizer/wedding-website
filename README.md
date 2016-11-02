# wedding-website
This is the custom website for our wedding in 2017. 

The website can be viewed at [here](https://weddingwebsite-145723.appspot.com/).

It was primarily built using Flask, Bootstrap, and HTML/CSS. The site has simple password protection so that uninvited people cannot see the site.

The app is hosted on Google App Engine. Configuration details can be found [here](https://cloud.google.com/appengine/docs/python/getting-started/python-standard-env).

## Installation & Deployment

1. Clone the repo
2. Make sure your google app engine environment is configured with the project.
3. Make any changes
4. Deploy to GAE

```
gcloud app deploy
```