$(document).ready(function() {
  var valueInHand = null;
  var thisValue;
  var thisLife;
  var spawns = 0;
  var alive;
  var lifeSpan = 1000;
  var downLifeThreshold = 700;
  var holdingLife;
  var birthTime;
  var age;

  thisMe = $("#phone").find("button");

  thisMe.mousedown(function(event) {
    age = 0;
    birthTime = new Date().getTime();
    value = $(event.currentTarget).data("value");
    holdingLife = setInterval(becomeOlder.bind(null, value), 10);
  });

  function becomeOlder() {
    if (age < downLifeThreshold) {
      age += 10;
    } else {
      $("#result").val(t9($("#result").val(), value));
      clearInterval(holdingLife);
    }
  }

  thisMe.mouseup(function(event) {
    var currentTime = new Date().getTime();

    if ((currentTime - birthTime) < downLifeThreshold) {
      clearInterval(holdingLife);
      alive = false;
      var thisValue = $(event.currentTarget).data("value");
      var chars = event.currentTarget.textContent;

      chars = chars.trim().split(/[\n\s]+/);
      chars.push(chars.shift());

      if (thisValue === valueInHand && thisLife) {
        alive = true;
        spawns++;
        if (spawns === chars.length) spawns = 0;
      } else {
        spawns = 0;
        valueInHand = thisValue;
      }

      clearTimeout(thisLife);
      beginNewLife(valueInHand);

      var textInBox = $("#result").val();
      textInBox.slice(0, -1);

      if (alive) {
        $("#result").val(t9(textInBox.slice(0, -1), chars[spawns]));
      } else {
        $("#result").val(t9(textInBox, chars[spawns]));
      }
    }
  });

  function beginNewLife(value) {
    thisLife = setTimeout(terminator, lifeSpan);
  }

  function terminator(value) {
    alive = false;
    valueInHand = null;
  }
});

function t9(text, value) {
  // I don't have any code to write here!
  return text + value;
}
