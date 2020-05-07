# Emoji-Picker #
### ITMO-WAD 2020 project by: brihoumb firassoboh Kikuchii Mehul9999 ###

>
> Emoji-Picker is a RestAPI to find the correct emoji from a word.
>

## How to use ##
Go on `INSERT_ADDRESS_HERE/` and specify the parameter `?input=""` with the text you want to format with emoji between quotes.  
To works, the words you want to convert to emoji need to be encapsulate via `:` like the following ` I love :duck:`.  
You should get in output the sentence you gave with the appropriate emoji inside.  
If multiple emoji exists, you'll get multiple sentence with different combination of emojis.

## Feature ##
- [x] NodeJS RestAPI backend
  - [ ] `/request`
        Method GET:  
        - parameter: ?input="text with requested :emoji:"
        - return: the sentence formated with emoji
  - [ ] `/synonym`
        Method GET:  
        - parameter: word="word you want to get a synonym"
                     db="database where you want to retrieve the word"
        - return: top 3 most common synonym of the given word
  - [ ] `/search`
        Method GET:  
        - parameter: word="word you want to get the emoji"
                     db="database where you want to retrieve the emoji"
        - return: top 3 most common emoji of the given word
- [ ] Communication with TelegramAPI
  - [ ] Authenticate with TelegramBot
  - [ ] Retrieve text from TelegramBot
  - [ ] Send text to TelegramBot
- [ ] Host RestAPI on server

## Trello ##
[Our Trello link here](https://trello.com/b/Ygz8kBJa/emojipicker).

## Roadmap ##
#### Back-End ####
- Stage 1
  - NodeJS
    - PackageManager
      - npm
    - Framework
      - ExpressJS
      - AxiosJS
    - Testing
      - Jest ?
- Stage 2
  - RESTFul API
  - Regex
  - Docker
- Stage 3
  - SCRUM method

#### Dev-Ops
- Stage 1
  - Operating System
    - Linux
  - CI/CD
    - Jenkins ?
  - Host server
    - Nginx ?
