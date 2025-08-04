var advanceFiltersArr = {};
function AjaxCustom(divId) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (typeof divId !== 'undefined')
            {
                document.getElementById(divId).innerHTML = xmlhttp.responseText;
            }
            $('#ajax-loader').toggle();
            setTimeout(function() {
                $('.alert').delay(1000).fadeOut();
            }, 2000);
        }
    }
    return xmlhttp;
}

function AjaxGridOriginal(limit, div_id, order_by, order_type, search_term, page_id, link) {
    $("#form1").submit(function(e) {
        e.preventDefault(e);
    });
    xmlhttp = AjaxCustom2(div_id, order_type, order_by, limit, search_term, page_id, link);
    xmlhttp.open("GET", "includes/" + link + "?limit=" + limit + "&order_type=" + order_type + "&order_by=" + order_by + "&search_term=" + search_term + "&page_id=" + page_id, true);
    $('#ajax-loader').toggle();
    xmlhttp.send();
}

function ChangeSortingOrder(order_type, order_by, div_id, limit, search_term, page_id, link) {
    xmlhttp = AjaxCustom2(div_id, order_type, order_by, limit, search_term, page_id, link);
    xmlhttp.open("GET", "includes/" + link + "?order_type=" + order_type + "&order_by=" + order_by + "&limit=" + limit + "&search_term=" + search_term + "&page_id=" + page_id, true);
    $('#ajax-loader').toggle();
    xmlhttp.send();
}


function changeStatus(table, unique_id, unique_id_value, div_id, order_type, order_by, limit, search_term, page_id, link) {
    alert("reach");
    bootbox.confirm("Are you sure want to change status?", function(result) {
        if (result)
        {
            xmlhttp = AjaxCustom2(div_id, order_type, order_by, limit, search_term, page_id, link);
            xmlhttp.open("GET", "ajax/ajax_change_status.php?table=" + table + '&unique_id=' + unique_id + '&unique_id_value=' + unique_id_value + "&order_type=" + order_type + "&order_by=" + order_by + "&limit=" + limit + "&search_term=" + search_term + "&page_id=" + page_id + "&link=" + link, true);
            $('#ajax-loader').toggle();
            xmlhttp.send();
        }
        else
        {
            return;
        }
    });
}

function changePinToHomePageStatus(table, unique_id, unique_id_value, div_id, order_type, order_by, limit, search_term, page_id, link) {
    bootbox.confirm("Are you sure want to change status?", function(result) {
        if (result)
        {
            xmlhttp = AjaxCustom2(div_id, order_type, order_by, limit, search_term, page_id, link);
            xmlhttp.open("GET", "ajax/ajax_change_pin_to_home_page_status.php?table=" + table + '&unique_id=' + unique_id + '&unique_id_value=' + unique_id_value + "&order_type=" + order_type + "&order_by=" + order_by + "&limit=" + limit + "&search_term=" + search_term + "&page_id=" + page_id + "&link=" + link, true);
            $('#ajax-loader').toggle();
            xmlhttp.send();
        }
        else
        {
            return;
        }
    });
}

function AjaxDelete(table, unique_id, unique_id_value, div_id, order_type, order_by, limit, search_term, page_id, link) {
    bootbox.confirm("Are you sure want to delete?", function(result) {
        if (result)
        {
            xmlhttp = AjaxCustom2(div_id, order_type, order_by, limit, search_term, page_id, link);
            xmlhttp.open("GET", "ajax/ajax_delete.php?table=" + table + "&unique_id=" + unique_id + "&unique_id_value=" + unique_id_value + "&order_type=" + order_type + "&order_by=" + order_by + "&limit=" + limit + "&search_term=" + search_term + "&page_id=" + page_id + "&link=" + link, true);
            $('#ajax-loader').toggle();
            xmlhttp.send();
        }
        else
        {
            return;
        }
    });
}

function AjaxDelete2(table, unique_id, unique_id_value, div_id, order_type, order_by, limit, search_term, page_id, link) {
    bootbox.confirm("Are you sure want to delete?", function(result) {
        if (result)
        {
            xmlhttp = AjaxCustom2(div_id, order_type, order_by, limit, search_term, page_id, link);
            xmlhttp.open("GET", "ajax/ajax_delete.php?table=" + table + "&unique_id=" + unique_id + "&unique_id_value=" + unique_id_value + "&order_type=" + order_type + "&order_by=" + order_by + "&limit=" + limit + "&search_term=" + search_term + "&page_id=" + page_id + "&link=" + link, true);
            $('#ajax-loader').toggle();
            xmlhttp.send();
        }
        else
        {
            return;
        }
    });
}


function AjaxCustom2(divId, order_type, order_by, limit, search_term, page_id, link) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById(divId).innerHTML = xmlhttp.responseText;
            $('#ajax-loader').toggle();
            setTimeout(function() {
                $('.alert').delay(1000).fadeOut();
            }, 2000);
            applyOrder(order_type, order_by, divId, limit, search_term, page_id, link)
        }
    }
    return xmlhttp;
}

function AjaxCustomOrders(divId, order_type, order_by, limit, search_term, page_id, link, order_status, order_flag, from_date, to_date, user_id, s_id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById(divId).innerHTML = xmlhttp.responseText;
            $('#ajax-loader').toggle();
            setTimeout(function() {
                $('.alert').delay(1000).fadeOut();
            }, 2000);
            applyOrderOrders(order_type, order_by, divId, limit, search_term, page_id, link, order_status, order_flag, from_date, to_date, user_id, s_id)
            $('#from_date').datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'yy-mm-dd',
                onSelect: function(dateText) {
                    $('#to_date').datepicker("option", "minDate", dateText);
                    $("#to_date").removeAttr('disabled');
                    //if ($('#to_date').val() != '')
                    //{
                    //   AjaxGridOrders(limit, divId, order_by, order_type, search_term, page_id, link, order_status, order_flag, dateText, $('#to_date').val(), user_id, s_id)
                    // }

                }
            });
            $('#to_date').datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'yy-mm-dd',
                minDate: $('#from_date').val(),
                onSelect: function(dateText) {
                    if ($('#from_date').val() == '')
                    {
                        alert('Please select from date');
                        return false;
                    }
                    AjaxGridOrders(limit, divId, order_by, order_type, search_term, page_id, link, order_status, order_flag, $('#from_date').val(), dateText, user_id, s_id)
                }
            });
        }
    }
    return xmlhttp;
}

function AjaxGrid(limit, div_id, order_by, order_type, search_term, page_id, link,cat_id=null,sub_cat_id=null,state_id=null,pin_to_home=null) {

    $("#form1").submit(function(e) {
        e.preventDefault(e);
    });
    xmlhttp = AjaxCustom2(div_id, order_type, order_by, limit, search_term, page_id, link);
    var get_params = link + "?limit=" + limit + "&order_type=" + order_type + "&order_by=" + order_by + "&search_term=" + search_term + "&page_id=" + page_id;

    if(cat_id){
        get_params += ("&a_category_id=" + cat_id);
    }

    if(sub_cat_id){
        get_params += ("&a_sub_cat_id=" + sub_cat_id);
    }

    if(state_id){
        get_params += ("&a_state_id=" + state_id);
    }
    if(pin_to_home){
        get_params += ("&a_pin_to_home=" + pin_to_home);
    }
    
    xmlhttp.open("GET", "includes/" + get_params, true);
    $('#ajax-loader').toggle();
    xmlhttp.send();
}


function AjaxGridOrders(limit, div_id, order_by, order_type, search_term, page_id, link, order_status, order_flag, from_date, to_date, user_id, s_id)
{
    $("#form1").submit(function(e) {
        e.preventDefault(e);
    });
    xmlhttp = AjaxCustomOrders(div_id, order_type, order_by, limit, search_term, page_id, link, order_status, order_flag, from_date, to_date, user_id, s_id);
    xmlhttp.open("GET", "includes/" + link + "?limit=" + limit + "&order_type=" + order_type + "&order_by=" + order_by + "&search_term=" + search_term + "&page_id=" + page_id + "&order_status=" + order_status + "&order_flag=" + order_flag + "&from_date=" + from_date + "&to_date=" + to_date + "&user_id=" + user_id + "&s_id=" + s_id, true);
    $('#ajax-loader').toggle();
    xmlhttp.send();
}


function applyOrder(order_type, order_by, divId, limit, search_term, page_id, link)
{
    var new_order = 'ASC';
    if (order_by == 'ASC')
    {
        new_order = "DESC";
    }
    $("#data_table th").each(function() {
        var id = $(this).attr("id");
        if ($("#" + id).length > 0) {
            if (this.id == order_type)
            {
                if (order_by == 'ASC')
                {
                    $(this).addClass('sorting_asc');
                }
                else if (order_by == 'DESC')
                {
                    $(this).addClass('sorting_desc');
                }
            }
            else
            {
                $(this).addClass('sorting');
            }
            $("#" + id).click(function() {
                //ChangeSortingOrder(this.id, new_order, divId, limit, search_term, page_id, link)
                AjaxGrid(limit, divId, new_order, this.id, search_term, page_id, link)
            });
        }
    });
}

function applyOrderOrders(order_type, order_by, divId, limit, search_term, page_id, link, order_status, order_flag, from_date, to_date, user_id, s_id)
{
    var new_order = 'ASC';
    if (order_by == 'ASC')
    {
        new_order = "DESC";
    }
    $("#data_table th").each(function() {
        var id = $(this).attr("id");
        if ($("#" + id).length > 0) {
            if (this.id == order_type)
            {
                if (order_by == 'ASC')
                {
                    $(this).addClass('sorting_asc');
                }
                else if (order_by == 'DESC')
                {
                    $(this).addClass('sorting_desc');
                }
            }
            else
            {
                $(this).addClass('sorting');
            }
            $("#" + id).click(function() {
                //ChangeSortingOrderOrders(this.id, new_order, divId, limit, search_term, page_id, link, order_status, order_flag)
                AjaxGridOrders(limit, divId, new_order, this.id, search_term, page_id, link, order_status, order_flag, from_date, to_date, user_id, s_id)
            });
        }
    });
}

function GetCity(state_id, div_id) {
    xmlhttp = AjaxCustom(div_id);
    xmlhttp.open("GET", "ajax/ajax_main.php?state_id=" + state_id + "&type=getCity", true);
    $('#ajax-loader').toggle();
    xmlhttp.send();
}


setTimeout(function() {
    $('.alert').delay(500).fadeOut();
}, 500);

(function($)
{
    $.sticky = function(note, options, callback) {
        return $.fn.sticky(note, options, callback);
    };

    $.fn.sticky = function(note, options, callback)
    {
        var position = 'bottom-left'; // top-left, top-right, bottom-left, or bottom-right

        var settings =
                {
                    'speed': 'slow', // animations: fast, slow, or integer
                    'duplicates': true, // true or false
                    'autoclose': 4000  // integer or false
                };
        if (!note)
        {
            note = this.html();
        }

        if (options)
        {
            $.extend(settings, options);
        }

        var display = true;
        var duplicate = 'no';

        var uniqID = Math.floor(Math.random() * 99999);

        $('.sticky-note').each(function()
        {
            if ($(this).html() == note && $(this).is(':visible'))
            {
                duplicate = 'yes';
                if (!settings['duplicates'])
                {
                    display = false;
                }
            }
            if ($(this).attr('id') == uniqID)
            {
                uniqID = Math.floor(Math.random() * 9999999);
            }
        });
        if (!$('body').find('.sticky-queue').html())
        {
            $('body').append('<div class="sticky-queue ' + position + '"></div>');
        }
        if (display)
        {
            $('.sticky-queue').prepend('<div class="sticky border-' + position + '" id="' + uniqID + '"></div>');
            $('#' + uniqID).append('<img src="images/error.png" class="sticky-close" rel="' + uniqID + '" title="Close" />');
            $('#' + uniqID).append('<div class="sticky-note" rel="' + uniqID + '">' + note + '</div>');

            var height = $('#' + uniqID).height();
            $('#' + uniqID).css('height', height);

            $('#' + uniqID).fadeIn(settings['speed']);
            display = true;
        }

        $('.sticky').ready(function()
        {
            if (settings['autoclose'])
            {
                $('#' + uniqID).delay(settings['autoclose']).fadeOut(settings['speed']);
            }
        });
        $('.sticky-close').click(function()
        {
            $('#' + $(this).attr('rel')).dequeue().fadeOut(settings['speed']);
        });

        var response =
                {
                    'id': uniqID,
                    'duplicate': duplicate,
                    'displayed': display,
                    'position': position
                }
        if (callback)
        {
            callback(response);
        }
        else
        {
            return(response);
        }

    }
})(jQuery);

function toggleSidebar()
{
    $('#leftbar').fadeToggle(500);
    $(".main-wrapper:first").toggleClass("full-content");
}

function updatePosition(unique_key_for_position, unique_key_value_for_position, position, old_position, table)
{
    $('#ajax-loader').toggle();
    var shortorder = {
        unique_key_for_position: unique_key_for_position,
        unique_key_value_for_position: unique_key_value_for_position,
        position: position,
        old_position: old_position,
        type: 'change_position_custom',
        table: table
    };
    $.ajaxSetup({
        cache: false
    });
    $.ajax({
        url: "ajax/ajax_main.php",
        async: false,
        data: shortorder,
        dataType: "html",
        type: "GET",
        success: function(html) {
            $("#data_grid").html(html);
        }
    });
    $('#ajax-loader').toggle();
}

function updatePositionNew(unique_key_for_position, unique_key_value_for_position, position, old_position, table)
{
    $('#ajax-loader').toggle();
    var shortorder = {
        unique_key_for_position: unique_key_for_position,
        unique_key_value_for_position: unique_key_value_for_position,
        position: position,
        old_position: old_position,
        type: 'change_position_new',
        table: table
    };
    $.ajaxSetup({
        cache: false
    });
    $.ajax({
        url: "ajax/ajax_main.php",
        async: false,
        data: shortorder,
        dataType: "html",
        type: "GET",
        success: function(html) {
            $("#data_grid").html(html);
        }
    });
    $('#ajax-loader').toggle();
}

//var i=0;
//$(document).ready(function() {
//    var callnotification = function() {
//        $.ajax({url: "ajax/notification.php", success: function(result) {
//                if (result != '')
//                {
//                    $.sticky(result);
//                    document.title = '('+i+') Arvind - admin panel';
//                }
//            }});
//        i++;
//    }
//    setInterval(callnotification, 8000);
//});

function customAlert(alert_text)
{
    bootbox.alert(alert_text);
}



function formatAMPM(date)
{
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}



function readOrder(send_to)
{
    var shortorder = {
        type: 'read_order',
        send_to: send_to
    };
    $.ajax({
        url: "ajax/ajax_main.php",
        async: false,
        data: shortorder,
        dataType: "html",
        type: "GET",
        success: function() {
            $('#notification_count').hide('slow', function() {
                $('#notification_count').remove();
            });
        }
    });
}

function showChart(start, end)
{
    var data = {
        type: 'show_chart',
        start_date: start,
        end_date: end
    };
    $.ajax({
        url: "ajax/ajax_chart.php",
        async: false,
        data: data,
        dataType: "html",
        type: "GET",
        success: function(html) {

            html = JSON.parse(html)
            var d = new Array();
            d.push(['Garment', 'Sell Percentage'])
            var percent
            $.each(html, function(index, value) {
                percent = Math.ceil((parseFloat(value.cnt) * parseInt(100)) / parseInt(value.total))
                d.push([value.garment + ' [' + value.cnt + ', ' + parseFloat(percent) + '%]', parseFloat(percent)])
            });

            var data = google.visualization.arrayToDataTable(d);


            var options = {
                title: '',
                is3D: true,
                slices: [{
                        color: '#b51c44'
                    }, {
                        color: '#ce4b27'
                    }, {
                        color: '#009600'
                    }, {
                        color: '#e88a05'
                    }, {
                        color: '#3498db'
                    }, {
                        color: '#b51e44'
                    }, {
                        color: '#ce4c27'
                    }, {
                        color: '#009e00'
                    }, {
                        color: '#e88e05'
                    }, {
                        color: '#349cdb'
                    },
                ]
            };
            var chart = new google.visualization.PieChart(document.getElementById('pie-chartContainer'));
            chart.draw(data, options);
        }
    });
}


function advanceFilters()
{
    var cid;
    $('.advance_filter_drop').each(function(i, obj) {
        cid = $(obj).data('id');
        if ($(this).val() !== '')
        {
            advanceFiltersArr[cid] = $(this).val();
        }
        else
        {
            delete advanceFiltersArr[cid];
        }
    });
    
    $('.advance_filter_date').each(function(i, obj) {
        cid = $(obj).data('id');
        if ($(this).val() !== '')
        {
            advanceFiltersArr[cid] = $(this).val();
        }
        else
        {
            delete advanceFiltersArr[cid];
        }
    });
    
    var qstr = $.param(advanceFiltersArr);
    var url = window.location.href.split("?")[0];
    window.location = url + '?' + qstr
}

function advanceFiltersResources(id)
{
    if(id == 0){
        resetAdvanceFilters();
    }
    else{
        var url = window.location.href.split("?")[0];
        window.location = url + '?' + "a_pin_to_home=" + id;
    }
}
function updateQueryStringParam(key, value) {
    let baseUrl = window.location.href.split("?")[0];
    let urlParams = new URLSearchParams(window.location.search);
    
    urlParams.delete('a_pin_to_home');

    if (value) {
        urlParams.set(key, value); // Set/update the key
    } else {
        urlParams.delete(key); // If value is null, remove the key
    }
    
    if(key == 'a_category_id'){
        urlParams.delete('a_sub_cat_id');
        urlParams.delete('a_state_id');
    }
    else if(key == 'a_sub_cat_id'){
        urlParams.delete('a_state_id');
    }

    window.location.href = baseUrl + "?" + urlParams.toString();
}

function advanceFiltersCategory(id) {

    updateQueryStringParam('a_category_id', id);

    document.getElementById("sub_category_advance_filter").style.display = "flex";
}

function advanceFiltersSubCatgory(id) {
    updateQueryStringParam('a_sub_cat_id', id);
}

function advanceFiltersState(id) {
    updateQueryStringParam('a_state_id', id);
}


function resetAdvanceFilters()
{
    var url = window.location.href.split("?")[0];
    window.location = url;
}






