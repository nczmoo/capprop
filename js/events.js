$(document).on('click', '', function(e){

});

$(document).on('click', '.deleteAd', function(e){
  game.deleteAd(e.target.id.split('-')[1]);
  ui.displayAds();
});

$(document).on('click', '#createAd', function(e){
  if ($("[name=pv]:checked").length == 0){
    console.log('No keyword selected.');
    return;
  } else if ($("[name=product]:checked").length == 0){
    console.log('No product selected.');
    return;
  }
  game.createAd($("#adCost").val());
  ui.displayAds();
});

$(document).on('click', '.hide', function(e){
  ui.hide(e.target.id.split('-')[1])
});

$(document).on('click', '.show', function(e){
  ui.show(e.target.id.split('-')[1])
});

$(document).on('click', 'button', function(e){
  ui.refresh()
})
