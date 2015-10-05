//TODO: IIFE or Revealing module pattern
var mardyApp = {
    url: "https://api.instagram.com/v1/users/889248756/media/recent?client_id=153b1d525554479f901223b52b75e1d0&count=24",
    urlNext: "",    
    firstLoad: true,
    $elements: [],
    ajaxReq: function(URL) {
        $.ajax({
                type: "GET",
                dataType: 'jsonp',
                url: URL
            })
            .done(function(data) {
                //this.JSON = data;
                mardyApp.buildElement(data);
                mardyApp.urlNext = data.pagination.next_url;
            })
            .fail(function() {
                alert("Unable to load Instagram Posts");
            });
    },
    buildElement: function(JSON) {
        $.each(JSON.data, function(index, el) {
            var item = $('<img />').attr({
                    src: el.images.low_resolution.url
                })
                .appendTo($('<a />').attr({
                    href: el.images.standard_resolution.url
                }));

            //console.log(index)
            mardyApp.$elements.push(item)
        });

        //TODO: There's got to be a better way to do this
        if (mardyApp.firstLoad === true) {
            mardyApp.render();
            mardyApp.firstLoad = false;
        };

    },
    bindEvents: function() {
        $("#loadMore").on("click", function() {
            mardyApp.render();
        })
    },
    render: function() {
        $.each(this.$elements, function(index, el) {
            el.appendTo($('#instafeed'));
        });
        setTimeout(function(){ mardyApp.ajaxReq(mardyApp.urlNext); }, 1000);        
    },
    init: function() {
        this.ajaxReq(this.url);
        this.bindEvents();
    }
};

mardyApp.init();
