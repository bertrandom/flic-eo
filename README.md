# flic-eo
HTTP endpoint for a Flic button to hit to either turn an Electric Objects on, off, or shuffle artwork within a playlist

## usage

Copy `config/default.json5` to `config/local.json5` and set the appropriate IDs.

Make sure [eo-auth](https://www.npmjs.com/package/eo-auth) is configured for the user running the web server before using.

Configure an "Internet Request" in Flic and point it toward your server, setting the secret to the one specified in your config file:
![IMG_3123](https://user-images.githubusercontent.com/57770/142985854-dddb99f7-1205-40e4-9787-1c56ff032485.PNG)
