songNameTag = document.querySelector('span.audioName');
singerNameTag = document.querySelector('p.singerName');
picTag = document.querySelector('div.albumImg>a>img');
audioTag = document.querySelector('#myAudio');

result = {
  title: songNameTag.title,
  author: singerNameTag.title,
  url: audioTag.src,
  pic: picTag.src
}

JSON.stringify(result);