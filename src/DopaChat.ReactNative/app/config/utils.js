var exports = module.exports = {};

import AsyncStorage from '@react-native-community/async-storage';

import Settings from './settings.js';

exports.GetExpireDate = function () {
  var expireInMinutes = Settings.ExpiryDays * 24 * 60;
  const now = new Date();
  let expireTime = new Date(now);
  expireTime.setMinutes(now.getMinutes() + expireInMinutes);
  return expireTime;
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