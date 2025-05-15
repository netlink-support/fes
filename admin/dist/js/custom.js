$(document).ready(function () 
{
	
    $("#filer_input2").filer({
        limit: 0,
        maxSize: null,
        extensions: ['jpg', 'png', 'jpeg', 'gif'],
        changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>Drag & Drop images here</h3> <span style="display:inline-block; margin: 15px 0">or</span></div><a class="jFiler-input-choose-btn blue">Browse Images</a></div></div>',
        showThumbs: true,
        theme: "dragdropbox",
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-grid row" id="sortable"></ul>',
            item: '<li class="jFiler-item col-lg-2 col-md-3 col-sm-3 col-xs-6 col-xxs-12">\
						<div class="jFiler-item-container">\
							<div class="jFiler-item-inner">\
								<div class="jFiler-item-thumb">\
									<div class="jFiler-item-status"></div>\
									<div class="jFiler-item-thumb-overlay">\
										<div class="jFiler-item-info">\
											<div style="display:table-cell;vertical-align: middle;">\
												<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
												<span class="jFiler-item-others">{{fi-size2}}</span>\
											</div>\
										</div>\
									</div>\
									{{fi-image}}\
								</div>\
								<div class="jFiler-item-assets jFiler-row">\
									<ul class="list-inline pull-left">\
										<li>{{fi-progressBar}}</li>\
									</ul>\
									<ul class="list-inline pull-right">\
										<li><a class="fa fa-trash jFiler-item-trash-action"></a></li>\
									</ul>\
								</div>\
								<div class="jFiler-item-text">\
									\
								</div>\
							</div>\
						</div>\
					</li>',
            itemAppend: '<li class="jFiler-item col-lg-2 col-md-3 col-sm-3 col-xs-6 col-xxs-12">\
						<div class="jFiler-item-container">\
							<div class="jFiler-item-inner">\
								<div class="jFiler-item-thumb">\
									<div class="jFiler-item-status"></div>\
									<div class="jFiler-item-thumb-overlay">\
										<div class="jFiler-item-info">\
											<div style="display:table-cell;vertical-align: middle;">\
												<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
												<span class="jFiler-item-others">{{fi-size2}}</span>\
											</div>\
										</div>\
									</div>\
									{{fi-image}}\
								</div>\
								<div class="jFiler-item-assets jFiler-row">\
									<ul class="list-inline pull-left">\
										<li>{{fi-progressBar}}</li>\
									</ul>\
									<ul class="list-inline pull-right">\
										<li><a class="fa fa-trash jFiler-item-trash-action"></a></li>\
									</ul>\
								</div>\
								<div class="jFiler-item-text">\
									<textarea placeholder="Image caption" name="image_caption_{{fi-intval}}" id="image_caption_{{fi-intval}}" rows="2" width="100%">{{fi-caption}}</textarea>\
									{{fi-popup}}\
                                                                        <input type="hidden" name="image_{{fi-intval}}" value="{{fi-name}}" id="image_{{fi-intval}}"  />\
                                                                        <input type="hidden" class="pos_text" value="" name="image_position_{{fi-intval}}" id="image_position_{{fi-intval}}"  />\
								</div>\
							</div>\
						</div>\
					</li>',
            //itemAppend: null,
            progressBar: '<div class="bar"></div>',
            itemAppendToEnd: true,
			editor: true,
            canvasImage: false,
            removeConfirmation: true,
            _selectors: {
                list: '.jFiler-items-list',
                item: '.jFiler-item',
                progressBar: '.bar',
                remove: '.jFiler-item-trash-action'
            }
        },
        dragDrop: {
            dragEnter: null,
            dragLeave: null,
            drop: null,
            dragContainer: null,
        },
        uploadFile: {
            url: "ajax/ajax_upload.php?type="+galtype,
            data: {research: $('#research').val()},
            type: 'POST',
            enctype: 'multipart/form-data',
            synchron: true,
            beforeSend: function () 
			{ 	
				/*var file = img;
				
				$('#popup').modal1({
					closeOnEsc: true,
					closeOnOverlayClick: false,
					onOpen: function (overlay){
					   $(overlay).on('click', '.js-upload', function (){
						  $.modal1().close();
						  $('#tab_1').fileapi('upload');
					   });
					   $('.js-img', overlay).cropper({
						  file: file,
						  bgColor: '#fff',
						  maxSize: [$(window).width()-100, $(window).height()-100],
						  minSize: [200, 200],
						  selection: '90%',
						  onSelect: function (coords)
						  {
							 $('#tab_1').fileapi('crop', file, coords);
						  }
					   });
					}
				 }).open();*/
            },
            success: function (data, itemEl, listEl, boxEl, newInputEl, inputEl, id) {

                var dt = JSON.parse(data);
                if (dt.type == 'error')
                {
                    var parent = itemEl.find(".jFiler-jProgressBar").parent(),
                            new_file_name = JSON.parse(data),
                            filerKit = inputEl.prop("jFiler");
                    filerKit.files_list[id].name = new_file_name;
                    itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                        $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-check-circle\"></i> " + dt.msg + "</div>").hide().appendTo(parent).fadeIn("slow");
                    });

                } else
                {
                    var parent = itemEl.find(".jFiler-jProgressBar").parent(),
                            new_file_name = JSON.parse(data),
                            filerKit = inputEl.prop("jFiler");
                    filerKit.files_list[id].name = new_file_name;
                    itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                        $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
                    });
                    $("#sortable").sortable({
                        revert: true,
                        connectWith: ".jFiler-item",
                        start: function (e, ui) {
                            $(this).attr('data-previndex', ui.item.index());
                        },
                        stop: function (event, ui) {
                            var oldIndex = $(this).attr('data-previndex');
                            var newIndex = $(this).data("ui-sortable").currentItem.index();
                            var new_pos = parseInt(newIndex) + parseInt(1);
                            var old_pos = parseInt(oldIndex) + parseInt(1);
                            //var current_pos = $(this).data("ui-sortable").currentItem.find('.pos_text').val();
                            if (old_pos > new_pos)
                            {
                                $.each($('#sortable .jFiler-item'), function () {
                                    var this_pos = $(this).find('.pos_text').val();

                                    if (this_pos >= new_pos && this_pos < old_pos)
                                    {
                                        this_pos = parseInt(this_pos) + parseInt(1);
                                        $(this).find('.pos_text').val(this_pos);
                                        //$(this).find('textarea').html(this_pos);
                                    }

                                });
                            } else if (new_pos >= old_pos)
                            {
                                $.each($('#sortable .jFiler-item'), function () {
                                    var this_pos = $(this).find('.pos_text').val();

                                    if (this_pos <= new_pos && this_pos > old_pos)
                                    {
                                        this_pos = parseInt(this_pos) - parseInt(1);
                                        $(this).find('.pos_text').val(this_pos);
                                        //$(this).find('textarea').html(this_pos);
                                    }

                                });
                            }
                            $(this).data("ui-sortable").currentItem.find('.pos_text').val(new_pos);
                            //$(this).data("ui-sortable").currentItem.find('textarea').html(new_pos);
                            $(this).removeAttr('data-previndex');
                        }
                    });
                    //$("#sortable").disableSelection();
                    total_images++;
                    $('#total_images').val(total_images);
                    itemEl.find(".jFiler-item-text").append('<textarea placeholder="Image caption" name="image_caption_' + total_images + '" id="image_caption_' + total_images + '" rows="2" width="100%"></textarea><input type="hidden" name="image_' + total_images + '" value="' + new_file_name + '" id="image_' + total_images + '"  /><input class="pos_text" value="' + total_images + '" type="hidden" name="image_position_' + total_images + '" id="image_position_' + total_images + '"  />');
                    //alert('end');
                }
            },
            error: function (el) {
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function () {
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error, File not supported or image too large</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: null,
            onComplete: null
        },
        files: img1(),
        allowDuplicates: false,
        clipBoardPaste: true,
        excludeName: null,
        beforeRender: null,
        afterRender: null,
        beforeShow: null,
        beforeSelect: null,
        onSelect: function()
		{
			
		},
        afterShow: null,
        onRemove: function (itemEl, file, id, listEl, boxEl, newInputEl, inputEl) {

            var filerKit = inputEl.prop("jFiler"),
                    file_name = filerKit.files_list[id].name;

            if (typeof file_name == 'undefined')
            {
                file_name = file.name;
            }
            $.post("ajax/ajax_custom.php?type=remove_image", {file: file_name});
            //total_images--;
            //$('#total_images').val(total_images);


            setTimeout(
                    function ()
                    {
                        $.each($('#sortable .jFiler-item'), function () {
                            var ind = $(this).index();
                            ind = parseInt(ind) + parseInt(1);

                            var this_pos = $(this).find('.pos_text').val();
                            if (this_pos > ind)
                            {
                                this_pos = parseInt(this_pos) - parseInt(1);
                                $(this).find('.pos_text').val(this_pos);
                                //$(this).find('textarea').html(this_pos);
                            }
                        });
                    }, 500);
        },
        onEmpty: null,
        options: null,
        dialogs: {
            alert: function (text) {
                return alert(text);
            },
            confirm: function (text, callback) {
                confirm(text) ? callback() : null;
            }
        },
        captions: {
            button: "Choose Files",
            feedback: "Choose files To Upload",
            feedback2: "files were chosen",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
                filesType: "Only Images are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
            }
        }
    });
});
