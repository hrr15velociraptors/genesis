# Project Genesis

> MEAN stack, WebRTC-based video-auction webapp

## Team

  - __Product Owner__: Artem Svjatickis
  - __Scrum Master__: Nick Vinson
  - __Development Team Members__: Jonathan Huang, Mher Khanoyan

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage <a id="usage"></a>

> [WebRTC](https://webrtc.org/) is a powerful, TCP-based, peer-2-peer communication technology. Here, we rely on the PubNub API
> to do the heavy lifting video broadcasting as we focus our scope on building out the client-side of the auction web app.
> [Passport](http://passportjs.org/) was integrated to satisfy client authentication standards.

## Requirements <a id="requirements"></a>

- Node 4.4.2
- Mongoose ^4.4.11
- Passport ^0.3.2
- MongoDB
- [PubNub](https://www.pubnub.com/docs/web-javascript/data-streams-publish-and-subscribe)
  + Developer publish and subscribe [API keys](https://www.pubnub.com/docs): 
  ``` javascript
  var publish_key = process.env.PUBNUB_PUBLISH_KEY;
  var subscribe_key = process.env.PUBNUB_SUBSCRIBE_KEY;
  ```

## Development <a id="development"></a>

### Installing Dependencies <a id="installing-dependencies"></a>

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Tasks <a id="tasks"></a>

From within the root directory:

1. Create a bare `.env` file
1. Include your [publish/subscribe keys](#requirements) as key=value pairs

Finally,

```sh
heroku local
```

## Team <a id="team"></a>

+ Artem "Authentication" Svjatickis
  - A lean, mean, authentication-hungry machine, Artem enjoys long walks on the
    beach discussing ways to hack hollow security systems over vodka.

+ Mher "Monster" Khanoyan
  - A champion of all-nighters, Mike takes working hard to the extreme with
    all-time favorites Monster and Red Bull. You'll never catch him taking a nap.

+ Jonathan "JavaScript" Huang
  - Angular directives? Bootstrap? Vodka? He'll have ECMAScript5 with a healthy pitch of vanilla, shaken, not stirred.

+ Nicolas "Nix" Vinson
  - Looking to play musical chairs integrating strange APIs? Nick is your guy.

### Roadmap <a id="roadmap"></a>

View the project roadmap [here](https://github.com/hrr15velociraptors/genesis/issues)


## Contributing <a id="contributing"></a>

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.