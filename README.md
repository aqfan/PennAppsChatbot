# PennAppsChatbot

A facebook messenger bot for the PennApps facebook page. 

### Testing
Go to https://www.facebook.com/Testpennapps-1456157567831462/ and send a message so you can be added as a test user; wait for a confirmation that you have been added. The app is currently going through the approval process so the app may or may not be live when you test it as a public user. It's currently not deployed on PennApps' official page yet since it's in development.

Sample questions and answers:

|Question|Answer|
| --- | --- |
| when are applications due | Applications for non-Penn students are due by November 27th, 11:59PM EST |
| when is the event? | PennAppsXVII is on January 19-21, 2018 |
| Do I need to cover travel? | Not only will we provide you with a weekend's worth of swag, meals, drinks, and snacks and a place to crash when you need a break from coding, we'll even help cover your travel.|

Sample request for mentor:

|Question| Answer| Followup reply | Followup answer|
|---|---| --- | --- |
|I need a mentor | Ok. I can help you find a mentor but first, I need to ask a few questions. What programming language do you need help with?|I'm using *language*| I have found a mentor for you ... or Sorry, but there are no mentors available right now |

Sample request to be added as a mentor:

|Question| Answer| Followup | Followup answer |
|---|---| --- | --- |
|I am a mentor | Ok! What language do you prefer?|I'm using *language*| Thanks! You have been added |
|Add me as a mentor please | Ok! What language do you prefer? |*language*| Thanks! You have been added |

*most commonly used languages are suported

### Current features

* Saves user data upon first time usage
  - facebookID
  - first name
  - last name
  
* Saves user as a mentor if requested
  - facebookID
  - first name
  - last name
  - language of choice

* Allows user to make request for mentor
  - asks for user's language of choice
  - matches user with a mentor
  - gives user mentor's name
  
 * Automatically answers FAQs

### Future features to be implemented

* Allow user and mentor to contact via Messenger

* Subscribe to PennApps news: articles published about PennApps and new social media posts

* Get notifications on dates: application deadlines, reimbursement deadlines, countdown to PennApps

* Submit photos to be featured on the closing video/live twitter feed

### Frameworks used:
* Node.js for backend operations

* Dialogflow (Api.ai) as the natural language processor
  - Will interact directly with the Facebook Messenger Platform to parse clients’ questions and figure out what to reply

* MongoDB
  - For storing the user’s data and storing user data that may be transferred to PennApps

* Express.js server hosted on Heroku

* Facebook Messenger API
