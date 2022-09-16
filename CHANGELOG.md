# Changelog

All notable changes to this project are documented in this file.


## [1.0.4] - 2022-09-DATEADD

This release brings major improvements to <b><i>Markdown Tag</i></b>. Code quality & much more has been significantly improved. Steps have been taken to try & prevent any breaking changes across any sites / users etc using this JavaScript library.

### Added

- Feature to render <code>md</code> &<code>github-md</code> attributes to markdown. 
- Feature to render files to markdown from a URL or path.
- Improved option for syntax highlighting.
- Added <code>md-rendered</code> attribute after contents have been rendered. (for <b>FOUC</b>)

### Removed 

- Changes to parser option settings.
  - To use GFM you MUST use <code>markdown-tag-gfm.js</code>


### Note(s)

- To avoid any breaking changes
  - Re-structured repo (moved files)
- <code>markdown-tag-Github.js</code> has been renamed to <code>markdown-tag-gfm.js</code>



## [1.0.3] - 2022-09-07

### Added

- New CSS for <code>github-md</code>

### Removed 

- Old CSS for <code>github-md</code>



## [1.0.3] - 2022-07-28

### Added

- Dynamic loading of Markdown Parser script 
- Added syntax highlighter option for <code>github-md</code> tag

### Removed 

- Markdown Parser directly inside the script. 


## [1.0.2] - 2022-07-19

### Added

- Added function to render new tags added to DOM


## [1.0.1] - 2022-07-18


### Added

- New version of Showdown.JS 
- Fix to only apply CSS stylesheet once

## [1.0.0] - 2022-05-22

Initial Release.


<!--
These Markdown anchors provide a link to the diff for each release. They should be
updated any time a new release is cut.

[Unreleased]: /
[1.0.0]: /v0.0.1

-->
