(function() {

    console.log("Working...")

    window.onload = function() {
        var instagramAPI = "https://api.instagram.com/v1/users/889248756/media/recent?client_id=153b1d525554479f901223b52b75e1d0&count=24";
        var nextURL;

        function append(JSON) {
            $.each(JSON.data, function(index, el) {
                $('<img />').attr({
                    src: el.images.low_resolution.url
                }).appendTo($('<a />').attr({
                    href: el.images.standard_resolution.url
                }).appendTo($('#instafeed')));
            });
        };

        function loadMore() {
            $.ajax({
                    type: "GET",
                    dataType: 'jsonp',
                    url: nextURL
                })
                .done(function(JSON) {
                    nextURL = JSON.pagination.next_url;
                    //console.log(nextURL);
                    append(JSON);


                })
                .fail(function() {
                    alert("Unable to load more Instagram Posts");
                });
        };

        $.ajax({
                type: "GET",
                dataType: 'jsonp',
                url: instagramAPI
            })
            .done(function(JSON) {
                nextURL = JSON.pagination.next_url;
                //console.log(nextURL);
                append(JSON);


            })
            .fail(function() {
                alert("Unable to load Instagram Posts");
            });

        $("#loadMore").on("click", function() {
            loadMore();
        })
    };
})();
