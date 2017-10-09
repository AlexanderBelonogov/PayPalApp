$(document).ready(function() {

  $('#check-radio-tools').on('change', function() {
    $('#likes').show();
    $('#followers').hide();
  });

  $('#check-radio-tools-two').on('change', function() {
    $('#likes').hide();
    $('#followers').show();
  });

  $('#likes .btn-pay').on('click', function(e) {
    var $popup = $('.popup');
    var amount = $(e.target).parent().find('.cost').text();
    $popup.find('.amount').val(amount);
    $popup.show();
  });

  $('#likes .btn-pay-2').on('click', function() {
    $('.popup-2').show();
  });

  $('#followers .btn-pay').on('click', function() {
    $('.popup-followers').show();
  });

  $('.icon-close').on('click', function() {
    $('.popup, .popup-2, .popup-followers').hide();
  });

  $('#popup_form .add-field').on('click', function() {
    $('#popup_form .block-input-form-popup:not(.mail)').append(
      "<div class='block-input-form-popup'>" +
        "<div class='null-block info'>" +
          "<img class='icon-info add-field' src='images/add-(2).svg'/>" +
          "<img class='icon-info important' src='images/icon-(17).svg'/>" +
        "</div>" +
        "<input class='bg-input-form-popup' placeholder='Link to photo or video', minlength='3', name='link_inst[]', type='text'/>" +
      "</div>"
    );
  });

});
