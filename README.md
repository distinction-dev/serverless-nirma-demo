# AWS Node.js Typescript Template for creating TS projects

This project is used as inspiration and boilerplate for creating serverless framework applications using typescript

## Template features

- Uses ESBuild
- Function version pruning
- Automated Deployments with Github Actions

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `lib` - containing shared code base between your lambdas

```txt
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── hello.ts
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
├── package.json
└── tsconfig.json               # Typescript compiler configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda.
