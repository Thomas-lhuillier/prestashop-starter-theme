_Forked from [PrestaShop/StarterTheme](https://github.com/PrestaShop/StarterTheme)_

 A revisited (opinionated) Prestashop Starter theme, with Webpack 4, full ES6 and scss tool stack, optimized production mode and more.

# Revamped Starter Theme

[Starter Theme](http://build.prestashop.com/news/starter-theme-kickoff/) is a tool for designer to work efficiently,
it includes only what is mandatory:
* a list of templates
* a configuration file
* the development assets with minimal javascripts and stylesheets

## Installation

Note the Starter Theme is only available for PrestaShop 1.7+.

Clone this repository and move the `StarterTheme` into `themes` folder.

```bash
# in PrestaShop folder
$ cd themes
$ git clone https://github.com/PrestaShop/StarterTheme.git YOUR_THEME_NAME
```

## How to use the starter theme to create a theme

### Step 1: create `theme.yml`

First of all, you need to rename `config/theme.dist.yml` to `config/theme.yml` and edit it according to your theme name.

```
name: YOUR_THEME_DIRECTORY_NAME
display_name: YOUR THEME NAME
version: 1.0.0
author:
  name: "PrestaShop Team"
  email: "pub@prestashop.com"
  url: "http://www.prestashop.com"

meta:
  compatibility:
      from: 1.7.0.0
      to: ~
```

See [theme.yml description](https://github.com/PrestaShop/StarterTheme/blob/develop/doc/theme.yml.md)

**NOTE:** Please note that `/config/theme.yml` is ignored by git (see [.gitignore](https://github.com/PrestaShop/StarterTheme/blob/master/.gitignore))

### Step 2: Manage assets

The Starter Theme contains the development files in the `_dev` folder.
Install the dependencies using `npm`:

```bash
$ cd _dev && npm install
```

Now the dependencies are installed and correctly set up, you can customise theses files.

> If you need to add image files, you can create `img` folder in `_dev` folder.

As stylesheets and javascript files are compiled and minified, you may wonder how to
build new version of theses files after your modifications. You can use npm to check
for any update and update the production version used by PrestaShop (localized in `assets` folder).

```bash
$ npm run watch
```

Note: You should probably **start by removing all existing styles**.
