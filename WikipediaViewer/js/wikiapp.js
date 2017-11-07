/**
 * 
 * @authors dinhnluong
 * @date    2017-11-07 10:52:08
 * @version 1
 */

 var ourSearchQuery = "";

 var ourWikiDataTitle = [];
 var ourWikiDataSnippet = [];
 var ourWikiPageId = [];

 var ourWikiPageSnippet = "";

 var xWikiPages = document.getElementById("wikiPages");

 function getJSON() {

 	if (ourSearchQuery == "") {
 		xWikiPages.innerHTML = '<div class=\"container-fluid text-center\"><div class=\"row\"><div class=\"col-12 well message\"><h3>You must enter a search.</h3></div></div></div></a>';
 		return;
 	}

 	var grabJSON = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + ourSearchQuery + "&inprop=fullurl&srprop=snippet&format=json&callback=?";

 	$.getJSON(grabJSON, function(data) {

 		for (var i = 0; i < data.query.search.length; i++) {
 			
 			ourWikiDataTitle[i] = data.query.search[i].title;
 			ourWikiDataSnippet[i] = data.query.search[i].snippet;
 			ourWikiPageId[i] = data.query.search[i].pageid;

 			ourWikiPageSnippet += '<a href=\"https://en.wikipedia.org/wiki?curid=' + ourWikiPageId[i] + '\" target=\"#\" style=\"text-decoration : none; color : #000000;\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-12 well message\"><h3>' + ourWikiDataTitle[i] + '</h3><h5>' + ourWikiDataSnippet[i] + '</h5></div></div></div></a>';
 		}

 		xWikiPages.innerHTML = ourWikiPageSnippet;

 	});
 }


 $(document).ready(function() { 

 	$('#ourSearchQuery').keydown(function (event) {
 		var keypressed = event.keyCode || event.which;
 		if (keypressed == 13) {

 			ourSearchQuery = document.getElementById("ourSearchQuery").value;
 			ourWikiPageSnippet = "";

 			getJSON();
 		}
 	});


 	$("#search").on("click", function() {

 		ourSearchQuery = document.getElementById("ourSearchQuery").value;
 		ourWikiPageSnippet = "";

 		getJSON();

 	});

 });
