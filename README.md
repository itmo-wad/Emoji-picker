# Emoji-Picker #
### ITMO-WAD 2020 project by: brihoumb firassoboh Kikuchii Mehul9999 ###

>
> Emoji-Picker is a RestAPI to find the correct emoji from a word.
>

---

# Telegram Bot #

## How to use ##
You need to call the bot name @pickmoji_bot on telegram.  

## Feature ##
- `/list:`&nbsp;&nbsp;Create a keyboard with all available emojis.
- `/search:`&nbsp;&nbsp;Search given emoji
- `/emojis:`&nbsp;&nbsp;Change every words surrounded by ':' to their corresponding emoji if they exists.

---

# RESTFul API #

## How to use ##
Go on `INSERT_ADDRESS_HERE/` and specify the parameter `?input=""` with the text you want to format with emoji between quotes.  
To works, the words you want to convert to emoji need to be encapsulate via `:` like the following ` I love :duck:`.  
You should get in output the sentence you gave with the appropriate emoji inside.  
If multiple emoji exists, you'll get multiple sentence with different combination of emojis.

## Feature ##
- [x] NodeJS RestAPI backend
  - [x] `/request`
        Method GET:  
        - parameter: ?input="text with requested :emoji:"
        - return: the formatted sentence with emojis
  - [x] `/search`
        Method GET:  
        - parameter: word="word you want to get the emoji"
        - return: searched emoji if exists otherwise "Emoji not found!"
  - [x] `/list`
        Method GET:
        - return: list of all available emojis
- [x] Communication with TelegramAPI
  - [x] Authenticate with TelegramBot
  - [x] Retrieve text from TelegramBot
  - [x] Send text to TelegramBot
- [ ] Host RESTFul API on server with VPS

---

# Trello #
[Our Trello link here](https://trello.com/b/Ygz8kBJa/emojipicker).

# Roadmap #
### Back-End ###
- Stage 1
  - NodeJS
    - CodeStyle
      - ES6
    - PackageManager
      - npm
    - Framework
      - ExpressJS
- Stage 2
  - RESTFul API
  - Regex
