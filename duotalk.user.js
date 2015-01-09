// ==UserScript==
// @name       	DuoTalk 
// @version    	0.1
// @description Collects sentences and tokens used by Duolingo for TTS.
// @match      	https://www.duolingo.com/*
// @downloadURL https://github.com/halfdan/DuoTalk/raw/master/duotalk.user.js
// @updateURL   https://github.com/halfdan/DuoTalk/raw/master/duotalk.user.js
// @version     0.0.1
// ==/UserScript== 
(function($) {     
    
    if (typeof duo !== 'undefined' && typeof $.tts_super === 'undefined') {
        $.fn.tts_super = $.fn.tts;
        $.fn.tts = function(d) {
            var language = d.language,
                url;
            
            if (d.tts_type === "sentence" && typeof d.sentence !== 'undefined') {
                var sentence = encodeURIComponent(d.sentence),
                    sentence_id = d.sentence_id;
                
                url = "https://mail.geekproject.eu/tts/?type=sentence&language=" + language +
                    "&sentence=" + sentence +
                    "&sentence_id=" + sentence_id +
                    "&user=" + duo.user.attributes.username;
            } else if (d.tts_type === "token") {
                var token = d.tts_id;
                
                url = "https://mail.geekproject.eu/tts/?type=token&language=" + language +
                    "&token=" + token +
                    "&user=" + duo.user.attributes.username;
            }
                
            if (typeof url !== 'undefined') {
                $.ajax({
                    type:     "GET",
                    url:      url,
                    dataType: "jsonp",
                    success: function(data){
                        console.log(data.message);
                    }
                });
            }
            
            return $(this).tts_super(d);           
        }
    }
}(jQuery));