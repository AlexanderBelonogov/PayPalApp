$(document).ready(function() {

  $('#check-radio-tools').on('change', function() {
      $('#likes').removeClass('hide');
      $('#followers').addClass('hide');
  });

  $('#check-radio-tools-two').on('change', function() {
    $('#likes').addClass('hide');
    $('#followers').removeClass('hide');
  });

});
