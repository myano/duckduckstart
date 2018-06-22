var ac_calls="0";var detect_page=location.href;var pattern=/metasearch/;var found=detect_page.match(pattern);(function(a){a.fn.extend({autocomplete:function(b,c){var d=typeof b=="string";c=a.extend({},a.Autocompleter.defaults,{url:d?b:null,data:d?null:b,delay:d?a.Autocompleter.defaults.delay:10,max:c&&!c.scroll?10:150},c);c.highlight=c.highlight||function(e){return e};c.formatMatch=c.formatMatch||c.formatItem;return this.each(function(){new a.Autocompleter(this,c)})},result:function(b){return this.bind("result",b)},search:function(b){return this.trigger("search",[b])},flushCache:function(){return this.trigger("flushCache")},setOptions:function(b){return this.trigger("setOptions",[b])},unautocomplete:function(){return this.trigger("unautocomplete")}});a.Autocompleter=function(l,g){var c={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};var b=a(l).attr("autocomplete","off").addClass(g.inputClass);var j;var s="";var o=a.Autocompleter.Cache(g);var e=0;var w;var y={mouseDownOnSelect:false};var t=a.Autocompleter.Select(g,l,d,y);var m=function(){setInterval(function(){if(b.val()==""){t.hide()}},500)}();var n;a.browser.opera&&a(l.form).bind("submit.autocomplete",function(){if(n){n=false;return false}});b.bind((a.browser.opera?"keypress":"keydown")+".autocomplete",function(z){w=z.keyCode;switch(z.keyCode){case c.UP:z.preventDefault();if(t.visible()){t.prev()}else{v(0,true)}break;case c.DOWN:z.preventDefault();if(t.visible()){t.next()}else{v(0,true)}break;case c.PAGEUP:z.preventDefault();if(t.visible()){t.pageUp()}else{v(0,true)}break;case c.PAGEDOWN:z.preventDefault();if(t.visible()){t.pageDown()}else{v(0,true)}break;case g.multiple&&a.trim(g.multipleSeparator)==","&&c.COMMA:case c.TAB:case c.RETURN:if(d()){n=false;return true}break;case c.ESC:if(t.visible()){a(l).val(a(l).attr("val"))}t.hide();break;default:clearTimeout(j);j=setTimeout(v,g.delay);break}}).focus(function(){e++}).blur(function(){e=0;if(!y.mouseDownOnSelect){u()}}).click(function(){if(e++>1&&!t.visible()){v(0,true)}}).bind("search",function(){var z=(arguments.length>1)?arguments[1]:null;function A(E,D){var B;if(D&&D.length){for(var C=0;C<D.length;C++){if(D[C].result.toLowerCase()==E.toLowerCase()){B=D[C];break}}}if(typeof z=="function"){z(B)}else{b.trigger("result",B&&[B.data,B.value])}}a.each(h(b.val()),function(B,C){f(C,A,A)})}).bind("flushCache",function(){o.flush()}).bind("setOptions",function(){a.extend(g,arguments[1]);if("data" in arguments[1]){o.populate()}}).bind("unautocomplete",function(){t.unbind();b.unbind();a(l.form).unbind(".autocomplete")});function d(){var z=t.selected();if(!z){return false}var A=z.result;s=A;if(g.multiple){var B=h(b.val());if(B.length>1){A=B.slice(0,B.length-1).join(g.multipleSeparator)+g.multipleSeparator+A}A+=g.multipleSeparator}x();b.trigger("result",[z.data,z.value]);var C=a(l).attr("id");if(C=="query"){a("#flag_ac").val("1")}else{if(C=="query_top"){a("#flag_ac1").val("1")}else{if(C=="query_bottom"){a("#flag_ac2").val("1")}}}return true}function v(z,B){if(w==c.DEL){t.hide();return}var A=b.val();if(!B&&A==s){return}s=A;A=i(A);if(A.length>=g.minChars){b.attr("val",A);b.addClass(g.loadingClass);if(!g.matchCase){A=A.toLowerCase()}f(A,k,x)}else{p();t.hide()}}function h(B){if(!B){return[""]}var z=B.split(g.multipleSeparator);var A=[];a.each(z,function(C,D){if(a.trim(D)){A[C]=a.trim(D)}});return A}function i(z){if(!g.multiple){return z}var A=h(z);return A[A.length-1]}function r(z,A){if(g.autoFill&&(i(b.val()).toLowerCase()==z.toLowerCase())&&w!=c.BACKSPACE){b.val(b.val()+A.substring(i(s).length));a.Autocompleter.Selection(l,s.length,s.length+A.length)}}function u(){clearTimeout(j);j=setTimeout(x,200)}function x(){var z=t.visible();t.hide();clearTimeout(j);p();if(g.mustMatch){b.search(function(B){if(!B){if(g.multiple){var A=h(b.val()).slice(0,-1);b.val(A.join(g.multipleSeparator)+(A.length?g.multipleSeparator:""))}else{b.val("")}}})}if(z){}}function k(A,z){if(z&&z.length&&1){p();t.display(z,A);r(A,z[0].value);t.show()}else{x()}}function f(D,A,B){if(!g.matchCase){D=D.toLowerCase()}var z=o.load(D);if(z&&z.length){A(D,z)}else{if((typeof g.url=="string")&&(g.url.length>0)){var C={timestamp:+new Date()};a.each(g.extraParams,function(E,F){C[E]=typeof F=="function"?F():F});a.ajax({mode:"abort",port:"autocomplete"+l.name,dataType:g.dataType,url:g.url,data:a.extend({query:i(D),limit:g.max},C),success:function(F){var E=g.parse&&g.parse(F)||q(F);o.add(D,E);A(D,E)}})}else{t.emptyList();B(D)}}}function q(A){var B=[];var z=A.split("\n");for(var D=0;D<z.length;D++){var C=a.trim(z[D]);if(C){C=C.split("|");B[B.length]={data:C,value:C[0],result:g.formatResult&&g.formatResult(C,C[0])||C[0]}}}return B}function p(){b.removeClass(g.loadingClass)}};a.Autocompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,delay:300,matchCase:false,matchSubset:true,matchContains:false,cacheLength:0,max:10,mustMatch:false,extraParams:{},selectFirst:false,ieWidthAdd:0,formatItem:function(b){return b[0]},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",highlight:function(c,b){newTerm=b.replace(/[\^\*\(\)\{\}\|\\\/\;\:\\\"\<\>\,\?\_\(\`\~\!\#\$\[\]]+/g," ");return c.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+newTerm.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","i"),"<strong>$1</strong>")},scroll:true,scrollHeight:180};a.Autocompleter.Cache=function(h){var e={};var b=0;function g(k,j){if(!h.matchCase){k=k.toLowerCase()}var i=k.indexOf(j);if(i==-1){return false}return i==0||h.matchContains}function f(j,i){if(b>h.cacheLength){c()}if(!e[j]){b++}e[j]=i}function d(){if(!h.data){return false}var n={},m=0;if(!h.url){h.cacheLength=1}n[""]=[];for(var p=0,o=h.data.length;p<o;p++){var j=h.data[p];j=(typeof j=="string")?[j]:j;var l=h.formatMatch(j,p+1,h.data.length);if(l===false){continue}var i=l.charAt(0).toLowerCase();if(!n[i]){n[i]=[]}var k={value:l,data:j,result:h.formatResult&&h.formatResult(j)||l};n[i].push(k);if(m++<h.max){n[""].push(k)}}a.each(n,function(q,r){h.cacheLength++;f(q,r)})}setTimeout(d,25);function c(){e={};b=0}return{flush:c,add:f,populate:d,load:function(i){if(!h.cacheLength||!b){return null}if(!h.url&&h.matchContains){var m=[];for(var k in e){if(k.length>0){var j=e[k];a.each(j,function(p,n){if(g(n.value,i)){m.push(n)}})}}return m}else{if(e[i]){return e[i]}else{if(h.matchSubset){for(var l=i.length-1;l>=h.minChars;l--){var j=e[i.substr(0,l)];if(j){var m=[];a.each(j,function(p,n){if(g(n.value,i)){m[m.length]=n}});return m}}}}}return null}}};a.Autocompleter.Select=function(i,q,b,j){var p={ACTIVE:"ac_over"};var r,k=-1,n,d="",s=true,e,h;function f(){if(!s){return}e=a("<div/>").hide().addClass(i.resultsClass).css("position","absolute").appendTo(document.body);h=a("<ul/>").appendTo(e).mouseover(function(t){if(l(t).nodeName&&l(t).nodeName.toUpperCase()=="LI"){k=a("li",h).removeClass(p.ACTIVE).index(l(t));a(l(t)).addClass(p.ACTIVE)}}).click(function(v){var u=a(".ac_over").html();a(l(v)).addClass(p.ACTIVE);a(q).val(a(".ac_over").text());b();a.Autocompleter.Selection(q,q.value.length,q.value.length);var t=a(q).attr("id");if(t=="query"&&u!="&nbsp;"&&u!=" "){a("form[name=blah]").submit()}else{if(t=="query_top"&&u!="&nbsp;"&&u!=" "){a("form[name=blah1]").submit()}else{if(t=="query_bottom"&&u!="&nbsp;"&&u!=" "){a("form[name=blah2]").submit()}}}return true}).mousedown(function(){j.mouseDownOnSelect=true}).mouseup(function(){j.mouseDownOnSelect=false});if(i.width>0){e.css("width",i.width)}s=false}function l(u){var t=u.target;while(t&&t.tagName!="LI"){t=t.parentNode}if(!t){return[]}return t}function o(t){r.slice(k,k+1).removeClass(p.ACTIVE);m(t);var v=r.slice(k,k+1).addClass(p.ACTIVE);a(q).val(v.text());if(i.scroll){var u=0;r.slice(0,k).each(function(){u+=this.offsetHeight});if((u+v[0].offsetHeight-h.scrollTop())>h[0].clientHeight){h.scrollTop(u+v[0].offsetHeight-h.innerHeight())}else{if(u<h.scrollTop()){h.scrollTop(u)}}}}function m(t){k+=t;if(k<0){k=r.size()-1}else{if(k>=r.size()){k=0}}}function c(t){return i.max&&i.max<t?i.max:t}function g(){h.empty();var u=c(n.length);for(var v=0;v<u;v++){if(!n[v]){continue}var w=i.formatItem(n[v].data,v+1,u,n[v].value,d);if(w===false){continue}var t=a("<li/>").html(i.highlight(w,d)).addClass(v%2==0?"ac_even":"ac_odd").appendTo(h)[0];a.data(t,"ac_data",n[v])}r=h.find("li");if(i.selectFirst){r.slice(0,1).addClass(p.ACTIVE);k=0}if(a.fn.bgiframe){h.bgiframe()}}return{display:function(u,t){f();n=u;d=t;g()},next:function(){o(1)},prev:function(){o(-1)},pageUp:function(){if(k!=0&&k-8<0){o(-k)}else{o(-8)}},pageDown:function(){if(k!=r.size()-1&&k+8>r.size()){o(r.size()-1-k)}else{o(8)}},hide:function(){e&&e.hide();r&&r.removeClass(p.ACTIVE);k=-1},visible:function(){return e&&e.is(":visible")},current:function(){return this.visible()&&(r.filter("."+p.ACTIVE)[0]||i.selectFirst&&r[0])},show:function(){var v=a(q).offset();if($.browser.mozilla&&found){if(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){e.css({width:typeof i.width=="string"||i.width>0?i.width:a(q).width()+(($.browser.msie)?(i.ieWidthAdd):0),top:v.top+q.offsetHeight+21,left:v.left}).show()}}else{if((navigator.userAgent.toLowerCase().indexOf("chrome")!=-1)&&(ac_calls=="0")&&!$("body").hasClass("air")&&!found){e.css({width:typeof i.width=="string"||i.width>0?i.width:a(q).width()+(($.browser.msie)?(i.ieWidthAdd):0),top:v.top+q.offsetHeight+22,left:v.left+8}).show();ac_calls="1"}else{e.css({width:typeof i.width=="string"||i.width>0?i.width:a(q).width()+(($.browser.msie)?(i.ieWidthAdd):0),top:v.top+q.offsetHeight+22,left:v.left}).show()}}if(i.scroll){h.scrollTop(0);h.css({maxHeight:i.scrollHeight,overflow:"hide"});if(a.browser.msie&&typeof document.body.style.maxHeight==="undefined"){var t=0;r.each(function(){t+=this.offsetHeight});var u=t>i.scrollHeight;h.css("height",u?i.scrollHeight:t);if(!u){r.width(h.width())}}}},selected:function(){var t=r&&r.filter("."+p.ACTIVE).removeClass(p.ACTIVE);return t&&t.length&&a.data(t[0],"ac_data")},emptyList:function(){h&&h.empty()},unbind:function(){e&&e.remove()}}};a.Autocompleter.Selection=function(d,e,c){if(d.setSelectionRange){d.setSelectionRange(e,c)}else{if(d.createTextRange){var b=d.createTextRange();b.collapse(true);b.moveStart("character",e);b.moveEnd("character",c);b.select()}else{if(d.selectionStart){d.selectionStart=e;d.selectionEnd=c}}}d.focus()}})(jQuery);