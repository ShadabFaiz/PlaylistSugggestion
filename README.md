# PlaylistSuggestion

## Installation/deployment instructions

**Prerequisite:** Install the `serverless` at global and configure it to use AWS services.

### Using NPM

- Run `npm i` to install the project dependencies

### Using Yarn

- Run `yarn` to install the project dependencies

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/tracks` route with `GET` method.

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f hello --path src/functions/hello/mock.json` if you're using NPM
- `yarn sls invoke local -f hello --path src/functions/hello/mock.json` if you're using Yarn


Replace `cityName` with `latitude` and `longitude`, to get track suggestion based on geoCordinates.

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions along with services and models.
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions                               # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts                      # `Hello` lambda source code
│   │   │   ├── index.ts                        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json                       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts                       # `Hello` lambda input event JSON-Schema
│   │   │   └── models                          # contains the models
│   │   │   └── services                        # contains the service
│   │   │       └── PlaylistService.class.ts    # is the main service exposed to generate tracks.
│   │   │       └── SpotifyService.class.ts     # is the wrapper class exponsed to use Spotify Web api.
│   │   │
│   │   │
│   │   └── index.ts                            # Import/export of all lambda configurations
│   │               
│   └── libs                                    # Lambda shared code
│       └── apiGateway.ts                       # API Gateway specific helpers
│       └── handlerResolver.ts                  # Sharable library for resolving lambda handlers
│       └── lambda.ts                           # Lambda middleware
│               
├── package.json                
├── serverless.ts                               # Serverless service file
├── tsconfig.json                               # Typescript compiler configuration
├── tsconfig.paths.json                         # Typescript paths
└── webpack.config.js                           # Webpack configuration
```


## Deployment
Assuming you have already installed and configured the serverless, run the below command to deploy:
`sls deploy`. This is deploy the lambda with name: `aws-dev-hello` in region: `us-east-1`. 
You can change the configuration from `serverless.ts`

It is deployed on: https://usk9kqepd8.execute-api.us-east-1.amazonaws.com/dev/tracks?cityName=Patna