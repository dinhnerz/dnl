/**
 * 
 * @authors dinhnluong
 * @date    2017-11-04 22:52:56
 * @version 1 */


 var quote;
 var author;

 function getQuote() {
  $.ajax({
      type: "GET",
      url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
      dataType: "jsonp",
      crossDomain: true,
      jsonp: "jsonp",
      success: function(data) {

        quote = data.quoteText;
        author = data.quoteAuthor;

        document.getElementById("quotes").innerHTML = "❝ " + quote;
        if (author != "") { document.getElementById("author").innerHTML = "- " + author; }

    }
});
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
