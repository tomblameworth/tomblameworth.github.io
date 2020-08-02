function add_img(obj){

    var dot = String(obj.img).lastIndexOf(".");
    var name = String(obj.img).slice(0, dot);
    var ext = String(obj.img).slice(dot);

    if(obj.sold == "sold"){
        var soldcont = document.createElement("div");
        soldcont.classList.add('sold-container');

        var thumb = document.createElement("img");
        thumb.setAttribute('src', "images/" + name + "_thumb" + ext);
        thumb.classList.add('sold-child');
        thumb.classList.add('sold-child-img');

        var sold = document.createElement("img");
        sold.setAttribute('src', "icons/sold.png");
        sold.classList.add('sold-child');
        sold.classList.add('sold-child-icon');
        
        soldcont.appendChild(thumb);
        soldcont.appendChild(sold);
        document.getElementById("gallery").appendChild(soldcont);

    }else{
        var a = document.createElement("a");
        a.setAttribute("data-fancybox", "gallery");
        a.setAttribute("data-caption", obj.caption);
        a.setAttribute("href", "images/" + name + ext);

        var thumb = document.createElement("img");
        thumb.setAttribute("src", "images/" + name + "_thumb" + ext);
        thumb.classList.add('img');

        a.appendChild(thumb);
        document.getElementById("gallery").appendChild(a);
    }
    
}

function test(){
}

function setup_fancybox(){
    $('[data-fancybox]').fancybox({
        toolbar: false,
        infobar: false,
        idleTime: 0,
        protect: true,
        hideScrollbar: false,
        clickContent: function(current, event) {
            return current.type === "image" ? "zoom" : false;
          },
        clickSlide: "close",
        clickOutside: "close",

        mobile: {
            arrows: false,
            clickOutside: "close",
            clickContent: "close",
            clickSlide: "close",
            dblclickContent: "zoom",
            dblclickSlide: "zoom"
        },

        beforeShow: function() {
            $('.caption--image').remove();
        },
        afterShow: function() {
            var caption = $(".fancybox-caption"),
                innerCaption = caption.clone().addClass('caption--image');

            $(".fancybox-slide--current .fancybox-content").append(innerCaption);
            caption.not('.caption--image').addClass('caption--bottom');
            
            //innerCaption.css("display", "none");
            //innerCaption.appendTo(".fancybox-slide--current .fancybox-content").show('slow');
        }
    });
}

function gallery_init(){   
    var data;
	$.ajax({
	  type: "GET",  
	  url: "./gallery.csv",
	  dataType: "text",       
	  success: function(response)  
	  {
		data = $.csv.toObjects(response);
        data.forEach(function(obj){add_img(obj);});

        test();
          
        setup_fancybox();
	  }   
	});
}