---
date: 2020-05-14T03:55:41Z
tags:
- graphql
- " tutorial"
draft: true
title: Some Arbitrary Number of Lesser-Known GraphQL Features
description: Exploring some lesser-known GraphQL including fragments, field aliases,
  and default variables.
heroImage:
  img: ''
  alt: ''
shareImage: ''

---
Every time you turn your head some new web technology sponateously spawns into existance. It seemed like just yesterday, GraphQL was one of them. In reality, GraphQL has been out in the wild for about five years. Oh how the precious years escape us...

Despite it being relatively old news, it's still quite new to the vast majority of software developers. If you're one of those developers, just dipping your toes into the pond of GraphQL -- _RUN! IT's A TRAP!_ Nah, just kidding. GraphQL is great! Hope I didn't scare you away. 

This list includes only client-side features so they're usable with any GraphQL endpoint. No special changes need to be made to the server for these to work. (Perhaps lesser-known GraphQL server features will be my next blog post.)

Anyway, enough rambling. Here's a list of neat lesser-known GraphQL features that I think are pretty neat!

For the examples in this post, we'll be using the [SpaceX GraphQL API](https://api.spacex.land/graphql/).

## 1. Field Aliases

Aliases allow you to rename a field in your query. Here's a simple query that renames the `ceo` field to `bossMan`:

```graphql
query CEO {
  company {
    bossMan: ceo
  }
}
```

which resolves the following result:

```json
{
  "data": {
    "company": {
      "bossMan": "Elon Musk"
    }
  }
}
```

This is a trivial example, so let's do something more useful with it now.

Aliasing can also be used to get different sets of data from the same GraphQL field. For example, let's get two rockets and rename them based on their `id`:

```graphql
query Ships {
  falcon1: rocket(id: "falcon1") {
    id
    active
    height {
      meters
    }
  }
  falconheavy: rocket(id: "falconheavy") {
    id
    active
    height {
      meters
    }
  }
}
```

which resolves to the following result:

```json
{
  "data": {
    "falcon1": {
      "id": "falcon1",
      "active": false,
      "height": {
        "meters": 22.25
      }
    },
    "falconheavy": {
      "id": "falconheavy",
      "active": true,
      "height": {
        "meters": 70
      }
    }
  }
}
```

## Fragments

Fragments let you reuse common pieces of a query or mutation. To demonstrate this, we can refactor our last example to reuse the ship details.

```graphql
fragment shipDetails on Rocket {
  id
  active
  height {
    meters
  }
}

query Ships {
  falcon1: rocket(id: "falcon1") {
    ...shipDetails
  }
  falconheavy: rocket(id: "falconheavy") {
    ...shipDetails
  }
}
```

Notice that for fragments, we need to use `on [Type]` to specify which fields are available on the fragment. This helps GraphQL autocomplete your fragment, and more importantly, catch errors when you try to use a fragment in a type that doesn't match.

## 3. Default Variables

When writing your queries for use in an app, you'll typically want to pass variables into it so you can change the query at runtime. Just like default function paramaters in JavaScript, GraphQL can also take advantage of default values.

Let's query a given rocket and set the default rocket to `"falconheavy"` because it's dope AF.

```graphql
query Ship($rocketId: ID! = "falconheavy") {
  rocket(id: $rocketId)  {
    id
    active
    height {
      meters
    }
  }
}

```


## Bonus: Variables Within Fragments

Yes! Variables can even be used within fragments. This seems a bit odd to me because the usage of the variable looks like it's out of scope of where it's defined, but that's just how it works.

```graphql
fragment ship on Query {
  rocket(id: $rocketId)  {
    id
    active
    height {
      meters
    }
  }
}
query Ship($rocketId: ID = "falconheavy") {
  ...ship
}
```
