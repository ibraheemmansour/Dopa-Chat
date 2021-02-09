var exports = module.exports = {};

import AsyncStorage from '@react-native-community/async-storage';
import includes from 'lodash/includes';

import Settings from './settings.js';

exports.GetSortColumn_NSG = function (nsg, key) {
  if (key == Settings.SortByList_NSG.Name.value) {
    return nsg._name;
  } else if (key == Settings.SortByList_NSG.LocationAddress.value) {
    return nsg.locationName;
  } else if (key == Settings.SortByList_NSG.NetworkName.value) {
    return nsg.networkName;
  }
}

exports.GetSortColumn_Networks = function (network, key) {
  if (key == Settings.SortByList_Networks.Name.value) {
    return network.name;
  } else if (key == Settings.SortByList_Networks.LocationsCount.value) {
    return network.locationsCount;
  }
}

exports.GetSortColumn_Locations = function (location, key) {
  if (key == Settings.SortByList_Locations.LocationAddress.value) {
    return location.address;
  } else if (key == Settings.SortByList_Locations.NSGsCount.value) {
    return location.nsgs.length;
  } else if (key == Settings.SortByList_Locations.TotalBandwidth.value) {
    return location.totalBandwidth;
  }
}

exports.GetSortColumn_NSG_Per_Location = function (nsg, key) {
  if (key == Settings.SortByList_Location_NSGs.NSGName.value) {
    return nsg._name;
  } else if (key == Settings.SortByList_Location_NSGs.NetworkName.value) {
    return nsg.networkName;
  }
}

exports.MapNSGLocationStatus = function (nsgs) {
  if (nsgs.length == 1) {
    return nsgs[0].status;
  }

  if (nsgs[0].status == Settings.CPE_STATUSES.UP && nsgs[1].status == Settings.CPE_STATUSES.UP) {
    return Settings.CPE_STATUSES.UP;
  } else if (nsgs[0].status == Settings.CPE_STATUSES.DOWN && nsgs[1].status == Settings.CPE_STATUSES.DOWN) {
    return Settings.CPE_STATUSES.DOWN;
  } else if (nsgs[0].status == Settings.CPE_STATUSES.NOT_ACTIVATED && nsgs[1].status == Settings.CPE_STATUSES.NOT_ACTIVATED) {
    return Settings.CPE_STATUSES.NOT_ACTIVATED;
  } else {
    return Settings.CPE_STATUSES.WITH_ALERTS;
  }
}

exports.MapLocationStatus = function (statuses) {
  if (includes(statuses, Settings.CPE_STATUSES.WITH_ALERTS)) {
    return Settings.FilterByLocationStatus.Yellow.value;
  }

  if (statuses.length == 1) {
    var status = statuses[0];
    switch (status) {
      case Settings.CPE_STATUSES.DOWN:
        return Settings.FilterByLocationStatus.Red.value;
        break;
      case Settings.CPE_STATUSES.UP:
        return Settings.FilterByLocationStatus.Green.value;
        break;
      case Settings.CPE_STATUSES.NOT_ACTIVATED:
        return Settings.FilterByLocationStatus.Grey.value;
        break;
    }
  }
}

exports.PascalCasing = function (input) {
  var text = "",
    input = input.toLowerCase();
  if (input.includes("_")) {
    input.split("_").forEach(function (word, i) {
      text += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
  } else {
    text = input.charAt(0).toUpperCase() + input.slice(1);
  }
  return text;
}

exports.TimeConvert = function (n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " hour(s) " + rminutes + " minute(s)";
}

exports.FormatLastSeenDate = function (dateString) {
  var dateParts = dateString.split(' ')[0].split('-');
  var time = dateString.split(' ')[1];
  return (Settings.MONTHS[parseInt(dateParts[1]) - 1] + " " + dateParts[2] + ", " + dateParts[0] + " at " + this.FormatAMPM(time));
}

exports.FormatAMPM = function (time) {
  var timeParts = time.split(":");
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

exports.GetExpireDate = function () {
  var expireInMinutes = Settings.ExpiryDays * 24 * 60;
  const now = new Date();
  let expireTime = new Date(now);
  expireTime.setMinutes(now.getMinutes() + expireInMinutes);
  return expireTime;
}

exports.FormatGB = function (num) {
  return (parseInt(num / 1000).toString()) + "GB";
}

exports.StoreData = async function (key, value) {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
  }
}

exports.GetData = async function (key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
  }
}

exports.RemoveData = async function (key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}