# ShotGrid ↔ Google Sheets Sync (Firebase)

A lightweight integration that enables ShotGrid (SG) users—especially coordinators and production teams—to:

- Push shot/version data from SG to a Google Sheet
- Collect artist feedback and notes in the sheet
- Send those notes back into ShotGrid

Built with Firebase Cloud Functions (Python), the Shotgun API, and Google Apps Script.

---

## 📋 Breakdown

```
google-shotgrid-sheet-send-main/
├── functions/                     # Firebase backend code (Python)
│   ├── main.py                   # Main Flask handler with SG & GSheets integration
│   ├── requirements.txt          # Python dependencies
│   └── willow.json               # 🔥 Will contain your secrets (consider secret manager)
├── google_appscript/             # Google Sheets-side logic in JavaScript
│   ├── menu.js                   # Adds UI to the Sheet
│   ├── note_prep.js              # Prepares notes from Sheet content
│   ├── sendNotes.js              # Sends notes back to ShotGrid
│   ├── util.js                   # Shared helpers
│   ├── version_sort.js           # Sorts versions in Sheet
│   └── sheets_cell_formulae.txt # Spreadsheet formulas
├── firebase.json                 # Firebase config
└── README.md                     # Setup instructions
```

---

## 🔧 Technologies Used

- Firebase Cloud Functions for serverless backend ([Firebase Docs](https://firebase.google.com/docs/functions))
- Shotgun API (`shotgun_api3`) ([SG API Docs](https://help.autodesk.com/view/SGDEV/ENU/?guid=SGDEV_Using_the_Python_API))
- Google Sheets API via `gspread` ([Google Sheets API Docs](https://developers.google.com/sheets/api))
- Google Apps Script frontend ([Apps Script Docs](https://developers.google.com/apps-script))

---

## 🚀 Setup Guide

### Backend Setup (Firebase Functions)

1. **Clone the repo** and create a Python virtual environment:
    ```bash
    cd functions
    python3.10 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

2. **Prepare a `.env` file** in the `functions/` directory to store your credentials:
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

4. **Check logs** during development and debugging:
    ```bash
    firebase functions:log
    ```

---

### Google Sheets Integration

1. Open your Google Sheet
2. Navigate to `Extensions > Apps Script`
3. Copy over the JavaScript files from `google_appscript/`:
    - `menu.js` for the custom Sheet menu
    - `sendNotes.js`, `note_prep.js`, `util.js`, etc.
4. Save the project and click **Deploy > Test deployments** or bind to your function endpoint.

---

## 📚 Further Reading

- **ShotGrid Action Menu Items**:
  [ShotGrid Developer Docs – Action Menu Items](https://help.autodesk.com/view/SGDEV/ENU/?guid=SGDEV_Using_Action_Menu_Items)

- **Firebase Cloud Functions (Python)**:
  [Firebase Functions (2nd Gen) Docs](https://firebase.google.com/docs/functions/get-started)

- **Google Sheets API**:
  [Sheets API Overview](https://developers.google.com/sheets/api/guides/concepts)

- **Google Apps Script for Sheets**:
  [Apps Script for Google Sheets](https://developers.google.com/apps-script/guides/sheets)

---

## 🧾 License

MIT License. See `LICENSE` file.
