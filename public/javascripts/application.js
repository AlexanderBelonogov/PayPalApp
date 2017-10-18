$(document).ready(function() {

  var count = ['1 000', '2 000', '5 000', '10 000', '20 000', '50 000', '100 000']
  var price = ['2.90', '5.20', '10.90', '18.90', '32.90', '59.90', '109.90']

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
    $('#popup_send').val('Pay ' + amount + ' USD');
    $popup.show();
  });

// Show popup for Likes as `Auto-Likes`
  $('#likes .btn-pay-2').on('click', function() {
    $('.popup-2').show();
  });

// Show Followers popup
  $('#followers .btn-pay').on('click', function(e) {
    var amount = $(e.target).parent().find('.cost').text();
    $('#popup_send_followers').val('Pay ' + amount + ' USD');
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
    $('#popup_form .reset, #popup_form_2 .reset, #popup_form_followers .reset').val('');
    $('.block-input-form-popup').removeClass('error');
    $('#popup_form .icon-info:not(.important)').removeClass('hide');
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
    var inputs = form.find('.first-block .bg-input-form-popup, .additional-block .bg-input-form-popup');
    validateMailById('#popup_form', '#popup_mail');
    $.each(inputs, function(index, input) {
      validateLink($(input));
    });
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

  // validate links form on focusout for Link
  $(document).on('focusout', '#popup_form .additional-block .bg-input-form-popup, #popup_form .first-block .bg-input-form-popup', function() {
    validateLink($(this));
  });

  // click on minus button for likes
  $(document).on('click', '#minus-button', function() {
    var step = parseInt(this.getAttribute('data-step')) - 2;
    if (step < 0) return;
    changeAutoLikes(step);
  });

  // click on plus button for likes
  $(document).on('click', '#plus-button', function() {
    var step = parseInt(this.getAttribute('data-step'));
    if (step > 6) return;
    changeAutoLikes(step);
  });

  // change count of photos in popup message
  $(document).on('focusout', '#count-of-photo', function() {
    var value = $(this).val().length ? $(this).val() : 0;
    $('#form_autolike_count_photos').text(value);
  });
// =================== FUNCTIONS ===================

  function changeAutoLikes(step) {
    $('#plus-button, #minus-button').attr('data-step', step + 1)
    $('#autolike_plan').text(count[step]);
    $('#autolike_cost').text(price[step]);
    $('#form_autolike_count_likes').text(count[step]);
    $('#popup_send_2').val('Pay ' + price[step] + ' USD');
  }

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
    // TODO: how to validate?
    if ($.trim($('#link_inst_followers').val()).length) {
      $('#popup_form_followers .block-input-form-popup.first').removeClass('error');
      return true;
    } else {
      $('#popup_form_followers .block-input-form-popup.first').addClass('error');
    }
  }

// validate link field
  function validateLink(input) {
    // TODO: how to validate?
    var parent = input.parent('.block-input-form-popup');
    if ($.trim(input.val()).length) {
      parent.removeClass('error');
      parent.find('.icon-info:not(.important)').removeClass('hide');
    } else {
      parent.addClass('error');
      parent.find('.icon-info:not(.important)').addClass('hide');
    }
  }

// return true if can add new field
  function canAddNewLinkField(inputs) {
    var result = false;
    $.each(inputs, function(index, input) {
      if (!$(input).val().length) {
        return result = true;
      }
    });
    return result;
  }
});
