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

  $('img').on('click', function() {
    var nextBlockNumber = parseInt(this.getAttribute('data-next'));
    $('#popup_form .block-' + (nextBlockNumber - 1)).after(
      $('<div/>').addClass('block-input-form-popup block-' + nextBlockNumber).append(
        $('<div/>').addClass('null-block info icon-block').append(
          $('<img/>').addClass('icon-info').attr('src', 'images/add-(2).svg').attr('data-next', nextBlockNumber)
        )
      ).append(
        $('<input/>').attr({ type: 'text', minlength: '3', class: 'bg-input-form-popup', name: 'link_inst[]', placeholder: 'Link to photo or video' })
      ).show()
    );
  });

});
