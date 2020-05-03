---
date: 2020-05-03T21:30:42Z
tags:
- tutorial
- " html"
- seo
draft: false
title: " Schema.org: The Most Popular Web Standard You’ve Never Heard Of \U0001F92B"
description: Schema.org is an open standard for describing rich HTML content. It can
  help you improve your website's SEO and search engine preview links.
heroImage:
  img: "../assets/schema.org-cover.png"
  alt: schema.org
shareImage: ''

---
[Schema.org](https://schema.org) was an _unknown unknown_ to me for most of my time as a frontend developer. I have been building websites since 2010 and it was just over a year ago when I started at Manifold that I learned about its existence. Even as someone who keeps up with modern web development trends, Schema.org flew under my radar for far too long.  Why?

No one talks about it! Ever!

Well, now I am. 

## Overview

Established as an open standard by Google, Microsoft, Yahoo, and Yandex, Schema.org cut its v1 release _waaaay_ back in April 2013. Yes, it has really been around for _that_ long. However, it continues to evolve to support how people use the web in new and unpredictable ways.

So what the heck is it? According to the [Schema.org homepage](https://schema.org):

> Schema.org is a collaborative, community activity with a mission to create, maintain, and promote schemas for structured data on the Internet, on web pages, in email messages, and beyond.

In basic terms: Schema.org helps identify what web content actually means. It builds on the concepts of [semantic HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML "MDN - Semantics in HTML") and gives richer meaning to web content. 

Just like semantic HTML, Schema.org is great for search engine optimization (SEO). By giving more context to your content, search engines can better parse and categorize your content, making it easier for people to find it. Search engines can even use this structured data to create rich previews.

![A Google Search rich preview for ‘Avengers: Endgame’ which shows the film’s rating](../assets/Screen Shot 2020-05-03 at 6.25.36 PM.png)

Another way to think of Schema.org is it’s like [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA "MDN - Web Accessibility, ARIA"), but for SEO instead of accessibility. It doesn’t change the functionality of your website but enhances it for a specific audience (in this case, that audience is search engines).

## Adding Schema.org to HTML Content

Schema.org has standards for several encodings, however, the most likely one you’ll use is _Microdata_, which allows you to directly tag HTML with schema data via HTML attributes.

The API is quite simple. There are just three attributes:

* `itemtype`: Defines the schema of an item.
* `itemscope`: Defines the container of an item.
* `itemprop`: Defines a property on an item.

### Basic Usage

Here’s a simple example using the [Person Type](https://schema.org/Person "Schema.org - Person Type"):

    <div itemscope itemtype="https://schema.org/Person">
    	<img src="/david-leger.png" alt="mid-twenties male with brown hair and blue eyes" itemprop="image" />
    	<h1 itemprop="name">David Leger</h1>
    	<p itemprop="description">
    		Hey! I'm dave.js and I'm from <span itemprop="nationality">Canada</span>. 
    		I love writing <span itemprop="knowsAbout">JavaScript</span>, 
            <span itemprop="knowsAbout">HTML</span>, and 
            <span itemprop="knowsAbout">CSS</span>!
    	</p>
    </div>

The `itemscope` and `itemtype` are placed on the top-level `<div>` so that every `itemprop` enclosed belongs to the Person type.

Notice how `description` wraps two additional `itemprop`s. Regardless of the level, `itemprops`s will apply to the closes ancestor with an `itemscope`. We can also define multiple of the same `itemprop` as shown with `knowsAbout`. 

### Nested Items

What if we want to nest items within an item though? For that, we can define a new `itemscope`. Let’s expand on our Person item and add a [PostalAddress](https://schema.org/PostalAddress "Schema.org - PostalAddress Type").

    <div itemscope itemtype="https://schema.org/Person">
    	<img src="/david-leger.png" alt="mid-twenties male with brown hair and blue eyes" itemprop="image" />
    	<h1 itemprop="name">David Leger</h1>
    	<p itemprop="description">...</p>
    	<address itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    		<span itemprop="streetAddress">1505 Barrington Street</span><br />
    		<span itemprop="addressLocality">Halifax</span><br />
    		<span itemprop="addressRegion">Nova Scotia</span>
    	</address>
    </div>

By adding `itemscope` to the `<address>` element, we are scoping all the `itemprop`s within that tag to the PostalAddress item. The PostalAddress is linked to the Person item by using `itemprop="address"`, without which they would be interpreted as completely separate entities.

### Hidden Data

Sometimes we want to give context to search engines that we don’t necessarily want to display on the page. This can be done using `<meta>` tags. This might seem a bit strange since `<meta>` tags are usually found in the `<head>` of a web page, but [Schema.org recommends using meta tags for implicit content](https://schema.org/docs/gs.html#advanced_missing "Schema.org - Getting started: missing content").

For the Person item, let’s add my nickname (dave.js) using a meta tag:

    <div itemscope itemtype="https://schema.org/Person">
    	<img src="/david-leger.png" alt="mid-twenties male with brown hair and blue eyes" itemprop="image" />
    	<h1 itemprop="name">David Leger</h1>
    	<p itemprop="description">...</p>
    	<address itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">...</address>
    	<meta itemprop="alternateName" content="dave.js" />
    </div>

## Testing Schema.org Items

Testing out your items is simple. Google offers a [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool) to validate your items. It parses your HTML and shows a tree of how the item attributes are interpreted. It also shows errors and warnings for missing properties that are required or recommended for each `itemtype`

Here’s our example parsed with the Structured Data Testing Tool.

![A dashboard with HTML code on the left and a tree of parsed item data on the right.](../assets/Screen Shot 2020-05-03 at 5.44.11 PM.png)

## A Living Standard

Schema.org is an open-source community project. Although it is supported by major companies such as Google, Microsoft, Mozilla, and more, public contributions are encouraged. Although it’s been around since 2013, Schema.org is a living standard that adapts to the needs of the web. For example, recent releases included item types such as [CovidTestingFacility](https://schema.org/CovidTestingFacility "Schema.org - CovidTestingFacility Type") to help with pandemic relief efforts.

To learn more about Schema.org and its usage check out the [docs](https://schema.org/docs/documents.html "Schema.org - Documentation"). There are so many schemas for countless item types and detailed documentation on how to use them.

If you’d like to contribute to Schema.org head over to the [community page](https://www.w3.org/community/schemaorg/ "Schema.org Community Group") to see how you can help.