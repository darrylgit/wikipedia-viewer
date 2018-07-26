$(document).ready(() => {

  $(document).keypress(function (e) {



    var key = e.which;
    if(key == 13)  // the enter key code
    {


      $(".result").remove(); //removes any results from the previous search

      var searchQuery = $('#searchbar').val(); //sets a variable eqaul to whatever's in the search bar
      var api = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchQuery;
      var proxyurl = "https://cors-anywhere.herokuapp.com/" //proxy to prevent No-Access-Control-Allow-Origin errors


      $.ajax({
        url: proxyurl + api,
        success: function(response) {

          //$('#results').append($("<div class='result'><p style='font-size:36px;'><span style='font-size:48px;'>&epsilon;</span>==D- -</div>"));

          for (i = 0; i < response[1].length; i++){
            var articleTitle = response[1][i];
            var description = response[2][i];
            var link = response[3][i];

            var disamRegex = /may\srefer\sto:/;
            if (disamRegex.test(description)){
              var description = 'Multiple results with the title "' + searchQuery + '." You can follow this link to the disambiguation page.';
            }

            $('#results').append($("<div class='result'><a href=" + link + " target='_blank'><strong>" + articleTitle + "</strong></a> </br>" + description + "</div>"));
          }
        }
      });

      return false;
    }
  });





});
