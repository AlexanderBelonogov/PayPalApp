$(document).ready(function() {

// Show Followers or Likes block
  $('#check-radio-tools').on('change', function() {
    $('#likes').show();
    $('#followers').hide();
  });

  $('#check-radio-tools-two').on('change', function() {
    $('#likes').hide();
    $('#followers').show();
  });

// Show Likes popup
  $('#likes .btn-pay').on('click', function(e) {
    var $popup = $('.popup');
    var amount = $(e.target).parent().find('.cost').text();
    $popup.find('.amount').val(amount);
    $popup.show();
  });

// Show popup for Likes as `Auto-Likes`
  $('#likes .btn-pay-2').on('click', function() {
    $('.popup-2').show();
  });

// Show Followers popup
  $('#followers .btn-pay').on('click', function() {
    $('.popup-followers').show();
  });

// Close all popups and clear content in it
  $('.icon-close').on('click', function() {
    var popupLikes = $('#popup_form .additional-block');
    $('.popup, .popup-2, .popup-followers').hide();
    if (popupLikes.length) {
      popupLikes.remove();
      $('#add-icon').addClass('add-field');
    }
    $('#popup_mail, #popup_mail_followers').val('');
    $('.block-input-form-popup.mail').removeClass('error')
  });

// Add new input block for Likes (link to photo or video)
  $(document).on('click', '#popup_form .add-field', function() {
    var additionalBlocks = $('#popup_form .additional-block');
    var fieldCount = additionalBlocks.length;

    if (fieldCount && (fieldCount > 8 || canAddNewLinkField(additionalBlocks.find('input')))) return;
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

// Validations
  // validate likes form on submit
  $('#popup_send').on('click', function(e) {
    e.preventDefault();
    var form = $('#popup_form');
    validateMailById('#popup_form', '#popup_mail');
    if (!form.find('.error').length) form.submit();
  });

  // validate likes form on focusout
  $('#popup_mail').on('focusout', function() {
    validateMailById('#popup_form', '#popup_mail');
  });

  // validate followers form on submit
  $('#popup_send_followers').on('click', function(e) {
    e.preventDefault();
    var form = $('#popup_form_followers');
    validateName();
    validateMailById('#popup_form_followers', '#popup_mail_followers');
    if (!form.find('.error').length) form.submit();
  });

  // validate followers form on focusout for Mail
  $('#popup_mail_followers').on('focusout', function() {
    validateMailById('#popup_form_followers', '#popup_mail_followers');
  });

  // validate followers form on focusout for Name
  $('#link_inst_followers').on('focusout', function() {
    validateName();
  });

  function validateMailById(formId, inputId) {
    var patt = /^.+@.+[.].{2,}$/i;
    if (patt.test($.trim($(inputId).val()))) {
      $(formId + ' .block-input-form-popup.mail').removeClass('error');
      return true;
    } else {
      $(formId + ' .block-input-form-popup.mail').addClass('error');
    }
  }

// For Follower popup
  function validateName() {
    if ($.trim($('#link_inst_followers').val()).length) {
      $('#popup_form_followers .block-input-form-popup.first').removeClass('error');
      return true;
    } else {
      $('#popup_form_followers .block-input-form-popup.first').addClass('error');
    }
  }

  function canAddNewLinkField(inputs) {
    $.each(inputs, function(index, input) {
      if (!$(input).val().length) {
        return result = true;
      }
    });
    return result;
  }
});
