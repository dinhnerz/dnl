/**
 * 
 * @authors dinhnluong
 * @date    2017-11-04 22:52:56
 * @version 1 */


 var quote;
 var author;

function getQuote() {
    $.ajax({
    type: 'GET',
    url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=jsonpData',
    crossdomain: true,
    async: true,
    jsonp: "jsonp",
    dataType: 'jsonp',
    });
}

jsonpData = function(data) {

    quote = `${data[0].content}`;
    author = `${data[0].title}`; 

    quote = quote.substring(3);
    quote = quote.substring(0, quote.length - 6);

    document.getElementById("quotes").innerHTML = "❝ " + quote;
    document.getElementById("author").innerHTML = "- " + author;

}

 $(document).ready(function() {

    $.ajax({ cache: false });
    getQuote();

 	$("#getQuote").on("click", function() {

        getQuote();

	});


    $(".twitter-share-button").on("click", function() {

        $(this).attr("href", "https://twitter.com/intent/tweet?text=" + quote + " - " + author);

    });

 });
