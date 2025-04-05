# ShotGrid ↔ Google Sheets Sync (Firebase)

A lightweight integration for ShotGrid (SG) and Google Sheets, enabling teams to:
- Push shot data from SG to a Google Sheet
- Collect notes from artists in the sheet
- Sync those notes back to SG

## 🔧 Technologies
- Firebase Functions (Python via `firebase-functions` SDK)
- Shotgun API (`shotgun_api3`)
- Google Sheets API (`gspread`)
- Google Apps Script for sheet UI + behavior

---

## 🚀 Setup Guide

### Backend Setup (Firebase Functions)

1. **Clone this repo** and create a virtual environment:
    ```bash
    cd functions
    python3.10 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

2. **Create a file named `.env`** in `functions/` with:
    ```env
    SG_API_KEY=your_shotgrid_script_key
    SG_URL=https://yourstudio.shotgrid.autodesk.com
    SG_SCRIPT_NAME=your_script_name
    GOOGLE_CREDENTIALS_JSON=path/to/your/google/creds.json
    ```

3. **Deploy to Firebase**:
    ```bash
    firebase deploy --only functions
    ```

4. **Check logs**:
    ```bash
    firebase functions:log
    ```

---

### Google Sheets Setup

1. Open your Google Sheet
2. Navigate to `Extensions > Apps Script`
3. Copy the contents of `google_appscript/*.js` files into the Apps Script editor
4. Save & Deploy as a Web App or link to the Firebase backend via a custom function

---

## 🔐 Security Guidelines

- Never commit `willow.json` or any secrets.
- Use environment variables or Google Secret Manager in production.
- Validate incoming SG requests to prevent spoofing.

---

## 🧾 License

MIT License. See `LICENSE` file.
