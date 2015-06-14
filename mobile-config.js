App.info({
  id: 'com.informationisart.warszawskininja',
  name: 'warszawski.ninja',
  description: 'Problem z kursowaniem metra? Zgłoś go! Nie daj zaskoczyć się opóźnieniom.',
  version: '0.0.2',
  author: 'Staś Małolepszy',
  email: 'warszawski.ninja@gmail.com',
  website: 'http://warszawski.ninja'
});

App.icons({
  'android_ldpi': 'public/android/ldpi.png',
  'android_mdpi': 'public/android/mdpi.png',
  'android_hdpi': 'public/android/hdpi.png',
  'android_xhdpi': 'public/android/xhdpi.png',
});

App.setPreference('Fullscreen', false);
App.setPreference('Orientation', 'portrait');
App.setPreference('BackgroundColor', '0xff7E57C2');
App.setPreference('HideKeyboardFormAccessoryBar', true);
