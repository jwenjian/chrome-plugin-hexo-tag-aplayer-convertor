songNameTag = document.querySelector('span.audioName');
singerNameTag = document.querySelector('p.singerName');
picTag = document.querySelector('div.albumImg>a>img');
audioTag = document.querySelector('#myAudio');

`{% aplayer "${songNameTag.title}" "${singerNameTag.title}" "${audioTag.src}" "${picTag.src}" %}`