songNameTag = document.querySelector('div.words>a:first-child');
singerNameTag = document.querySelector('div.words>span>span');
picTag = document.querySelector('div.j-flag>img:first-child');
picSrc = picTag.src.slice(0, picTag.src.indexOf('?'));
songId = location.href.slice(location.href.search('id=') + 3);

result = {
  title: songNameTag.textContent,
  author: singerNameTag.textContent,
  url: `http://music.163.com/song/media/outer/url?id=${songId}`,
  pic: picSrc
}

JSON.stringify(result);