$(document).ready(init);
function init(){
getVideoThumbs();
getPhotosetThumbs();

}
function getVideoThumbs(){
  $(".video .thumb").each(function(){
    var thumb=$(this);var swf="";
    $(this).children("object").children("param").each(function(){
      if($(this).attr("name")=="movie"){
	swf=$(this).attr("value")

      }});
    if(swf.indexOf("youtube.com")>=0){swf=swf.replace("http://www.youtube.com","");
swf=swf.replace("http://youtube.com","");
var youtube_id=swf.substring(swf.indexOf("/v/")+3,swf.indexOf("&"));
var thumb_url="http://i.ytimg.com/vi/"+youtube_id+"/0.jpg";
$(thumb).replaceWith('<img src="'+thumb_url+'" alt="" />')}
else if(swf.indexOf("vimeo.com")>=0){
  swf=swf.replace("http://vimeo.com/moogaloop.swf?","");
  swf=swf.replace("http://www.vimeo.com/moogaloop.swf?","");
  var vimeo_id=swf.substring(swf.indexOf("clip_id=")+8,swf.indexOf("&"));
  $.getJSON("http://vimeo.com/api/clip/"+vimeo_id+".json?callback=?",function(d){
    var thumb_url=d[0].thumbnail_large;$(thumb).replaceWith('<img src="'+thumb_url+'" alt="" />')})}})}
function getPhotosetThumbs(){
      $("div.post div.photoset div.thumb").each(function(){
	var thumb=$(this);
	var xml=$(thumb).children(".html_photoset").children("embed").attr("flashvars");
	xml=xml.replace("showLogo=false&showVersionInfo=false&dataFile=","");
	$.get(xml,{},function(D){var img=$(D).find("image:first").attr("source");
	$(thumb).replaceWith('<img src="'+img+'" alt="" />')},"xml")})}
	$(function(){$("object[data^='http://vimeo.com']").each(function(){
	  var parent=$(this).parent();
	  var vimeoCode=parent.html();
	  var params="";
	  if(vimeoCode.toLowerCase().indexOf("<param")==-1){
	    $("param",this).each(function(){
	      params+=$(this).get(0).outerHTML})}
	      var oldOpts=/show_title=1&show_byline=0&show_portrait=0&color=00ADEF/g;
	      var newOpts="show_title=0&show_byline=0&show_portrait=0&color=000000";
	      vimeoCode=vimeoCode.replace(oldOpts,newOpts);
	      if(params!=""){
		params=params.replace(oldOpts,newOpts);
		vimeoCode=vimeoCode.replace(/<embed/i,params+"<embed")}parent.html(vimeoCode)})});
	$(function(){
	  $("object").each(function(){
	  if($(this).find("param[value^='http://www.youtube.com']").length>0){
	    var parent=$(this).parent();
	    var youtubeCode=parent.html();
	    var params="";
	    if(youtubeCode.toLowerCase().indexOf("<param")==-1){
	      $("param",this).each(function(){
		params+=$(this).get(0).outerHTML})}
		var oldOpts=/rel=0/g;var newOpts="rel=0&hd=1&color1=0x000000&color2=0x000000";
		youtubeCode=youtubeCode.replace(oldOpts,newOpts);
		if(params!=""){params=params.replace(oldOpts,newOpts);youtubeCode=youtubeCode.replace(/<embed/i,params+"<embed")}parent.html(youtubeCode)}})});
