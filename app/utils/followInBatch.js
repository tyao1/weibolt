
export default function followInBatch(userCollections) {
  const keys = Object.keys(userCollections);

  let left = keys.length;
  for (let ind = 0; left > 0; ind++, left = left - 20) {
    const subKeys = keys.slice(ind * 20, ind * 20 + 20);
    const url = 'http://widget.weibo.com/relationship/bulkfollow.php?language=zh_cn&uids='
      + subKeys.join(',');
    window.open(url);
  }
}
