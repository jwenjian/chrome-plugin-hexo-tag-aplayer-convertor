console.log('Start to convert qq music info for aplayer play-list item...');

songNameTag = document.querySelector('#song_name>a:first-child');
singerNameTag = document.querySelector('#singer_name>a:first-child');
picTag = document.querySelector('#song_pic');
audioTag = document.querySelector('#h5audio_media');

`{% aplayer ${songNameTag.title} ${singerNameTag.title} ${audioTag.src} ${picTag.src} %}`