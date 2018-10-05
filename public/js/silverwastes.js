var prices = {};

function updatePrices(callback) {
  var url = "https://api.guildwars2.com/v2/commerce/prices?ids=";
  var itemIds = "19723,19726,19727,19724,19722,19725,19719,19728,19730,19731,19729,19732,19697,19699,19702,19700,19701,19718,19739,19741,19743,19748,19745,80681,24294,24341,24350,24288,24356,24299,24282,24276,49424,75919";
  url = url + itemIds;
  $.getJSON(url, function(data) {
    $.each(data, function (index, value) {
      var Row = document.getElementById(value["id"]);
      var Cells = Row.getElementsByTagName("td");
      Cells[2].innerText = (parseInt(value["sells"]["unit_price"]) / 100).toFixed(2);
      prices[value["id"]] = (parseInt(value["sells"]["unit_price"]) / 100).toFixed(2)
    });
    callback();
  });
}
var wood1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var wood2 = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
var wood3 = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
var wood4 = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
var wood5 = [59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
var wood6 = [70,71,72,73,74,75,76,77,78,79,80];
var woodIds = [19723,19726,19727,19724,19722,19725];

var leather1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
var leather2 = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
var leather3 = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
var leather4 = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
var leather5 = [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
var leather6 = [74,75,76,77,78,79,80];
var leatherIds = [19719,19728,19730,19731,19729,19732];

var cloth1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var cloth2 = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
var cloth3 = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
var cloth4 = [44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
var cloth5 = [58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
var cloth6 = [74,75,76,77,78,79,80];
var clothIds = [19718,19739,19741,19743,19748,19745];

var ore1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var ore2 = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
var ore3 = [49,50,51,52,53,54,55,56,57,58,59,60,61,62];
var ore4 = [63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
var ore5 = [70,71,72,73,74,75,76,77,78,79,80];
var oreIds = [19697,19699,19702,19700,19701];

var bloodstoneWarpedHideId = 80681;

var fractalEncryptionId = 75919;

var fractalItems = [24294,24341,24350,24288,24356,24299,24282,24276,49424]; 

var woodlevels = [wood1, wood2, wood3, wood4, wood5, wood6];
var leatherlevels = [leather1, leather2, leather3, leather4, leather5, leather6];
var clothlevels = [cloth1, cloth2, cloth3, cloth4, cloth5, cloth6];
var orelevels = [ore1, ore2, ore3, ore4, ore5]

function calculateExpectedValue(level) {
  var matsMed = 2.26
  var matsLight = 2.26
  var matsHeavy = 1.53
  var matsWepMetal = 0.578
  var matsWepWood = 0.949
  var evWepWood = 0;
  var evWepMetal = 0;
  var evHeavy = 0;
  var evMed = 0;
  var evLight = 0;
  for (var i = 0; i < 6; i++)
  {
    if(woodlevels[i].indexOf(level) > -1)
    {
      var value = prices[woodIds[i]];
      if (evWepWood == 0)
      {
        evWepWood = matsWepWood * value;
      }
      else if (i == 5)
      {
        evWepWood = (evWepWood * .9) + ((matsWepWood * value) * .1);
      }
      else
      {
        evWepWood = (evWepWood + (matsWepWood * value)) / 2;
      }
    }
    if(leatherlevels[i].indexOf(level) > -1)
    {
      var value = prices[leatherIds[i]];
      if (evMed == 0)
      {
        evMed = matsMed * value;
      }
      else if (i == 5)
      {
        evMed = (evMed * .9) + ((matsMed * value) * .1);
      }
      else
      {
        evMed = (evMed + (matsMed * value)) / 2;
      }
    }
    if(clothlevels[i].indexOf(level) > -1)
    {
      var value = prices[clothIds[i]];
      if (evLight == 0)
      {
        evLight = matsLight * value;
      }
      else if (i == 5)
      {
        evLight = (evLight * .9) + ((matsLight * value) * .1);
      }
      else
      {
        evLight = (evLight + (matsLight * value)) / 2;
      }
    }
    if(i < 5 && orelevels[i].indexOf(level) > -1)
    {
      var value = prices[oreIds[i]];
      if (evWepMetal == 0)
      {
        evWepMetal = matsWepMetal * value;
      }
      else if (i == 4)
      {
        evWepMetal = (evWepMetal * .9) + ((matsWepMetal * value) * .1);
      }
      else
      {
        evWepMetal = (evWepMetal + (matsWepMetal * value)) / 2;
      }
      if (evHeavy == 0)
      {
        evHeavy = matsHeavy * value;
      }
      else if (i == 4)
      {
        evHeavy = (evHeavy * .9) + ((matsHeavy * value) * .1);
      }
      else
      {
        evHeavy = (evHeavy + (matsHeavy * value)) / 2;
      }
    }
  }
  var evWeapon = evWepMetal + evWepWood;
  var evEven = (evWeapon + evHeavy + evMed + evLight) / 4
  var evTrue = (evWeapon * 19 + evHeavy * 6 + evMed * 6 + evLight * 6) / 37
  return [evWeapon, evHeavy, evMed, evLight, evEven, evTrue];
}

function rebuildTable() {
  var tableToUpdate = document.getElementById("data-table");
  var maxValues = [0, 0, 0, 0, 0, 0];
  var maxLevels = [0, 0, 0, 0, 0, 0];
  for (var i = 0; i < 80; i++)
  {
    var valueStuff = calculateExpectedValue(i + 1);
    for (var j = 0; j < valueStuff.length; j++)
    {
      if (maxValues[j] < valueStuff[j])
      {
        maxValues[j] = valueStuff[j];
        maxLevels[j] = [i + 1];
      }
      else if (maxValues[j] == valueStuff[j])
      {
        maxLevels[j].push(i + 1);
      }
    }
    var eleToUpdate = document.getElementById("data-table-" + (i + 1));
    if(eleToUpdate != null)
    {
      var tagsStuff = eleToUpdate.getElementsByTagName("td");
      tagsStuff[0].innerText = (i + 1);
      for (var j = 1; j < tagsStuff.length; j++)
      {
        tagsStuff[j].innerText = (valueStuff[j - 1]).toFixed(2);
      }
    }
    else
    {
      var row = tableToUpdate.insertRow(i + 1);
      row.id = "data-table-" + (i + 1);
      var cell0 = row.insertCell(0);
      cell0.innerText = i + 1;
      for (var j = 0; j < valueStuff.length; j++)
      {
        var cell = row.insertCell(j + 1);
        cell.innerText = (valueStuff[j]).toFixed(2);
      }
    }
  }

  document.getElementById("bestLevels").innerText = maxLevels[5];
  document.getElementById("bestValue").innerText = maxValues[5].toFixed(2);
  calculateBloodstoneHide();
  calculateFractalEncryption();

  var rainbows = [];
  for (var i = 0; i < maxValues.length; i++)
  {
    var rainbow = new Rainbow();
    rainbow.setSpectrum('red', 'white', 'green');
    rainbow.setNumberRange(0, maxValues[i]);
    rainbows[i] = rainbow;
  }
  for (var i = 0; i < 80; i++)
  {
    var eleToUpdate = document.getElementById("data-table-" + (i + 1));
    var tagsStuff = eleToUpdate.getElementsByTagName("td");
    for (var j = 1; j < tagsStuff.length; j++)
    {
      tagsStuff[j].style.backgroundColor = "#" + rainbows[j - 1].colorAt(parseFloat(tagsStuff[j].innerText));
    }
  }
}

function calculateBloodstoneHide() {
  var dropRates = [0.05, 0.05, 0.04, 0.04, 0.45, 0.5];
  var expectedValue = 0;
  for (var i = 0; i < dropRates.length; i++)
  {
    var value = prices[leatherIds[i]];
    expectedValue = expectedValue + (dropRates[i] * value);
  }
  expectedValue -= 0.03 //salvage cost
  var Row = document.getElementById("bloodstone_salvage");
  var Cells = Row.getElementsByTagName("td");
  Cells[2].innerText = expectedValue.toFixed(2);
  var bloodstoneHideValue = prices[bloodstoneWarpedHideId];
  var profit = (expectedValue - bloodstoneHideValue).toFixed(2);
  if (profit > 0)
  {
    document.getElementById("salvageOrSell").innerText = "Salvage";bloodstoneProfit
  }
  else
  {
    document.getElementById("salvageOrSell").innerText = "Sell on TP";
  }
  document.getElementById("bloodstoneProfit").innerText = Math.abs(profit);

}

function calculateFractalEncryption() {
  var junkDropRates = [0.17, 0.29, 0.43, 0.29];
  var junkValues = [60, 20, 30, 25];
  expectedValue = 0;
  for (var i = 0; i < junkDropRates.length; i++)
  {
    expectedValue = expectedValue + (junkDropRates[i] * junkValues[i]) // No need to correct, since you just sell these;
  }

  matDropRates = 0.34
  for (var i = 0; i < fractalItems.length - 1; i++)
  {
    expectedValue = expectedValue + ((prices[fractalItems[i]] * matDropRates) * .85) // TP Tax correction;
  }

  agonyDropRate = 2.24
  expectedValue = expectedValue + ((prices[fractalItems[fractalItems.length - 1]] * agonyDropRate * .85)) // TP Tax Correction;
  expectedValue = expectedValue.toFixed(2);

  var keyValue = expectedValue - (prices[fractalEncryptionId] * .85) // TP Tax Correction;

  if (keyValue <= 20)
  {
    document.getElementById("fractalEncryptions").innerText = "Use free keys then sell";
  } else if (keyValue <= 25.04)
  {
    document.getElementById("fractalEncryptions").innerText = "Buy deeply discounted keys then sell";
  } else if (keyValue <= 30)
  {
    document.getElementById("fractalEncryptions").innerText = "Buy discounted keys then sell";
  } else 
  {
    document.getElementById("fractalEncryptions").innerText = "Buy Encryptions on TP and open";
  }


}

function refreshAll() {
  updatePrices(rebuildTable);
}

refreshAll();