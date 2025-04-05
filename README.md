
# baked-google-sheets-sg-sync-firebase
 For coordinators sending shots and receiving notes

This is a python flask script hosted on Firebase that accepts HTTPS POST requests from Shotgrid's Action Menu Items. It links with `gspread` to create and edit google sheets.

## Environment Build

Create virtual env and install dependencies:
`cd functions`
`python3.10 -m venv venv`
`. venv/bin/activate`
`python3.10 -m pip install -r requirements.txt`

## Essential Commands

Deploy to firebase:
`firebase deploy --only functions`

Check logs:
`firebase functions:log`
