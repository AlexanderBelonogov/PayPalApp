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
    var popupLikes = $('#popup_form .additional-block');
    $('.popup, .popup-2, .popup-followers').hide();
    if (popupLikes.length) {
      popupLikes.remove();
      $('#add-icon').addClass('add-field');
    }
  });

  $(document).on('click', '#popup_form .add-field', function() {
    var fieldCount = $('#popup_form .additional-block').length;
    if (fieldCount > 8) return;
    var addIcon = '';
    $(this).removeClass('add-field');
    if (fieldCount < 8) {
      addIcon = "<img class='icon-info " + (fieldCount < 8 ? 'add-field' : '') + "' src='images/add-(2).svg'/>";
    }
    $('#popup_form .block-input-form-popup:not(.mail)').last().after(
      "<div class='block-input-form-popup additional-block'>" +
        "<div class='null-block info'>" + addIcon +
          "<img class='icon-info important' src='images/icon-(17).svg'/>" +
        "</div>" +
        "<input class='bg-input-form-popup' placeholder='Link to photo or video', minlength='3', name='link_inst[]', type='text'/>" +
      "</div>"
    );
  });

  $('#popup_send').on('click', function(e) {
    e.preventDefault();
    if (!validateEmail()) return;
    $(this).submit();
  });

  $('#popup_mail').on('focusout', function() {
    validateEmail();
  });

  function validateEmail() {
    var emailName = $.trim($('#popup_mail').val());
    var patt = /^.+@.+[.].{2,}$/i;

    if (!patt.test(emailName)) {
      $('#popup_form .block-input-form-popup.mail').addClass('error');
      return false;
    } else {
      $('#popup_form .block-input-form-popup.mail').removeClass('error');
      return true;
    }
  }
});
