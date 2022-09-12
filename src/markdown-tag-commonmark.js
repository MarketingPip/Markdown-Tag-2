/**!
 * @license Markdown-Tag - Add Markdown to any HTML using a <md> tag or md attribute
 * LICENSED UNDER GPL-3.0 LICENSE
 * MARKDOWN FLAVOUR: COMMONMARK FLAVORED MARKDOWN. 
 * MORE INFO / FLAVOR OPTIONS CAN BE FOUND AT https://github.com/MarketingPipeline/Markdown-Tag/
 */


// To Enable Debug Messages - set this to true
var DebugMarkdownTag = false;

/* Console Log Debbuger */
function DEBUG(msg) {
	if (DebugMarkdownTag === true) {
		console.log(msg)
	}
}

/* Fetch MD files from URL or Path */
async function getData(src) {
	try {
		DEBUG("Fetching File From URL or Path")
		const res = await fetch(src);
		const jsonResult = await res.text();
		if (jsonResult === "Not Found") {
			DEBUG("Error rendering content -  file path was not found")
			throw 'Error rendering markdown contents - file Path Not Found';
		} else {
			DEBUG("File was loaded successfully")
			return jsonResult
		}


	} catch (error) {
		return error;
	}
}




/* Add Github CSS  */

var Tag_CSSAdded = false;
var Attribute_CSSAdded = false;

function addCSSforTag(fileName) {
	if (Tag_CSSAdded == false) {
		DEBUG("Added CSS for Tag(s)")
		var head = document.head;
		var link = document.createElement("link");

		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = fileName;

		head.appendChild(link);
		Tag_CSSAdded = true

	}



}

function addCSSforAttributes(fileName) {
	if (Attribute_CSSAdded == false) {
		DEBUG("Added CSS for Attribute(s)")
		var head = document.head;
		var link = document.createElement("link");

		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = fileName;

		head.appendChild(link);
		Attribute_CSSAdded = true

	}
}


function markdownToHTML(tags, flavor, isAttribute) {
	DEBUG("Converting Markdown To HTML")
	if (flavor === "GFM") {

		// if attribute type - it requires a class added. 
		if (isAttribute == true) {
			tags.forEach(tag => {
				tag.classList.add("github-md");
			})

			// Stylesheet for attributes
			addCSSforAttributes('https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Tag/stylesheets/github_md_attr.min.css');

		} else {

			// Stylesheet for tags
			addCSSforTag('https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Tag/stylesheets/github_md.min.css');

		}

	}


	tags.forEach(tag => {
		if (tag.getAttribute("src")) {
			// load file / url content
			getData(tag.getAttribute("src")).then(data => {
				if (data instanceof Error) {
					// error fetching file
					tag.innerHTML = marked.parse("Error rendering file to markdown")
				} else {
					// there was NOT an error fetching file / URL content
					tag.innerHTML = marked.parse(data)
				}
			})

		}
		// Tag does NOT have src attribute
		else {
			// render markdown content in md tag or attribute
			tag.innerHTML = marked.parse(tag.innerHTML)
		}

	});
}



function renderMarkdown() {


	/* Convert Markdown Attributes */



	if (document.querySelectorAll('[md]').length > 0) {

		DEBUG("MD attribute(s) were found, coverting content to Markdown")
		MD_TAGs = document.querySelectorAll('[md]');


		markdownToHTML(MD_TAGs, MarkdownFlavor = null, isAttribute = true)




	}




	if (document.querySelectorAll('[github-md]').length > 0) {

		DEBUG("github-md attribute(s) were found, coverting content to Markdown")

		GitHub_MD_TAGs = document.querySelectorAll('[github-md]');


		markdownToHTML(GitHub_MD_TAGs, MarkdownFlavor = "GFM", isAttribute = true)

	}


	/* Convert Markdown Tags */

	if (document.getElementsByTagName("md").length > 0) {

		DEBUG("md tag(s) were found, coverting content to Markdown")

		MDTAGs = document.querySelectorAll('md');


		markdownToHTML(MDTAGs, MarkdownFlavor = null, isAttribute = false)




	}



	if (document.getElementsByTagName("github-md").length > 0) {

		DEBUG("github-md tag(s) were found, coverting content to Markdown")

		GitHub_MD_TAGs = document.querySelectorAll("github-md");



		markdownToHTML(GitHub_MD_TAGs, MarkdownFlavor = "GFM", isAttribute = false)
	}
}






function loadMarkdownParser() {
	DEBUG("Adding Markdown Parser To HTML document")
	/// Add Markdown Parser To Document
	var script = document.createElement('script');
	script.src = "https://cdn.jsdelivr.net/npm/marked@latest/lib/marked.umd.min.js";

	document.head.appendChild(script);




	// On Error Loading Markdown Parser
	script.onerror = function() {

		console.error("Markdown Tag: Error while performing function LoadMarkdownParser - There was an error loading the Markdown Parser")

	}


	/// Markdown Parser Load Successful 
	script.onload = function() {

		// Let the Magic Begin 
		DEBUG("Markdown Parser Load Successful")
		renderMarkdown()

	};
}
loadMarkdownParser()
