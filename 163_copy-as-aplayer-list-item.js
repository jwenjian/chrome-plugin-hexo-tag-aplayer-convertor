songNameTag = document.querySelector('div.words>a:first-child');
singerNameTag = document.querySelector('div.words>span>span');
picTag = document.querySelector('div.j-flag>img:first-child');
picSrc = picTag.src.slice(0, picTag.src.indexOf('?'));
songIdTag = document.querySelector('div.head.j-flag>a.mask');
songId = songIdTag.href.slice(songIdTag.href.search('id=') + 3);

result = {
  title: songNameTag.textContent,
  author: singerNameTag.textContent,
  url: `http://music.163.com/song/media/outer/url?id=${songId}.mp3`,
  pic: picSrc
}

JSON.stringify(result);