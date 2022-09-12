/**!
 * @license Markdown-Tag - Add Markdown to any HTML using a <md> tag or md attribute
 * LICENSED UNDER GPL-3.0 LICENSE
 * MARKDOWN FLAVOUR: COMMONMARK FLAVORED MARKDOWN. 
 * MORE INFO / FLAVOR OPTIONS CAN BE FOUND AT https://github.com/MarketingPipeline/Markdown-Tag/
 */



async function getData(src) {
	try {
		const res = await fetch(src);
		const jsonResult = await res.text();
		if (jsonResult === "Not Found") {
			throw 'Error rendering markdown contents - file Path Not Found';
		} else {
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

	if (flavor === "GFM") {

		// if attribute type - it requires a class added. 
		if (isAttribute == true) {
			tags.forEach(tag => {
				tag.classList.add("github-md");
			})

			// Stylesheet for attributes
			addCSSforAttributes('https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Elements/stylesheets/github_md_attr.css');

		} else {

			// Stylesheet for tags
			addCSSforTag('https://cdn.jsdelivr.net/gh/MarketingPipeline/Markdown-Elements/stylesheets/github_md.css');

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


var Debug = false;


function renderMarkdown() {


	/* Convert Markdown Attributes */



	if (document.querySelectorAll('[md]').length > 0) {


		MD_TAGs = document.querySelectorAll('[md]');


		markdownToHTML(MD_TAGs, MarkdownFlavor = null, isAttribute = true)




	}




	if (document.querySelectorAll('[github-md]').length > 0) {


		GitHub_MD_TAGs = document.querySelectorAll('[github-md]');


		markdownToHTML(GitHub_MD_TAGs, MarkdownFlavor = "GFM", isAttribute = true)

	}


	/* Convert Markdown Tags */

	if (document.getElementsByTagName("md").length > 0) {

		MDTAGs = document.querySelectorAll('md');


		markdownToHTML(MDTAGs, MarkdownFlavor = null, isAttribute = false)




	}



	if (document.getElementsByTagName("github-md").length > 0) {


		GitHub_MD_TAGs = document.querySelectorAll("github-md");



		markdownToHTML(GitHub_MD_TAGs, MarkdownFlavor = "GFM", isAttribute = false)
	}
}






function loadMarkdownParser() {

	/// Add Markdown Parser To Document
	var script = document.createElement('script');
	script.src = "https://cdn.jsdelivr.net/npm/marked@latest/lib/marked.umd.min.js";

	document.head.appendChild(script); //or something of the likes  




	// On Error Loading Markdown Parser
	script.onerror = function() {

		console.error("Markdown Tag: Error while performing function LoadMarkdownParser - There was an error loading the Markdown Parser")

	}


	/// Markdown Parser Load Successful 
	script.onload = function() {

		// Let the Magic Begin 

		renderMarkdown()

	};
}
loadMarkdownParser()
