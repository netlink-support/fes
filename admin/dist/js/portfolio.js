
var portfolio = {
    ajax_url: 'ajax/ajax_custom.php',
    editors: new Array(),
    ajaxCustom: function (url, data, callback, callback_custom_variable_1) {
        $.ajax({
            url: url,
            data: data,
            method: 'POST',
            async: false,
            success: function (ret) {
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined") {
                        callback(ret, callback_custom_variable_1);
                    } else {
                        callback(ret);
                    }
                }
            },
            error: function (err) {
                alert('Error, Please try again later');
            }
        });
    },
    createSlug: function (value, id, tablename, edit, id_value) {
        var slug = portfolio.slugify(value)
        $('#' + id).val(slug)
        portfolio.verifySlug(slug, tablename, edit, id_value)
        return false;
    },
    slugify: function (text) {
        //return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
        return text.toLowerCase().replace(/[^a-zA-Z0-9-'-']+/g, '-').substring(0, 40)
    },
    verifySlug: function (slug, tablename, edit, id) {
        var data = {
            slug: slug,
            table: tablename,
            edit: edit,
            id: id,
            type: 'check_slug'
        };
        portfolio.ajaxCustom(portfolio.ajax_url, data, function (res) {
            var s1 = res;
            var s2 = s1.substring(1);

            if (s2 == 'ok' || s1 == 'ok') {
                $('#submit').removeAttr('disabled');
                portfolio.putHTML('', 'slug_error')
                return true
            } else {
                portfolio.putHTML(res, 'slug_error')
                if ($('#submit').length) {
                    $('#submit').attr('disabled', 'disabled');
                }
            }
        })
    },
    removeImage: function (tablename, where_value, where_field, image_field, language_flag) {
        var data = {
            table: tablename,
            where_value: where_value,
            image_field: image_field,
            where_field: where_field,
            language_flag: language_flag,
            type: 'remove_image'
        };
        portfolio.ajaxCustom(portfolio.ajax_url, data, function () {
            window.location.reload();
        })
    },
    changeLanguage: function (value) {
        if (value == '' || value == 0) {
            alert('Please select language');
            return false;
        }

        $.ajax({
            url: 'ajax/ajax_change_language.php',
            data: {
                language: value
            },
            method: 'POST',
            async: false,
            success: function (ret) {
                window.location.reload();
            },
            error: function (err) {
                alert('Error changing language, Please try again later');
            }
        });
    },
    addEditor: function (id, height, cst) {
        var height1 = 150;
        if (typeof height !== 'undefined') {
            height1 = height
        }

        if ($('#' + id).length > 0) {
            CKEDITOR.replace(id, {
                height: height1,
                filebrowserBrowseUrl: 'finder/elfinder.html',
                filebrowserUploadUrl: 'file/upload.php?type=Files',
            });

            CKEDITOR.config.allowedContent = true;
            CKEDITOR.dtd.$removeEmpty['span'] = false
            if (typeof cst != 'undefined' && cst == 1) {
                CKEDITOR.config.toolbar = [
                    //['Headings', 'Styles', 'Format', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'StrikeThrough', 'NumberedList', 'BulletedList', 'Table', 'Link', 'Source', 'Image', 'imageuploader', 'Accordion', 'btgrid', 'Slideshow']
                    ['Headings', 'Styles', 'Format', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'StrikeThrough', 'NumberedList', 'BulletedList', 'Table', 'Link', 'Source']
                ];
            } else {
                CKEDITOR.config.toolbar = [
                    //['Headings', 'Styles', 'Format', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'StrikeThrough', 'NumberedList', 'BulletedList', 'Table', 'Link', 'Source', 'Image', 'imageuploader', 'Accordion', 'btgrid', 'Slideshow']
                    ['Headings', 'Styles', 'Format', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'StrikeThrough', 'NumberedList', 'BulletedList', 'Table', 'Link', 'Source']
                ];
                //                CKEDITOR.config.toolbar = [
                //                    ['Headings', 'Styles', 'Format', 'Font', 'FontSize', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print', 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                //                    ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source', 'btgrid', 'imageuploader']
                //                ];
            }

            CKEDITOR.instances[id].fire('btgrid');

        }
    },
    addEditor2: function (id, height, cst) {
        var height1 = 150;
        if (typeof height !== 'undefined') {
            height1 = height
        }

        if ($('#' + id).length > 0) {
            CKEDITOR.replace(id, {
                height: height1
            });

            CKEDITOR.config.allowedContent = true;
            CKEDITOR.dtd.$removeEmpty['span'] = false

            CKEDITOR.config.toolbar = [
                ['Bold', 'Italic', 'Underline', 'NumberedList', 'BulletedList', 'Link', 'Source']
            ];
            CKEDITOR.instances[id].fire('btgrid');

        }
    },

    addCropper: function (id, width, height, image_path, type, preview, name_inp) {
        var _URL = window.URL || window.webkitURL;
        asp_ratio = 16 / 9;
        var height1 = height;
        if (height == 0) {
            height1 = width;
            // asp_ratio = false;
        } else {
            height1 = height;
        }

        if (typeof preview == 'undefined') {
            preview = '#js-preview';
        }
        if (typeof name_inp == 'undefined') {
            name_inp = '#thumb_image_name';
        }
        var upload_type = 'image_upload';
        if (typeof type !== 'undefined') {
            upload_type = type;
        }

        $('#' + id).fileapi({
            url: 'ajax/ajax_custom.php?type=' + upload_type + '&image_path=' + image_path + '&width=' + 1600,
            accept: 'image/*',
            imageSize: {
                minWidth: width,
                minHeight: height1
            },
            elements: {
                active: {
                    //show: '#ajax-loader',
                    hide: '.js-browse'
                },
                progress: '.js-progress'
            },
            onSelect: function (evt, ui) {
                var file = ui.files[0];
                if (typeof file == 'undefined') {
                    alert('Image dimensions should be minimum ' + width + 'x' + height1);
                    return false;
                }

                if (!FileAPI.support.transform) {
                    alert('Your browser does not support Flash :(');
                } else if (file) {
                    $('#popup').modal1({
                        closeOnEsc: true,
                        closeOnOverlayClick: false,
                        onOpen: function (overlay) {
                            $(overlay).on('click', '.js-upload', function () {
                                $.modal1().close();
                                $('#' + id).fileapi('upload');
                            });
                            $('.js-img', overlay).cropper({
                                file: file,
                                allowResize: true,
                                allowSelect: false,
                                setSelect: [0, 0, 1600, 900],
                                aspectRatio: 1600 / 900,
                                bgOpacity: 0.2,
                                //boxWidth: 650, //Maximum width you want for your bigger images
                                //boxHeight: 400, //Maximum Height for your bigger images
                                bgColor: 'black',
                                //addClass: 'jcrop-dark',
                                //minSize: [width, height],
                                //trueSize: [500, 370],
                                maxSize: [$(window).width(), $(window).height() - 100],
                                onSelect: function (coords) {
                                    $('#' + id).fileapi('crop', file, coords);
                                }
                            });
                        }
                    }).open();
                }
            },
            onFileUpload: function (evt) {
                $('#loader').show();
            },
            onFileComplete: function (evt, res) {
                $('#loader').hide();
                if (res.result != '') {
                    console.log(res.result);
                    $(name_inp).val(res.result)
                    $(preview).html("<img style='width:150px' src='" + res.result + "' /><br/><br/>")
                }
            }

        });
    },

    putHTML: function (html, object_id) {
        $('#' + object_id).html(html)
    },
    checkBoxToggle: function (id, div_id) {
        $('#' + id).on('ifChecked', function (event) {
            $('#' + div_id).css('display', '')
        });
        $('#' + id).on('ifUnchecked', function (event) {
            $('#' + div_id).css('display', 'none')
        });
    },
    removeProductDoc: function (doc_id, product_id) {
        var data = {
            doc_id: doc_id,
            product_id: product_id,
            type: 'remove_product_doc'
        };
        portfolio.ajaxCustom(portfolio.ajax_url, data, function (res) {
            $('#product_docs').html(res)
        })
    },
    removeGalleryImage: function (ref_id, gallery_type, image_id) {
        var data = {
            ref_id: ref_id,
            gallery_type: gallery_type,
            image_id: image_id,
            type: 'remove_gallery_image'
        };
        portfolio.ajaxCustom(portfolio.ajax_url, data, function (res) {
            $('#gallery_grid').html(res)
        })
    },
    openModal: function (id) {
        $('#' + id).modal('show');
    },
    closeModal: function (id) {
        $('#' + id).modal('hide');
    },
    updatePosition: function (unique_key_for_position, unique_key_value_for_position, position, old_position, table, parent, parent_value) {
        var shortorder = {
            unique_key_for_position: unique_key_for_position,
            unique_key_value_for_position: unique_key_value_for_position,
            position: position,
            old_position: old_position,
            type: 'change_position_custom',
            table: table
        };

        if (typeof parent != undefined && typeof parent_value != undefined) {
            var shortorder = {
                unique_key_for_position: unique_key_for_position,
                unique_key_value_for_position: unique_key_value_for_position,
                position: position,
                old_position: old_position,
                type: 'change_position_custom',
                table: table,
                parent_value: parent_value,
                parent: parent,
            };
        }

        $.ajaxSetup({
            cache: false
        });
        $.ajax({
            url: portfolio.ajax_url,
            async: false,
            data: shortorder,
            dataType: "html",
            type: "GET",
            success: function (html) {
                $("#data_grid").html(html);
            }
        });
    },
    updatePosition2: function (unique_key_for_position, unique_key_value_for_position, position, old_position, table, parent, parent_value) {
        var shortorder = {
            unique_key_for_position: unique_key_for_position,
            unique_key_value_for_position: unique_key_value_for_position,
            position: position,
            old_position: old_position,
            type: 'change_position_custom',
            table: table
        };

        if (typeof parent != undefined && typeof parent_value != undefined) {
            var shortorder = {
                unique_key_for_position: unique_key_for_position,
                unique_key_value_for_position: unique_key_value_for_position,
                position: position,
                old_position: old_position,
                type: 'change_position_custom',
                table: table,
                parent_value: parent_value,
                parent: parent,
            };
        }

        $.ajaxSetup({
            cache: false
        });
        $.ajax({
            url: portfolio.ajax_url,
            async: false,
            data: shortorder,
            dataType: "html",
            type: "GET"
        });
    },
    swapPosition: function (cat_id, sub_cat_id = 0, new_position, old_position) {

        console.log("Swapping position of ID:", sub_cat_id, "to new position:", new_position);

        $.ajax({
            url: 'includes/cats.php',
            type: 'POST',
            data: {
                cat_id: cat_id,
                sub_cat_id: sub_cat_id,
                new_pos: new_position,
                old_pos: old_position,
            },
            success: function (response) {
                let data = JSON.parse(response);
                // alert(data.result);
                window.location.reload();
            },
            error: function (xhr) {
                console.error('Error:', xhr.responseText);
            }
        });
    }

}


//$(document).ready(function()
//{
//    var loading_indicator = '<div id="loading-indicator" style="display:none;" class="loading-indicator">' +
//            '<div class="loading-overlay">&nbsp;</div>' +
//            '<div class="loading-content">' +
//            '</div>' +
//            '</div>';
//
//    $('body').prepend(loading_indicator);
//
//    $.ajaxSetup(
//            {
//                cache: true
//            });
//
//    $(document).ajaxStart(function() {
//        $('#loading-indicator').show();
//    }).ajaxStop(function()
//    {
//        $('#loading-indicator').hide();
//    });
//
//    //code to run when error has occured on page
//    window.onerror = function() {
//        $('#loading-indicator').hide();
//    }
//});





