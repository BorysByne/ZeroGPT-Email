# Gmail AI Content Filter

## Overview

The Gmail AI Content Filter is a Google Apps Script project that automatically scans incoming emails for AI-generated content using the ZeroGPT API. When AI-generated content is detected, the script applies a label to the email for easy identification and organization.

You can install it org-wide to protect your users from AI-assisted phishing or spam.

## Features

- Automatically scans new emails in your Gmail inbox
- Uses the ZeroGPT API to detect AI-generated content
- Labels emails containing AI-generated content
- Runs every minute to catch new emails in near real-time

## Prerequisites

Before you begin, ensure you have the following:

- A Google account with Gmail
- Access to Google Apps Script
- A ZeroGPT API key (sign up at [https://www.zerogpt.com/](https://www.zerogpt.com/))

## Installation

1. Go to [Google Apps Script](https://script.google.com/) and create a new project.
2. Copy the contents of `Code.gs` from this repository into the script editor.
3. Replace `'YOUR_ZEROGPT_API_KEY'` with your actual ZeroGPT API key.
4. Save the project (File > Save).

## Configuration

1. Run the `setupTrigger()` function to create a time-based trigger:
   - In the script editor, select `setupTrigger` from the function dropdown.
   - Click the "Run" button (play icon).
   - You'll be asked to authorize the script. Follow the prompts to give it the necessary permissions.

2. (Optional) Adjust the time window in the `processRecentEmails()` function if you want to scan emails from a different time range.

## Usage

Once installed and configured, the script will automatically run every minute to process new emails. You don't need to do anything else - it works in the background.

To manually run the script:

1. Open the Google Apps Script project.
2. Select `processRecentEmails` from the function dropdown.
3. Click the "Run" button (play icon).


## Customization

You can customize the script by:

- Changing the label name (default is "AI")
- Adjusting the time window for scanning emails
- Modifying the criteria for what's considered AI-generated content (the current threshold is 50% confidence)

## Limitations

- The script runs every minute, which is the shortest interval allowed by Google Apps Script. There might be a slight delay in processing very recent emails.
- You need some ZeroGPT credits (but it is super cheap to run so 5$ should last like a year).
- The script only processes unread emails in the inbox. It won't retroactively scan old or read emails.

## License

This project is licensed under the MIT License.

## Disclaimer

This script is provided as-is, without any warranties. Use at your own risk. Always review and understand scripts before running them on your Google account.