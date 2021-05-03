if(JSINFO && !JSINFO['dirtylittlehelper_overlay']) {
    jQuery( document ).ready(function() {
      jQuery('#dirtylittlehelper_widget').draggable();
   });
}
 var theUserposition= {'x':200,'y':200,'position':'absolute'};


jQuery( document ).ready(function() {
    jQuery( "#dirtylittlehelper_overlay" ).draggable({
        drag: function(event,ui){
        var position = jQuery(this).position();
        theUserposition.y = position.top;
         theUserposition.x =position.left;
        },
        stop: function(){
        var position = jQuery(this).position();
        theUserposition.y = position.top;
         theUserposition.x =position.left;
         jQuery(this).css('left',position.left);
         jQuery(this).css('top',position.top);
        },
    });

});

jQuery(window).on("load", function(){
                pleft = 'auto';
                ptop = '40px' ;
	        pright = '40px';
	        pwidth = '500px';
	        pheight = '450px';
                ptype='fixed' ;
            jQuery("#dirtylittlehelper_overlay" ).css({top: ptop, right: pright,  left: pleft, position:ptype, width: pwidth, height: pheight });


});



function addBtnActionDirtylittlehelper($btn, props, edid) {
    $btn.click(function() {
        //jQuery('#dirtylittlehelper_overlay').toggle();
    dlh_lets_be_dirty();
        	return true;
    });

}





function dlh_timeid(dlh_tenthofsec = false){


    if(dlh_tenthofsec === false){
        var dlh_arr_replace =[ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'k' , 'm' , 'n' , 'p' , 'r' , 's' , 't' , 'u' , 'v' , 'w'  ];
        var dlh_div_seconds = 1000;
        var dlh_base = 18;
    }else{
        var dlh_arr_replace =[ 'a' , 'b' , '1' , 'c' , 'd' , '2' , 'e' , 'f' , '3' , 'g' , 'h' , '4' , 'k' , 'm' , '5' , 'n' , 'p' , '6' , 'r' , 's' , '7' , 't' , 'u' , '8' , 'v' , 'w' , '9' ];
        var dlh_div_seconds = 100;
        var dlh_base = 27;
    }

    var dlh_dateNow = new Date();
    var dlh_secNow = dlh_dateNow.getTime()/dlh_div_seconds|0;

    var dlh_dateYear = new Date(dlh_dateNow.getFullYear(),0,1,0,0,0,0);
    var dlh_secYear = dlh_dateYear.getTime()/dlh_div_seconds|0;

    var dlh_sec = dlh_secNow - dlh_secYear;

    var dlh_rest = dlh_sec;

    var dlh_expo = 5;

    var dlh_return = 'x';

    var dlh_div = 0;

    var dlh_floor = 0;

    while ( dlh_rest > 0 && dlh_expo > 0 ) {

        dlh_div = dlh_base**dlh_expo;

        dlh_floor = Math.floor( dlh_rest / dlh_div );

        dlh_return = dlh_return + dlh_arr_replace[dlh_floor];

        dlh_rest = dlh_rest % dlh_div;

        dlh_expo--;

    }//while

    dlh_return = dlh_return + dlh_arr_replace[dlh_rest];

    dlh_return = dlh_return.replace("x","");

    return ((''+dlh_dateNow.getFullYear()).substr(-2))+ dlh_return

}//function dlh_timeid



function dlh_renew_timeid(dlh_target_id){

    var dlh_target_obj = document.getElementById(dlh_target_id);

    if(dlh_target_obj){

        dlh_target_obj.value = dlh_timeid();
        return true;

    }

    return false;

}//dlh_renew_timeid


function dlh_copyme(dlh_source_id){

    var dlh_source_obj = document.getElementById(dlh_source_id);

    if(dlh_source_obj){
        var dlh_value = dlh_source_obj.value;
        dlh_source_obj.select();
        dlh_source_obj.setSelectionRange(0, dlh_value.length); /* For mobile devices */
        document.execCommand("copy");
		
		console.log('copied to clipboard: '.dlh_value);

    }else{
      alert("ERROR javascript dlh_copyme - source not found:" + dlh_source_id);
    }

}//function dlh_copyme





function dlh_copypaste(dlh_source_id , dlh_target_id){
    var dlh_source_obj = document.getElementById(dlh_source_id);
    if(dlh_source_obj){
        var dlh_value = dlh_source_obj.value;

        dlh_insertAtCursor(dlh_target_id, dlh_value)

    }else{
      alert("ERROR javascript dlh_copyme - source not found:" + dlh_source_id);
    }

}//function dlh_copyme




function dlh_insertAtCursor(dlh_target_id, dlh_value) {
    var dlh_target_obj = document.getElementById(dlh_target_id);

    if( dlh_target_obj ) {
        //IE support
        if (document.selection) {
            dlh_target_obj.focus();
            dlh_sel = document.selection.createRange();
            dlh_sel.text = dlh_value;
        }
        // Microsoft Edge
        else if(window.navigator.userAgent.indexOf("Edge") > -1) {
          var dlh_startPos = dlh_target_obj.selectionStart;
          var dlh_endPos = dlh_target_obj.selectionEnd;

          dlh_target_obj.value = dlh_target_obj.value.substring(0, dlh_startPos)+ dlh_value
                 + dlh_target_obj.value.substring(dlh_endPos, dlh_target_obj.value.length);

          var pos = dlh_startPos + dlh_value.length;
          dlh_target_obj.focus();
          dlh_target_obj.setSelectionRange(pos, pos);
        }
        //MOZILLA and others
        else if (dlh_target_obj.selectionStart || dlh_target_obj.selectionStart == '0') {
            var dlh_startPos = dlh_target_obj.selectionStart;
            var dlh_endPos = dlh_target_obj.selectionEnd;
            dlh_target_obj.value = dlh_target_obj.value.substring(0, dlh_startPos)
                + dlh_value
                + dlh_target_obj.value.substring(dlh_endPos, dlh_target_obj.value.length);
            dlh_target_obj.selectionStart = dlh_startPos;
        } else {
            dlh_target_obj.value += dlh_value;
        }
    }else{
        alert("ERROR javascript dlh_insertAtCursor - target not found:" + dlh_target_id);
    }
}//function dlh_insertAtCursor






/* STYLE */
/* -------------------------  */
function dlh_hack_the_style(){

  /* ALL */ 
  jQuery('#dokuwiki__site').css({
    'border':' 1px solid #DDDDDD', 
    'resize':' horizontal', 
    'overflow':' auto', 
    'display':' block', 
    'padding-right':' 10px', 
    'width':jQuery('#dokuwiki__site').width()+'px', 
    'max-width':' 250%' });

  /* ADVANCED CONFIG */
  if( jQuery('#plugin_advanced_config').length ){
    jQuery('#dokuwiki__site').css( {'max-width':'1700px','width':'' } );
    jQuery('textarea').css({'height':'500px'});
    return;
  }

}

document.addEventListener("DOMContentLoaded", function(event) { 
  dlh_hack_the_style();
});



/* DLH THINGS */
/* -------------------------  */



function dlh_select(){
  for( i=0; i< jQuery.data(document.body).dlh_fields.length; ++i ){
    jQuery( '#'+jQuery.data(document.body).dlh_fields[i]).css('display','none');
  }
  jQuery( '#' + jQuery('#dlh_select').val() ).css('display','inline');

}




function dlh_lets_be_dirty( dlh_dirty_i = 0){

  var dlh_console = false;

  if( dlh_console ) console.log('lets become dirty');

  //dlh has to wait till the toolbar is finished...
    if( dlh_console ) console.log( dlh_dirty_i );
    var dlh_dirty_toolbar, toolbar_dlh;

    dlh_dirty_toolbar = document.getElementById('tool__bar');

    if( dlh_dirty_toolbar) {

    dlh_dirty_toolbar_dlh = document.getElementById('tool__bar').innerHTML.indexOf('dirtylittlehelper_ovl_sprite.png')>-1;

    while( dlh_dirty_i < 10 ){
      ++dlh_dirty_i;
      dlh_dirty_toolbar_dlh = document.getElementById('tool__bar').innerHTML.indexOf('dirtylittlehelper_ovl_sprite.png')>-1;
      if( dlh_dirty_toolbar_dlh === true){
        i=99999;
      }else{
        if( dlh_console ) console.log('not ready: ' + dlh_dirty_i );
        if( dlh_console ) console.log(dlh_dirty_toolbar_dlh);
        setTimeout(dlh_lets_be_dirty, 100, dlh_dirty_i);
        return;
      }

    }

    if( dlh_dirty_toolbar_dlh === true){
      if( dlh_console ) console.log('ready:' + dlh_dirty_i );
    }else{
      if( dlh_console ) console.log('NOT WORKING YET: '+ dlh_dirty_i);
      return;
    }

    }//if toolbar
    else{
        if( dlh_console ) console.log('no toolbar');
        return;
    }






//some styling
  jQuery('button.toolbutton').css({'height':'32px','width':'32px'});
  jQuery('#dokuwiki__site').css( {'max-width':'1700px','width':'' } );
  jQuery('.preview').css({'width':'900px','border':'1px solid #AAAAAA','resize':'both','display':'block','overflow':'scroll'});

  var i = 0;

//  if( jQuery.data(document.body, 'dlh_count', 'done')

  if( jQuery.data(document.body).dlh_count ){
    //blabla
  }else{
    jQuery.data(document.body, 'dlh_count', 1);
  }

  jQuery.data(document.body, 'dlh_count', jQuery.data(document.body).dlh_count + 1 );


  if( jQuery.data(document.body).dlh_count > 10 ){
      console.log('TOO OFTEN EXITING - FOREVER');
      return false;
  }



  if( jQuery.data(document.body).dlh_ini === 'done' ){
    if( dlh_console ) console.log('already done');
  }else{
    jQuery('#wiki__text').css('height',window.innerHeight-400 + 'px');


    //walk the form...
    i = 0;
    var dlh_labels = [];
    var dlh_ids = [];
    var dlh_fields = [];
    var this_label = false;
    var this_id = false;

    var this_comeback = false;

    jQuery('#dirtylittlehelper_overlay fieldset').contents().each(
      function(){

        if( dlh_console ) {
          console.log( this );
          console.log('----');
          console.log('LABEL');
          console.log( jQuery(this).contents().filter('label').text() );
          console.log('id');
          console.log( jQuery(this).contents().filter('span.input').contents().filter('input').attr('id') );
          console.log('----');
        }//1==2?

        this_label = jQuery(this).contents().filter('label').text();
        this_id = jQuery(this).contents().filter('span.input').contents().filter('input').attr('id');



        if( this_label && this_id && jQuery(this).prop('tagName') == 'DIV'){

          //if the input fields arent ready we have to try again later!
          if( jQuery(this).contents().filter('span.input').contents().filter('input').data('uiAutocomplete') === undefined){
              if( dlh_console ) console.log( jQuery(this).contents().filter('span.input').contents().filter('input').data() );
              if( dlh_console ) console.log( jQuery.data(document.body).dlh_ini) ;
              if( dlh_console ) console.log('come back later');
              this_comeback = true;
          }else{

              dlh_labels.push(this_label);

              dlh_ids.push(this_id.replace('.','\\.') );

              jQuery(this).attr('id','dlh_dirty_form_'+i);

              dlh_fields.push('dlh_dirty_form_'+i);

          }

        }//found something

        ++i;
        this_label = false;
        this_id = false;

      }//function each in ....
    );//jQuery('#dirtylittlehelper_overlay fieldset').contents().each(

    if( this_comeback === true ){
        if( dlh_console ) console.log('exiting');
        setTimeout(dlh_lets_be_dirty, 250, 111);
        return false;
    }

    if( dlh_console ) console.log('got a bit dirty');

    jQuery.data(document.body, 'dlh_labels', dlh_labels );
    jQuery.data(document.body, 'dlh_ids', dlh_ids );
    jQuery.data(document.body, 'dlh_fields', dlh_fields );

	jQuery.data(document.body, 'dlh_quot', '"' );
	


    dlh_append = '<div id="dlh_mytoolbar_hack" style="margin-top:5px;margin-bottom:5px;">'

	+ '<button class="dlh_button_36_32" title="CODE tags" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'<code [enable_line_numbers=\'+jQuery.data(document.body).dlh_quot+\'true\'+jQuery.data(document.body).dlh_quot+\']>\',\'</code>\',\' \\n \\n \\n \'        '
			+ ');'
			+ '"><img src="../lib/plugins/dirtylittlehelper/dlh_code.png" width="32px" height="32px">'
			+ ' </button>'

	+ '<button class="dlh_button_36_32" title="CODE SQL tags" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'<code sql [enable_line_numbers=\'+jQuery.data(document.body).dlh_quot+\'true\'+jQuery.data(document.body).dlh_quot+\']>\',\'</code>\',\'/* CODE */ \\n \\n \\n \'        '
			+ ');"><img src="../lib/plugins/dirtylittlehelper/dlh_code_sql.png" width="32px" height="32px">'
			+ ' </button>'

			
			
	+ '<button class="dlh_button_36_32" title="CODE bash tags" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'<code bash [enable_line_numbers=\'+jQuery.data(document.body).dlh_quot+\'true\'+jQuery.data(document.body).dlh_quot+\']>\',\'</code>\',\'# CODE \\n \\n \\n \'        '
			+ ');"><img src="../lib/plugins/dirtylittlehelper/dlh_code_bash.png" width="32px" height="32px">'
			+ ' </button>'

	+ '<button class="dlh_button_36_32" title="CODE shell tags" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'<code shell [enable_line_numbers=\'+jQuery.data(document.body).dlh_quot+\'true\'+jQuery.data(document.body).dlh_quot+\']>\',\'</code>\',\' \\n \\n \\n \'        '
			+ ');"><img src="../lib/plugins/dirtylittlehelper/dlh_code_bash.png" width="32px" height="32px">'
			+ ' </button>'


		+ '<button class="dlh_button_36_32" title="CODE php tags" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'<code php [enable_line_numbers=\'+jQuery.data(document.body).dlh_quot+\'true\'+jQuery.data(document.body).dlh_quot+\']>\',\'</code>\',\'/* CODE */ \\n \\n \\n \'        '
			+ ');"><img src="../lib/plugins/dirtylittlehelper/dlh_code_php.png" width="32px" height="32px">'
			+ ' </button>'

		+ '<button class="dlh_button_36_32" title="CODE html tags" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'<code html [enable_line_numbers=\'+jQuery.data(document.body).dlh_quot+\'true\'+jQuery.data(document.body).dlh_quot+\']>\',\'</code>\',\'<!-- CODE --> \\n \\n \\n \'        '
			+ ');"><img src="../lib/plugins/dirtylittlehelper/dlh_code_html.png" width="32px" height="32px">'
			+ ' </button>'

			
	+ '<button class="dlh_button_36_32" title="CODE javascript tags" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'<code javascript [enable_line_numbers=\'+jQuery.data(document.body).dlh_quot+\'true\'+jQuery.data(document.body).dlh_quot+\']>\',\'</code>\',\'/* CODE */ \\n \\n \\n \'        '
			+ ');"><img src="../lib/plugins/dirtylittlehelper/dlh_code_javascript.png" width="32px" height="32px">'
			+ ' </button>'

			


	+'<br>'
	+'<select id="dlh_select" onChange="dlh_select();" onClick="dlh_select();" style="width:200px;margin-right:10px;">';

    for( i=0; i< jQuery.data(document.body).dlh_ids.length; ++i ){
      dlh_append = dlh_append + '<option value="'+ jQuery.data(document.body).dlh_fields[i] +'">' + jQuery.data(document.body).dlh_labels[i] +'</option>';
    }

    dlh_append = dlh_append + '</select></div>';


    jQuery('#tool__bar').append(dlh_append);


    for( i=0; i< jQuery.data(document.body).dlh_ids.length; ++i ){

      jQuery('#'+jQuery.data(document.body).dlh_ids[i]).css({'width':'350px','height':'32px','font-size':'16px'});

      insert_this_html = ''
          + '<button title="open in new window" class="dlh_button_36_32" '
          + 'onClick="dlh_open_wiki_link( dlh_objectValueGet(\''
          + jQuery.data(document.body).dlh_ids[i]  +'\') );"><img src="../lib/plugins/dirtylittlehelper/dlh_open_window.png" width="32px" height="32px">'
          + '</button> ';
	  
	  if(JSINFO['dirtylittlehelper_show_id']){
          insert_this_html = insert_this_html 
          + '<button title=add :TimeID" class="dlh_button_36_32" '
          + 'onClick="dlh_objectValueSet(\''
          + jQuery.data(document.body).dlh_ids[i] +'\', (dlh_objectValueGet(\''+jQuery.data(document.body).dlh_ids[i]+'\') + \':\' + dlh_objectValueGet(\'dlh_mytimeid\')+\':\').replace(/::/i, \':\')   );"><img src="../lib/plugins/dirtylittlehelper/dlh_add_id.png" width="32px" height="32px">'
          + '</button> ';
	  }
	  
	  
	  jQuery('#'+jQuery.data(document.body).dlh_ids[i]).before(
         insert_this_html
      );
	  
	  
      jQuery('#'+jQuery.data(document.body).dlh_ids[i]).after(''
          + '<button title="insert into wikieditor at cursor pos" class="dlh_button_36_32" '
          + 'onClick="insertAtCarret(\'wiki__text\' , '
          + '\'[[\' + dlh_objectValueGet(\''+ jQuery.data(document.body).dlh_ids[i] +'\') + \'|]]\'  );"><img src="../lib/plugins/dirtylittlehelper/dlh_link_insert.png" width="32px" height="32px">'
          + '</button> '
      );

      jQuery('#dlh_mytoolbar_hack').append(
        jQuery('#' + jQuery.data(document.body).dlh_fields[i] )
      );

      jQuery( '#'+jQuery.data(document.body).dlh_fields[i] ).contents().filter('label').css('display','none');

    }//walk the input elements

	
	if(JSINFO['dirtylittlehelper_show_id']){
		jQuery('#dlh_mytoolbar_hack').append(
			'<div class="dlh_sep"></div>'
			+ '<input id="dlh_mytimeid" type="text" title="DLH timeID">'
			+ '<button class="dlh_button_36_32" onClick="dlh_renew_timeid(\'dlh_mytimeid\');" title="renew timeID"><img src="../lib/plugins/dirtylittlehelper/dlh_id_renew.png" width="32px" height="32px"></button>'
			+ '<button class="dlh_button_36_32" onClick="insertAtCarret(\'wiki__text\', dlh_objectValueGet(\'dlh_mytimeid\') );" title="paste timeID at current position"><img src="../lib/plugins/dirtylittlehelper/dlh_id_insert.png" width="32px" height="32px"></button>');
	}

	if(JSINFO['dirtylittlehelper_show_mermaid']){
		jQuery('#dlh_mytoolbar_hack').append(
			'<div class="dlh_sep"></div>'
			+ '<button class="dlh_button_36_32" title="mermaid code" '
			+ 'onClick="insertTags(\'wiki__text\' , '
			+ '   \'~~dlhmm\',\'/dlh~~\',\' \\n graph TD \\n A---B\\n \'     '
			+  ');"><img src="../lib/plugins/dirtylittlehelper/dlh_mermaid_code.png" width="32px" height="32px"></button>'
			);
		jQuery('#dlh_mytoolbar_hack').append(' '
			+ '<button class="dlh_button_36_32" onClick="window.open(\'../lib/plugins/dirtylittlehelper/mermaid/editor/\');" title="mermaid live editor"><img src="../lib/plugins/dirtylittlehelper/dlh_mermaid.png" width="32px" height="32px"></button>'
		);
	}


	if(JSINFO['dirtylittlehelper_show_drawio']){
		jQuery('#dlh_mytoolbar_hack').append(
			'<div class="dlh_sep"></div>'
			+ '<button class="dlh_button_36_32"  title="insert DRAW.IO - ID into wikieditor at cursor pos"'
          		+ 'onClick="insertAtCarret(\'wiki__text\' , '
			+ '\'{{drawio>\'+getImageName().substr(0,getImageName().lastIndexOf(\':\')+1)+ \'drawio_\'+ ((new Date()).getTime()) +\'.svg}} \''
			+  ');"><img src="../lib/plugins/dirtylittlehelper/dlh_drawio.png" width="32px" height="32px">'
          		+ '</button> '
			);
	}

	jQuery('#dlh_mytoolbar_hack').append(
		'<div class="dlh_sep"></div>'
		+ '<button class="dlh_button_36_32"  title="~~DLH* COMMENT /DLH~~" accesskey="*" '
		+ 'onClick="insertTags(\'wiki__text\' , '
		+ '   \'~~dlh* \',\'/ dlh~~\',\' YOU WILL NOT SEE ME \'     '
		+  ');"><img src="../lib/plugins/dirtylittlehelper/dlh_comment.png" width="32px" height="32px">'
		+ '</button> '
		);


	if(JSINFO['dirtylittlehelper_show_id']){
		dlh_renew_timeid('dlh_mytimeid');
	}
	
    if( dlh_console ) console.log('the end');
    jQuery.data(document.body, 'dlh_ini', 'done');
	
	

   dlh_select();

   jQuery('#dirtylittlehelper_overlay').toggle();

  }//first run only


  jQuery('#dirtylittlehelper_overlay').toggle();



}//function get dirty


document.addEventListener("DOMContentLoaded", function(event) { 
  dlh_lets_be_dirty();
});





function dlh_objectValueGet(dlh_source){
    var dlh_source_obj = document.getElementById(dlh_source);

    if( dlh_source_obj ){
        dlh_value = dlh_source_obj.value;
        if( dlh_value !== undefined){
            return dlh_value;
        }
    }
    return false;

}//function dlh_objectValueGet


function dlh_objectValueSet(dlh_target , dlh_value ){
    var dlh_target_obj = document.getElementById(dlh_target);

    if( dlh_target_obj ){
        dlh_target_obj.value = dlh_value;
    return true;
    }
    return false;

}//function dlh_objectValueSet





function dlh_open_wiki_link(dlh_wikilink){
   dlh_loc = window.location.href;
   dlh_loc = dlh_loc.substring(0, dlh_loc.indexOf('.php')+4);
   dlh_loc = dlh_loc + '/' + dlh_wikilink + '?' + Math.random();

   window.open(dlh_loc);

   return true;
}