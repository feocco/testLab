var data = {
  hostname: "ALAMO",
  licenses:"LE,CE,CM,OA",
  build:"Q2",
  os:"U",
  patch:"",
  status:"Down",
  notes:""};

$.ajax({
  url: 'https://sheetsu.com/apis/v1.0/34811115b8f7/hostname/ALAMO',
  data: data,
  dataType: 'json',
  type: 'PUT',

  // place for handling successful response
  // showing (redirecting to) something like /thanks.html
  // page could be a good idea
  success: function(data) {
    console.log(data);
  },

  // handling error response
  error: function(data) {
    console.log(data);
  }
});