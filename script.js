$(document).ready(function () {
  
  var len;
  var results = '';

  var apiKey = '0199141a9f224eff9b5338ed7c26af96';
  var apiEndpoint = 'https://cmodonoghue-421-search-api.cognitiveservices.azure.com/bing/v7.0'

  function apiSearch() {
    var params = {
      "q": $("#query").val(),
      "count": "50",
      "offset": "0",
      "mkt": "en-us"
    };

    $.ajax({
        url: apiEndpoint + "/search?" + $.param(params),
        beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
        },
        type: "GET",
      })
      .done(function (data) {
        len = data.webPages.value.length;
        for (i = 0; i < len; i++) {
          results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
        }

        $('#searchResults').html(results);
      })
      .fail(function () {
        alert("error");
      });
  }

  function getTime() {
    var d = new Date();
    var currentTime = "time: " + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    $('#time').html(currentTime).css('visibility','visible');
    $('#time').dialog();
  }

  $("#submit").click(function() {
    $('#searchResults').css('visibility','visible');
    apiSearch();
  });

  $(".title").click(function() {
    $("body").toggleClass("green");
  })

  $('#timeButton').click(function() {
    getTime();
  })

  // submit search if enter key is pressed
  $(document).keypress(function(e) {
    if(e.which == 13) {
      $('#submit').click();
    }
  });

});

