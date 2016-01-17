Put deployment-specific settings here and feed them to Meteor with

    meteor run --settings=private/local.json

##Twitter

In order to enable Twitter integration create a new app at 
https://apps.twitter.com/ and put the the following in `private/local.json':

    "twitter": {
      "consumer_key": "",
      "consumer_secret": "",
      "access_token_key": "",
      "access_token_secret": ""
    }


##Slack

In order to enable Slack integration create a new bot for your team and put the 
the following in `private/local.json':

    "slack": {
      "token": "",
      "channel_name": "streaming"
    }
