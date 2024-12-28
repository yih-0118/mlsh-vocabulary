window.onload = function () {
    $.ajax({
        url: "https://ipapi.co/json/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            const city = data.city;
            const region = data.region;
            const country = data.country_name;
            const location = `${city}, ${region}, ${country}`;


            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSeCvxN309s_Rrm4nGKaVdP6s9aDmIWoCF-mK49_5nHBATcRqQ/formResponse",
                crossDomain: true,
                data: {
                    "entry.271493781": '到',
                    "entry.819813079": location
                },
                type: "POST",
                dataType: "JSON"
            });
        },
    });
}