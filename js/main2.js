(function() {

    console.log("Working...")

    window.onload = function() {
        var instagramAPI = "https://api.instagram.com/v1/users/889248756/media/recent?client_id=153b1d525554479f901223b52b75e1d0&count=24";
        var nextURL;
        var JSON;

        function ajaxCall(URL) {
            $.ajax({
                    type: "GET",
                    dataType: 'jsonp',
                    url: URL
                })
                .done(function(data) {
                    nextURL = data.pagination.next_url;
                    //console.log(nextURL);
                    //append(data);
                    JSON = data;
                    //console.log(data);
                    buildElements(JSON);
                })
                .fail(function() {
                    alert("Unable to load Instagram Posts");
                });
        };

        function buildElements(JSON) {
            $.each(JSON.data, function(index, el) {
                $('<img />').attr({
                    src: el.images.low_resolution.url
                }).appendTo($('<a />').attr({
                    href: el.images.standard_resolution.url
                }).hide().appendTo($('#instafeed')));
            });
        };

        ajaxCall(instagramAPI);

        $("#loadMore").on("click", function() {
            $('#instafeed a').show();
        })

    };
})();
