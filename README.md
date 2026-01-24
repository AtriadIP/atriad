# Atriad IP Website - Quick Instructions for Anu

## What to do (simple steps)
1. Extract the ZIP file.
2. Open `index.html` in Google Chrome.
3. Use the website normally from there.

Note: Reviews load from Google Sheets only when the site is hosted (not when opened as a local file). If you don't have Python or a local server, ask Palvi for the live URL and open that instead.

## Important
- Do not open other HTML files directly. Always start from `index.html`.
- All service pages are inside the `pages/` folder. This is expected.

## Form responses (Google Forms)
- Use the Google Forms/Sheets link I shared with you to view responses.
- I have already shared access to you on the Google Form/Sheet link.
- To see responses, open the Google Form or the linked Google Sheet and sign in with the account that has access.
- If you cannot see responses, tell me and I will re-share the access.

## If something looks wrong
- Refresh the page.
- If the form is not working or the page looks broken, please message me with a screenshot.

## If you need to see reviews (simple way)
Reviews only show when the site is opened through a small local server. Here is the easiest way:

1) Open the **Terminal** app.
2) Type this and press Enter:
```
python3 --version
```
- If you see a version number, Python is already installed. Go to step 3.
- If you get an error, install Python:
  - Open this link: https://www.python.org/downloads/macos/
  - Download and install **Python 3**

3) In Terminal, type this and press Enter:
```
cd "/path/to/atriad final"
python3 -m http.server 8000
```
4) Open **Google Chrome** and go to:
```
http://localhost:8000
```

If this feels hard, ask Palvi for the live website link and open that instead.
