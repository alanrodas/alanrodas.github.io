Mandrill = function(key) {
    this.apiKey = key;
}

Mandrill.prototype.send = function(email, onSuccess, onFail) {
    if (!onSuccess) {onSuccess = function() {}}
    if (!onFail) {onFail = function() {}}
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
            key: this.apiKey,
            message: {
                from: email.from.name,
                from_email: email.from.email,
                to: email.to,
                autotext: "true",
                subject: email.subject,
                html: email.message
            }
        }
    }).done(function(response) {
        if (response[0].status === "sent") { onSuccess(response[0]);
        } else { onFail(response[0]); }
    });
}