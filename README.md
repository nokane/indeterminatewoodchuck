# Supportal

> A video customer support system for e-commerce businesses.

## Team

  - __Product Owner__: Niall O'Kane
  - __Scrum Master__: Brett Kan
  - __Development Team Members__: John Paulino, Leon Yip

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.12.7
- Postgres 4.4.0
- Express 4.13.1
- React 0.13.3

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Server Environment Setup

#### Description

Follow the below directions to use Postgres for the development and test environments.

#### Install Postgres

Install the Postgres App from the following location: [http://postgresapp.com](http://postgresapp.com/)

Follow the list of directions at [http://postgresapp.com/documentation/cli-tools.html](http://postgresapp.com/documentation/cli-tools.html) to setup your $PATH

#### Install Sequelize-CLI

```shell
npm install -g sequelize-cli
```

### Migrate Postgres DB for the development and test environments.

Run the below command:
```shell
gulp setup —user MAC_USERNAME
```

Make sure to switch out MAC_USERNAME with your Mac's username

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
